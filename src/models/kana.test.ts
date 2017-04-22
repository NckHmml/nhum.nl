import { Kana } from "./kana";

export interface IKanaTest {
  kana: Array<Kana>;
  reverse: boolean;
  repeat: number;
  delay: number;
}