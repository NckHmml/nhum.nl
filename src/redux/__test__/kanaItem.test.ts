import KanaItem from "../kanaItem";

test("Constructor accepts Kana", () => {
  const item = new KanaItem("あ");
  expect(item).toBeDefined();
});

test("Constructor throws error when kana is invalid", () => {
  expect(() => new KanaItem("a")).toThrow();
});

test("Item can be selected", () => {
  const item = new KanaItem("あ");
  expect(item.selected).toBeFalsy();
  item.selected = true;
  expect(item.selected).toBeTruthy();
});

test("Metadata is correct", () => {
  const hiragana = new KanaItem("あ");
  const katakana = new KanaItem("ア");

  expect(hiragana.kana).toBe("あ");
  expect(katakana.kana).toBe("ア");
  expect(hiragana.romaji).toBe("a");
  expect(katakana.romaji).toBe("a");
  expect(hiragana.group).toBe(1);
  expect(katakana.group).toBe(1);
  expect(hiragana.isHiragana).toBeTruthy();
  expect(katakana.isHiragana).toBeFalsy();
});