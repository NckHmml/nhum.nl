import { KanaStore } from "../kana";
import KanaItem from "../kanaItem";

test("Constructor calls without errors", () => {
  expect(() => new KanaStore()).not.toThrow();
});

test("getSimilar returns similar kana", () => {
  const store = new KanaStore();
  let similar = store.getSimilar(new KanaItem("あ"));
  expect(similar?.kana).toBeOneOf(["お"]);

  similar = store.getSimilar(new KanaItem("シ"));
  expect(similar?.kana).toBeOneOf(["ツ", "ソ", "ン", "ノ"]);
});