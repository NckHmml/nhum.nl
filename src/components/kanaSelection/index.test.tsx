import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import KanaSelection from ".";

import { instance as kanaStore } from "~/redux/kana";

beforeAll(() => {
  vi.mock("~/redux/kana", async (importOriginal) => {
    const { KanaStore } = await importOriginal<typeof import("~/redux/kana")>();
    return {
      instance: new KanaStore(),
    };
  });
  kanaStore.toggleAll(kanaStore.allHiragana, true);
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<KanaSelection items={kanaStore.allHiragana[0]} />);

  expect(screen.queryByTestId("c-kanaselection")).toBeInTheDocument();
});

test("Selection is deselected correctly", async () => {
  render(<KanaSelection items={kanaStore.allHiragana[0]} />);

  expect(kanaStore.allHiragana[0].every((x) => x.selected)).toBeTruthy();
  await userEvent.click(screen.getByTestId("c-kanaselection").querySelector("input")!);
  expect(kanaStore.allHiragana[0].some((x) => x.selected)).toBeFalsy();
});

test("Fonts are applied correctly", () => {
  act(() => kanaStore.font = "sans-serif");
  render(<KanaSelection items={kanaStore.allHiragana[0]} />);

  const element = screen.getByTestId("あ");
  let fontFamily = getComputedStyle(element).fontFamily;
  expect(fontFamily).toBe("sans-serif");

  act(() => kanaStore.font = "gothic");
  fontFamily = getComputedStyle(element).fontFamily;
  expect(fontFamily).toBe("TakaoPGothic");
});