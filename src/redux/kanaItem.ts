import { makeAutoObservable } from "mobx";

const dictionary: Dictionary<[string, number]> = {
  /* Hiragana */
  // a e i o u
  "あ": ["a", 1],
  "い": ["i", 1],
  "う": ["u", 1],
  "え": ["e", 1],
  "お": ["o", 1],
  // k
  "か": ["ka", 2],
  "き": ["ki", 2],
  "く": ["ku", 2],
  "け": ["ke", 2],
  "こ": ["ko", 2],
  // g
  "が": ["ga", 3],
  "ぎ": ["gi", 3],
  "ぐ": ["gu", 3],
  "げ": ["ge", 3],
  "ご": ["go", 3],
  // s
  "さ": ["sa", 4],
  "し": ["shi", 4],
  "す": ["su", 4],
  "せ": ["se", 4],
  "そ": ["so", 4],
  // z
  "ざ": ["za", 5],
  "じ": ["ji", 5],
  "ず": ["zu", 5],
  "ぜ": ["ze", 5],
  "ぞ": ["zo", 5],
  // t
  "た": ["ta", 6],
  "ち": ["chi", 6],
  "つ": ["tsu", 6],
  "て": ["te", 6],
  "と": ["to", 6],
  // d
  "だ": ["da", 7],
  "で": ["de", 7],
  "ど": ["do", 7],
  // n
  "な": ["na", 8],
  "に": ["ni", 8],
  "ぬ": ["nu", 8],
  "ね": ["ne", 8],
  "の": ["no", 8],
  // h
  "は": ["ha", 9],
  "ひ": ["hi", 9],
  "ふ": ["fu", 9],
  "へ": ["he", 9],
  "ほ": ["ho", 9],
  // b
  "ば": ["ba", 10],
  "び": ["bi", 10],
  "ぶ": ["bu", 10],
  "べ": ["be", 10],
  "ぼ": ["bo", 10],
  // p
  "ぱ": ["pa", 11],
  "ぴ": ["pi", 11],
  "ぷ": ["pu", 11],
  "ぺ": ["pe", 11],
  "ぽ": ["po", 11],
  // m
  "ま": ["ma", 12],
  "み": ["mi", 12],
  "む": ["mu", 12],
  "め": ["me", 12],
  "も": ["mo", 12],
  // y
  "や": ["ya", 13],
  "ゆ": ["yu", 13],
  "よ": ["yo", 13],
  // r
  "ら": ["ra", 14],
  "り": ["ri", 14],
  "る": ["ru", 14],
  "れ": ["re", 14],
  "ろ": ["ro", 14],
  // w
  "わ": ["wa", 15],
  "を": ["wo", 15],
  // single n
  "ん": ["n", 15],
  /* Katakana */
  // a e i o u
  "ア": ["a", 1],
  "イ": ["i", 1],
  "ウ": ["u", 1],
  "エ": ["e", 1],
  "オ": ["o", 1],
  // k
  "カ": ["ka", 2],
  "キ": ["ki", 2],
  "ク": ["ku", 2],
  "ケ": ["ke", 2],
  "コ": ["ko", 2],
  // g
  "ガ": ["ga", 3],
  "ギ": ["gi", 3],
  "グ": ["gu", 3],
  "ゲ": ["ge", 3],
  "ゴ": ["go", 3],
  // s
  "サ": ["sa", 4],
  "シ": ["shi", 4],
  "ス": ["su", 4],
  "セ": ["se", 4],
  "ソ": ["so", 4],
  // z
  "ザ": ["za", 5],
  "ジ": ["ji", 5],
  "ズ": ["zu", 5],
  "ゼ": ["ze", 5],
  "ゾ": ["zo", 5],
  // t
  "タ": ["ta", 6],
  "チ": ["chi", 6],
  "ツ": ["tsu", 6],
  "テ": ["te", 6],
  "ト": ["to", 6],
  // d
  "ダ": ["da", 7],
  "デ": ["de", 7],
  "ド": ["do", 7],
  // n
  "ナ": ["na", 8],
  "ニ": ["ni", 8],
  "ヌ": ["nu", 8],
  "ネ": ["ne", 8],
  "ノ": ["no", 8],
  // h
  "ハ": ["ha", 9],
  "ヒ": ["hi", 9],
  "フ": ["fu", 9],
  "ヘ": ["he", 9],
  "ホ": ["ho", 9],
  // b
  "バ": ["ba", 10],
  "ビ": ["bi", 10],
  "ブ": ["bu", 10],
  "ベ": ["be", 10],
  "ボ": ["bo", 10],
  // p
  "パ": ["pa", 11],
  "ピ": ["pi", 11],
  "プ": ["pu", 11],
  "ペ": ["pe", 11],
  "ポ": ["po", 11],
  // m
  "マ": ["ma", 12],
  "ミ": ["mi", 12],
  "ム": ["mu", 12],
  "メ": ["me", 12],
  "モ": ["mo", 12],
  // y
  "ヤ": ["ya", 13],
  "ユ": ["yu", 13],
  "ヨ": ["yo", 13],
  // r
  "ラ": ["ra", 14],
  "リ": ["ri", 14],
  "ル": ["ru", 14],
  "レ": ["re", 14],
  "ロ": ["ro", 14],
  // w
  "ワ": ["wa", 15],
  "ヲ": ["wo", 15],
  // single n
  "ン": ["n", 15],
};

export default class KanaItem {
  private _data: [string, string, number];
  private _selected = false;

  public constructor(kana: string) {
    makeAutoObservable(this);

    const [letter, group] = dictionary[kana];
    this._data = [kana, letter, group];
  }

  public get selected() {
    return this._selected;
  }

  public set selected(value: boolean) {
    this._selected = value;
  }

  public get kana() {
    return this._data[0];
  }

  public get romaji() {
    return this._data[1];
  }

  public get group() {
    return this._data[2];
  }

  public get isHiragana() {
    return this.kana.charCodeAt(0) <= "ん".charCodeAt(0);
  }

  public static getAllItems(): Array<KanaItem> {
    return Object.keys(dictionary).map(kana => new KanaItem(kana));
  }
}