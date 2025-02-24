import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import KanaField from ".";

import { instance as kanaStore } from "~/redux/kana";

const mockNavigate = vi.fn();

beforeAll(() => {
  vi.mock("react-router", () => {
    return {
      "useNavigate": vi.fn(() => mockNavigate),
    };
  });
  vi.mock("~/redux/kana", async (importOriginal) => {
    const { KanaStore } = await importOriginal<typeof import("~/redux/kana")>();
    return {
      instance: new KanaStore(),
    };
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<KanaField />);

  expect(screen.queryByTestId("c-kanafield")).toBeDefined();
});

test("Add all correctly adds all to redux store", async () => {
  render(<KanaField />);

  expect(kanaStore.allHiraganaSelected).toBeFalsy();
  expect(kanaStore.allKatakanaSelected).toBeFalsy();

  await userEvent.click(screen.getByTestId("add-hiragana").firstChild as Element);
  expect(kanaStore.allHiraganaSelected).toBeTruthy();

  await userEvent.click(screen.getByTestId("add-katakana").firstChild as Element);
  expect(kanaStore.allKatakanaSelected).toBeTruthy();

  expect(kanaStore.canTest).toBeTruthy();

  await userEvent.click(screen.getByTestId("add-hiragana").firstChild as Element);
  expect(kanaStore.allHiraganaSelected).toBeFalsy();

  await userEvent.click(screen.getByTestId("add-katakana").firstChild as Element);
  expect(kanaStore.allKatakanaSelected).toBeFalsy();

  expect(kanaStore.canTest).toBeFalsy();
});

test("Can start a test", async () => {
  render(<KanaField />);
  expect(kanaStore.test.length).toEqual(0);

  await userEvent.type(screen.getByTestId("kana-repeat"), "{backspace}");
  await userEvent.type(screen.getByTestId("kana-repeat"), "2");
  expect(kanaStore.repeat).toBe(2);

  await userEvent.click(screen.getByTestId("add-hiragana").firstChild as Element);
  await userEvent.click(screen.getByTestId("kana-start"));

  expect(mockNavigate).toHaveBeenCalledWith("/kana/test");
  expect(kanaStore.test.length).toEqual(69 * 2);
});

test("Can't start a test if nothing is selected", async () => {
  render(<KanaField />);

  act(() => {
    kanaStore.toggleAll(kanaStore.allHiragana, false);
    kanaStore.toggleAll(kanaStore.allKatakana, false);
    kanaStore.initTest();
  });
  expect(kanaStore.test.length).toEqual(0);
  expect(kanaStore.canTest).toBeFalsy();

  await userEvent.click(screen.getByTestId("kana-start"));
  expect(mockNavigate).not.toHaveBeenCalled();
});