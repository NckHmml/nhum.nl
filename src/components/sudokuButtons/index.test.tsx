import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "i18next";

import SudokuButtons from ".";

import { instance as sudokuStore } from "~/redux/sudoku";

beforeAll(() => {
  vi.mock("~/redux/kana", async (importOriginal) => {
    const { SudokuStore } = await importOriginal<typeof import("~/redux/sudoku")>();
    return {
      instance: new SudokuStore(),
    };
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<SudokuButtons />);

  const text = i18n.t("sudoku.solve");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Invalid field disables the solve button", async () => {
  render(<SudokuButtons />);
  const text = i18n.t("sudoku.solve");

  // Column
  act(() => {
    sudokuStore.setCell(0, 0, 9);
    sudokuStore.setCell(0, 8, 9);
  });
  expect(screen.queryByText(text)).toHaveClass("pure-button-disabled");
  expect(sudokuStore.fieldValid).toBeFalsy();

  // Row
  act(() => {
    sudokuStore.clear();
    sudokuStore.setCell(0, 0, 9);
    sudokuStore.setCell(8, 0, 9);
  });
  expect(screen.queryByText(text)).toHaveClass("pure-button-disabled");
  expect(sudokuStore.fieldValid).toBeFalsy();

  // Cell
  act(() => {
    sudokuStore.clear();
    sudokuStore.setCell(0, 0, 2);
    sudokuStore.setCell(2, 2, 2);
  });
  expect(screen.queryByText(text)).toHaveClass("pure-button-disabled");
  await userEvent.click(screen.getByText(text));
  expect(sudokuStore.fieldValid).toBeFalsy();
});

test("Expect all examples to be solvable", async () => {
  render(<SudokuButtons />);
  const solveText = i18n.t("sudoku.solve");
  const clearText = i18n.t("sudoku.clear");
  const exampleText1 = i18n.t("sudoku.example", { n: 1 });
  const exampleText2 = i18n.t("sudoku.example", { n: 2 });
  const exampleText3 = i18n.t("sudoku.example", { n: 3 });

  for (const text of [exampleText1, exampleText2, exampleText3]) {
    await userEvent.click(screen.getByText(clearText));
    await userEvent.click(screen.getByText(text));
    expect(screen.queryByText(solveText)).not.toHaveClass("pure-button-disabled");
    expect(sudokuStore.fieldValid).toBeTruthy();
    await userEvent.click(screen.getByText(solveText));
    expect(sudokuStore.fieldValid).toBeTruthy();
  }
});