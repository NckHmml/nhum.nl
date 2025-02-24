import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import KanaTestField from ".";

import { instance as kanaStore } from "~/redux/kana";

beforeAll(() => {
  vi.mock("~/redux/kana", async (importOriginal) => {
    const { KanaStore } = await importOriginal<typeof import("~/redux/kana")>();
    return {
      instance: new KanaStore(),
    };
  });
  kanaStore.toggleAll(kanaStore.allHiragana, true);
  kanaStore.initTest();
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders both reverse and normal", () => {
  render(<KanaTestField />);

  expect(screen.queryByTestId("c-kanatestfield")).toBeInTheDocument();

  act(() => {
    kanaStore.toggleAll(kanaStore.allHiragana, false);
    kanaStore.toggleAll(kanaStore.allKatakana, true);
    kanaStore.reverse = true;
    kanaStore.initTest();
  });
  expect(screen.queryByTestId("c-kanatestfield-reverse")).toBeInTheDocument();
});

test("Clicking an invalid answer adds the invalid class and does not step", async () => {
  act(() => {
    kanaStore.toggleAll(kanaStore.allHiragana, false);
    kanaStore.toggleAll(kanaStore.allKatakana, true);
    kanaStore.reverse = true;
    kanaStore.initTest();
  });
  render(<KanaTestField />);
  expect(kanaStore.testStep).toBe(0);

  const { testOptions, testItem } = kanaStore;
  for (const invalidOption of testOptions.filter((x) => x.kana !== testItem!.kana)) {
    const element = screen.getByText(invalidOption.kana);
    expect(element.classList).not.toContain("invalid");
    await userEvent.click(element);
    expect(element.classList).toContain("invalid");
  }
  expect(kanaStore.testStep).toBe(0);
});

test("Clicking the valid answer increase the step", async () => {
  act(() => {
    kanaStore.toggleAll(kanaStore.allHiragana, false);
    kanaStore.toggleAll(kanaStore.allKatakana, true);
    kanaStore.reverse = true;
    kanaStore.initTest();
  });
  render(<KanaTestField />);
  expect(kanaStore.testStep).toBe(0);

  const { testItem } = kanaStore;
  const element = screen.getByText(testItem!.kana);
  await userEvent.click(element);

  expect(kanaStore.testStep).toBe(1);
});

test("Typing the valid answer increase the step", async () => {
  act(() => {
    kanaStore.toggleAll(kanaStore.allHiragana, false);
    kanaStore.toggleAll(kanaStore.allKatakana, true);
    kanaStore.reverse = false;
    kanaStore.initTest();
  });
  const { container } = render(<KanaTestField />);
  expect(kanaStore.testStep).toBe(0);

  const { testItem } = kanaStore;
  await userEvent.type(container.querySelector("input")!, testItem!.romaji);

  expect(kanaStore.testStep).toBe(1);
});

test("Completing the last answer finishes the test", async () => {
  act(() => {
    kanaStore.toggleAll(kanaStore.allHiragana, false);
    kanaStore.toggleAll(kanaStore.allKatakana, false);
    kanaStore.toggleAll([[kanaStore.allHiragana[0][0]]], true);
    kanaStore.reverse = false;
    kanaStore.initTest();
  });
  const { container } = render(<KanaTestField />);
  expect(kanaStore.test.length).toBe(1);

  const { testItem } = kanaStore;
  await userEvent.type(container.querySelector("input")!, testItem!.romaji);

  expect(kanaStore.testStep).toBe(1);
  expect(screen.getByText("Completed!")).toBeInTheDocument();
});