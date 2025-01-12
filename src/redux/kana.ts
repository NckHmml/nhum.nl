import { makeAutoObservable } from "mobx";
import KanaItem from "./kanaItem";

type KanaBuffer = Array<Array<KanaItem>>;

export class KanaStore {
  private _allKana = KanaItem.getAllItems();

  private _font = "default";
  private _reverse = false;

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

  public get allKana() {
    return this._allKana;
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
    return this.allHiragana.every(x => x.every(k => k.selected));
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
    return this.allKatakana.every(x => x.every(k => k.selected));
  }

  public toggleAll(buffer: KanaBuffer, toggle: boolean) {
    for (const items of buffer) {
      for (const kana of items) {
        kana.selected = toggle;
      }
    }
  }
}

export const instance = new KanaStore();