import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SudokuCell from ".";

import { instance as sudokuStore } from "~/redux/sudoku";

beforeAll(() => {
  vi.mock("~/redux/sudoku", async (importOriginal) => {
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
  render(<SudokuCell row={0} cell={0} value={1} />);

  expect(screen.queryByTestId("c-sudokucell")).toBeInTheDocument();
});

test("Clicking resets input value", async () => {
  render(<SudokuCell row={0} cell={0} value={1} />);

  await userEvent.click(screen.getByTestId("c-sudokucell"));
  expect(screen.getByTestId("c-sudokucell").querySelector("input")?.value).toBe("");
  expect(screen.getByTestId("c-sudokucell").classList).toContain("valid");
});

test("Changing the value to something invalid adds the invalid class", async () => {
  render(<SudokuCell row={0} cell={0} value={1} />);
  expect(screen.getByTestId("c-sudokucell").classList).toContain("valid");

  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "2");
  act(() => sudokuStore.setCell(0, 1, 2));
  expect(screen.getByTestId("c-sudokucell").classList).toContain("invalid");
});

test("Pressing delete or backspace clears the current value", async () => {
  render(<SudokuCell row={0} cell={0} value={1} />);
  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "2");
  expect(sudokuStore.field[0][0]).toBe(2);

  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "{backspace}");
  expect(sudokuStore.field[0][0]).toBe(0);

  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "3");
  expect(sudokuStore.field[0][0]).toBe(3);

  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "{enter}");
  expect(sudokuStore.field[0][0]).toBe(3);

  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "{delete}");
  expect(sudokuStore.field[0][0]).toBe(0);
});

test("Typing something that is not a number does not change the input", async () => {
  render(<SudokuCell row={8} cell={8} value={0} />);
  act(() => sudokuStore.setCell(8, 8, 9));

  await userEvent.type(screen.getByTestId("c-sudokucell").querySelector("input")!, "NaN");
  expect(sudokuStore.field[8][8]).toBe(9);
});