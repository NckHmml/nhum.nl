import { render, screen } from "@testing-library/react";
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

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<KanaField />);

  expect(screen.getByTestId("c-kanafield")).toBeDefined();
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
  await userEvent.click(screen.getByTestId("add-hiragana").firstChild as Element);
  await userEvent.click(screen.getByTestId("kana-start"));
  expect(mockNavigate).toHaveBeenCalled();
  expect(kanaStore.test.length).toEqual(69);
});