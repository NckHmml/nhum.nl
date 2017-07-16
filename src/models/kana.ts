/**
 * Kana items container
 */
export class KanaItem {
  public selected = false;

  constructor(
    public romaji: string,
    public kana: string,
    public hiragana: boolean,
    public group: number
  ) { }
}

/**
 * Kana test configuration / state
 */
export interface IKanaTest {
  reverse: boolean;
  repeat: number;
  delay: number;
}