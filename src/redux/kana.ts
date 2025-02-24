import { makeAutoObservable, observable } from "mobx";

import KanaItem from "./kanaItem";

type KanaBuffer = Array<Array<KanaItem>>;

export class KanaStore {
  private _allKana = KanaItem.getAllItems();
  private _testItems = observable.array<KanaItem>();
  private _testOptions = observable.array<KanaItem>();
  private _testStep = 0;

  private _font = "default";
  private _reverse = false;
  private _repeat = 1;

  public constructor() {
    makeAutoObservable(this);
  }

  public get font() {
    return this._font;
  }

  public set font(value: string) {
    this._font = value;
  }

  public get reverse() {
    return this._reverse;
  }

  public set reverse(value: boolean) {
    this._reverse = value;
  }

  public get repeat() {
    return this._repeat;
  }

  public set repeat(value: number) {
    this._repeat = value;
  }

  public get allKana() {
    return this._allKana;
  }

  public get test() {
    return this._testItems;
  }

  public get canTest() {
    return this._allKana.some((x) => x.selected);
  }

  public get allHiragana(): KanaBuffer {
    return this._allKana
      .reduce((agr, kana) => {
        if (!kana.isHiragana) return agr;
        if (!Array.isArray(agr[kana.group]))
          agr[kana.group] = [kana];
        else
          agr[kana.group].push(kana);
        return agr;
      }, new Array<Array<KanaItem>>(16))
      .filter(Array.isArray);
  }

  public get allHiraganaSelected() {
    return this.allHiragana.every((x) => x.every((k) => k.selected));
  }

  public get allKatakana(): KanaBuffer {
    return this._allKana
      .reduce((agr, kana) => {
        if (kana.isHiragana) return agr;
        if (!Array.isArray(agr[kana.group]))
          agr[kana.group] = [kana];
        else
          agr[kana.group].push(kana);
        return agr;
      }, new Array<Array<KanaItem>>(16))
      .filter(Array.isArray);
  }

  public get allKatakanaSelected() {
    return this.allKatakana.every((x) => x.every((k) => k.selected));
  }

  public get testItem() {
    if (this._testStep < this._testItems.length)
      return this._testItems[this._testStep];
  }

  public get testOptions() {
    return this._testOptions;
  }

  public get testStep() {
    return this._testStep;
  }

  public toggleAll(buffer: KanaBuffer, toggle: boolean) {
    for (const items of buffer) {
      for (const kana of items) {
        kana.selected = toggle;
      }
    }
  }

  public initTest() {
    // Prepare the test array of selected items * times to repeat
    const items = this._allKana.filter((x) => x.selected);
    const total = items.length * this._repeat;
    const test = new Array<KanaItem>(total);
    for (let i = 0; i < total; i++) {
      const item = items[i % items.length];
      test[i] = item;
    }

    this._testItems.replace(test.sort(() => .5 - Math.random())); // Not truly random, but close enough

    // Prepare the options for reverse testing
    this.step(0);
  }

  public step(step?: number) {
    if (step !== undefined) {
      this._testStep = step;
    } else {
      this._testStep += 1;
    }

    const item = this.testItem;
    if (this._reverse && item) {
      let sameGroup: Array<KanaItem>;
      let randomKana: KanaItem;
      if (this._testItems.every((x) => x.isHiragana)) {
        // Only Hiragana options
        const kanaOptions = this._allKana.filter((x) => x.isHiragana);
        sameGroup = kanaOptions.filter((x) => x.group === item.group && x.kana !== item.kana);
        randomKana = kanaOptions[Math.floor(Math.random() * kanaOptions.length)];
      } else if (this._testItems.every((x) => !x.isHiragana)) {
        // Only Katakana options
        const kanaOptions = this._allKana.filter((x) => !x.isHiragana);
        sameGroup = kanaOptions.filter((x) => x.group === item.group && x.kana !== item.kana);
        randomKana = kanaOptions[Math.floor(Math.random() * kanaOptions.length)];
      } else {
        sameGroup = this._allKana.filter((x) => x.group === item.group && x.kana !== item.kana);
        randomKana = this._allKana[Math.floor(Math.random() * this._allKana.length)];
      }
      const similarKana = this.getSimilar(this.testItem);
      const options = ([item, randomKana, similarKana]
        .filter(Boolean) as Array<KanaItem>)
        // Remove dupes
        .filter((v, i, a) => a.findIndex((k) => k.kana == v.kana) === i);

      // We need at least four items
      while (options.length < 4 && sameGroup.length > 0) {
        const toAdd = sameGroup.pop();
        if (!toAdd) {
          // In rare case (with the "y" group, etc) we might only have a total of 3 amongst everything, so add another random
          options.push(this._allKana[Math.floor(Math.random() * this._allKana.length)]);
          continue;
        }
        if (options.indexOf(toAdd) >= 0) continue;
        options.push(toAdd);
      }
      this._testOptions.replace(options.sort(() => .5 - Math.random()));
    }
  }

  public getSimilar(kana: KanaItem): KanaItem | undefined {
    const similarities = [
      ["あ", "お"],
      ["う", "つ"],
      ["ら", "ち", "さ", "き"],
      ["て", "と"],
      ["な", "に", "は", "た"],
      ["へ", "く"],
      ["れ", "わ", "ね"],
      ["ぬ", "ね", "め"],
      ["る", "ろ"],
      ["せ", "サ"],
      ["ウ", "ワ", "ラ"],
      ["カ", "ク", "タ", "ヌ"],
      ["メ", "ナ"],
      ["シ", "ツ", "ソ", "ン", "ノ"],
    ];

    const similar = similarities.find((x) => x.includes(kana.kana))?.sort(() => .5 - Math.random()).filter((x) => x !== kana.kana);
    if (similar) {
      // If a similarity is found, grab one random that isn't the current
      const similarKana = this._allKana.find((x) => x.kana === similar.at(0));
      return similarKana;
    }
  }
}

export const instance = new KanaStore();