export class KanaItem {
  public selected = false;

  constructor(
    public romaji: string,
    public kana: string,
    public hiragana: boolean,
    public group: number
  ) { }
}

export interface IKanaTest {
  kana: Array<KanaItem>;
  reverse: boolean;
  repeat: number;
  delay: number;
}