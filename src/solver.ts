import { IObservableArray, toJS } from "mobx";

interface CellValues {
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
  7: boolean;
  8: boolean;
  9: boolean;
}

type Field = Array<Array<number>>;
type Possibilities = Array<CellValues>;
type LogValues = keyof CellValues | 0 | undefined;

const checkColumn = (field: Field, col: number, y: number, val: number) => {
  for (let iy = 0; iy < 9; iy++) {
    if (y === iy) continue;
    if (field[iy][col] === val) return false;
  }
  return true;
};

const checkRow = (field: Field, col: number, row: number, val: number): boolean => {
  for (let ix = 0; ix < 9; ix++) {
    if (col === ix) continue;
    if (field[row][ix] === val) return false;
  }
  return true;
};

const checkCell = (field: Field, col: number, row: number, val: number): boolean => {
  const startx = col - (col % 3);
  const starty = row - (row % 3);

  for (let ix = startx; ix < startx + 3; ix++) {
    for (let iy = starty; iy < starty + 3; iy++) {
      if (row === iy && col === ix) continue;
      if (field[iy][ix] === val) return false;
    }
  }
  return true;
};

/**
 * Creates a possibility buffer based on the sudoku rules
 * @param field field buffer
 * @returns possibility buffer, 9*9 array of dictionary of (in)valid moves
 */
const createPossibilities = (field: Field): Possibilities => {
  const possibilities = new Array<CellValues>(9 * 9);

  for (let col = 0; col < 9; col++) {
    for (let y = 0; y < 9; y++) {
      const values = {} as CellValues;
      for (let val = 1; val <= 9; val++) {
        const possible =
          checkColumn(field, col, y, val) &&
          checkRow(field, col, y, val) &&
          checkCell(field, col, y, val);

        values[val as keyof CellValues] = possible;
      }
      possibilities[col * 9 + y] = values;
    }
  }

  return possibilities;
};

/**
 * Makes a move and clears the possible future moves based on sudoku rules
 * @param field field buffer
 * @param possibilities possibility buffer
 * @param setLog log buffer
 * @param col current col
 * @param row current row
 * @param val value to remove
 */
const setBlock = (field: Field, possibilities: Possibilities, setLog: Array<LogValues>, col: number, row: number, val: number) => {
  // It's actually more efficient to not reset possibilities for the cell that is set, so we dont
  field[row][col] = val;

  const key = val as keyof CellValues;
  // Rows
  for (let ix = 0; ix < 9; ix++) {
    if (possibilities[ix * 9 + row][key])
      setLog[ix * 9 + row] = key;
    possibilities[ix * 9 + row][key] = false;
  }

  // Columns
  for (let iy = 0; iy < 9; iy++) {
    if (possibilities[col * 9 + iy][key])
      setLog[col * 9 + iy] = key;
    possibilities[col * 9 + iy][key] = false;
  }

  // Cell
  const startx = col - (col % 3);
  const starty = row - (row % 3);
  for (let ix = startx; ix < startx + 3; ix++) {
    for (let iy = starty; iy < starty + 3; iy++) {
      if (possibilities[ix * 9 + iy][key])
        setLog[ix * 9 + iy] = key;
      possibilities[ix * 9 + iy][key] = false;
    }
  }
};

/**
 * Reset the possibility buffer based on the log buffer
 * @param possibilities possibility buffer
 * @param setLog previous log buffer
 */
const resetPossibilities = (possibilities: Possibilities, setLog: Array<LogValues>) => {
  for (let i = 0; i < setLog.length; i++) {
    if (!setLog[i]) continue;
    const key = setLog[i] as keyof CellValues;
    possibilities[i][key] = true;
    setLog[i] = undefined;
  }
};

/**
 * Recursive sudoku solving algorithm
 * @param field field buffer
 * @param possibilities possibility buffer
 * @param col current col
 * @param row current row
 * @returns whether the current move resulted in a valid solution
 */
const backTrack = (field: Field, possibilities: Possibilities, col = 0, row = 0): boolean => {
  // Increase the current step untill we hit a cell that hasn't been solved yet
  while (field[row][col] !== 0) {
    if (++row >= 9) {
      row = 0;
      if (++col >= 9)
        return true;
    }
  }

  // Log to remember what set we did the current loop, eats more memory, but accounts for 30x faster performance over calling `createPossibilities`
  const setLog = new Array<LogValues>(9 * 9);
  // Loop through all possible values for the current cell
  for (let val = 1; val <= 9; val++) {
    const curVal = val as keyof CellValues;
    if (!possibilities[col * 9 + row][curVal]) continue;

    // Try to set the current val as a move
    setBlock(field, possibilities, setLog, col, row, val);

    // Step next
    if (backTrack(field, possibilities, col, row)) {
      return true;
    } else {
      // Failed, step back
      field[row][col] = 0;
      resetPossibilities(possibilities, setLog);
    }
  }

  // Exhausted options in current recursion
  return false;
};

/**
 * Tries to run the sudoku algorithm on the current field
 * @param field field observable
 * @returns if solution found, field buffer, else null
 */
export const solveSudoku = (field: IObservableArray<Array<number>>) => {
  const workField = toJS(field);
  const possibilities = createPossibilities(field);
  const result = backTrack(workField, possibilities);
  return result ? workField : null;
};
