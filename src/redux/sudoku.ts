import { makeAutoObservable, observable } from "mobx";
import { solveSudoku } from "../solver";

export class SudokuStore {
  public field = observable.array<Array<number>>(this.cleanField(), { deep: true });

  public constructor() {
    makeAutoObservable(this);
  }

  public cleanField() {
    return new Array(9).fill([]).map(() => new Array(9).fill(0));
  }

  public cleanPossibilities<T = false>() {
    return Object.assign({}, {
      "1": true,
      "2": true,
      "3": true,
      "4": true,
      "5": true,
      "6": true,
      "7": true,
      "8": true,
      "9": true,
    } as Dictionary<boolean | T>);
  }

  public get validity(): Array<Array<boolean>> {
    const validity = new Array<Array<boolean>>(9).fill([]).map(() => new Array(9).fill(true));

    for (let col = 0, row = 0, i = 0; row < 9; i++) {
      col = i % 9;
      row = (i - col) / 9;

      if (row >= 9) continue;

      if (row === 0) {
        // Check columns
        this.checkColumn(col, validity);
      }

      if (col === 0) {
        // Check rows
        this.checkRow(row, validity);
      }

      if (col % 3 === 0 && row % 3 === 0) {
        // Check 3x3 block
        this.checkBlock(row, col, validity);
      }
    }

    return validity;
  }

  public get fieldValid(): boolean {
    return !this.validity.some(x => x.some(b => !b));
  }

  public setCell(row: number, col: number, value: number) {
    this.field[row][col] = value;
  }

  public checkRow(row: number, validity: Array<Array<boolean>>) {
    const possibilities = this.cleanPossibilities<number>();
    for (let col = 0; col < 9; col++) {
      const value = this.field[row][col].toString();
      if (value === "0") continue;

      if (possibilities[value] === true) {
        possibilities[value] = col; // Store the col value as "position"
      } else if (typeof possibilities[value] === "number") {
        validity[row][col] = false;
        validity[row][possibilities[value]] = false;
      }
    }
  }

  public checkColumn(col: number, validity: Array<Array<boolean>>) {
    const possibilities = this.cleanPossibilities<number>();
    for (let row = 0; row < 9; row++) {
      const value = this.field[row][col].toString();
      if (value === "0") continue;

      if (possibilities[value] === true) {
        possibilities[value] = row; // Store the row value as "position"
      } else if (typeof possibilities[value] === "number") {
        validity[row][col] = false;
        validity[possibilities[value]][col] = false;
      }
    }
  }

  public checkBlock(row: number, col: number, validity: Array<Array<boolean>>) {
    const possibilities = this.cleanPossibilities<number>();
    for (let cell = 0; cell < 9; cell++) {
      const x = cell % 3;
      const y = (cell - x) / 3;

      const value = this.field[row + y][col + x].toString();
      if (value === "0") continue;

      if (possibilities[value] === true) {
        possibilities[value] = cell; // Store the cell value as "position"
      } else if (typeof possibilities[value] === "number") {
        const rx = possibilities[value] % 3;
        const ry = (possibilities[value] - rx) / 3;
        validity[row + y][col + x] = false;
        validity[row + ry][col + rx] = false;
      }
    }
  }

  public clear() {
    this.field.replace(this.cleanField());
  }

  public solve() {
    console.time("solve");
    const result = solveSudoku(this.field);
    if (!result) {
      // ToDo: dsiplay error?
    } else {
      this.field.replace(result);
    }
    console.timeEnd("solve");
  }

  public setExample(number: 1 | 2 | 3) {
    switch (number) {
      case 1: {
        this.field.replace([
          [0, 0, 0, 2, 6, 0, 7, 0, 1],
          [6, 8, 0, 0, 7, 0, 0, 9, 0],
          [1, 9, 0, 0, 0, 4, 5, 0, 0],
          [8, 2, 0, 1, 0, 0, 0, 4, 0],
          [0, 0, 4, 6, 0, 2, 9, 0, 0],
          [0, 5, 0, 0, 0, 3, 0, 2, 8],
          [0, 0, 9, 3, 0, 0, 0, 7, 4],
          [0, 4, 0, 0, 5, 0, 0, 3, 6],
          [7, 0, 3, 0, 1, 8, 0, 0, 0],
        ]);
        break;
      }
      case 2: {
        this.field.replace([
          [0, 0, 0, 6, 0, 0, 4, 0, 0],
          [7, 0, 0, 0, 0, 3, 6, 0, 0],
          [0, 0, 0, 0, 9, 1, 0, 8, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 5, 0, 1, 8, 0, 0, 0, 3],
          [0, 0, 0, 3, 0, 6, 0, 4, 5],
          [0, 4, 0, 2, 0, 0, 0, 6, 0],
          [9, 0, 3, 0, 0, 0, 0, 0, 0],
          [0, 2, 0, 0, 0, 0, 1, 0, 0],
        ]);
        break;
      }
      case 3: {
        this.field.replace([
          [0, 2, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 6, 0, 0, 0, 0, 3],
          [0, 7, 4, 0, 8, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 3, 0, 0, 2],
          [0, 8, 0, 0, 4, 0, 0, 1, 0],
          [6, 0, 0, 5, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 7, 8, 0],
          [5, 0, 0, 0, 0, 9, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 4, 0],
        ]);
        break;
      }
    }
  }
}

export const instance = new SudokuStore();