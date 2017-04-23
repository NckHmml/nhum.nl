export class Kana {
  public selected = false;

  constructor(
    public romaji: string,
    public kana: string,
    public hiragana: boolean,
    public group: number
  ) { }
}