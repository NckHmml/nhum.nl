export class SudokuSolver {
  /**
   * Checks for invalid moves within a cell
   * @param field Sudoku field
   * @param valids Valid state buffer
   */
  private static checkCells(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    for (let val = 1; val <= 9; val++) {
      for (let cell = 0; cell < 9; cell++) {
        let exists = false;
        let pos = { x: 0, y: 0 };

        const startx = (cell % 3) * 3;
        const starty = cell - (cell % 3);

        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            if (field[y + starty][x + startx] === val) {
              if (exists) {
                valids[pos.y][pos.x] = false;
                valids[y + starty][x + startx] = false;
              }
              exists = true;
              pos = {
                x: x + startx,
                y: y + starty,
              };
            }
          }
        }
      }
    }
  }

  /**
   * Checks for invalid moves within a row
   * @param field Sudoku field
   * @param valids Valid state buffer
   */
  private static checkRows(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    for (let val = 1; val <= 9; val++) {
      for (let y = 0; y < 9; y++) {
        let exists = false;
        let posX = 0;

        for (let x = 0; x < 9; x++) {
          if (field[y][x] === val) {
            if (exists) {
              valids[y][posX] = false;
              valids[y][x] = false;
            }
            exists = true;
            posX = x;
          }
        }
      }
    }
  }

  /**
   * Checks for invalid moves within a column
   * @param field Sudoku field
   * @param valids Valid state buffer
   */
  private static checkColumns(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    for (let val = 1; val <= 9; val++) {
      for (let x = 0; x < 9; x++) {
        let exists = false;
        let posY = 0;

        for (let y = 0; y < 9; y++) {
          if (field[y][x] === val) {
            if (exists) {
              valids[posY][x] = false;
              valids[y][x] = false;
            }
            exists = true;
            posY = y;
          }
        }
      }
    }
  }

  public static solve(field: Array<Array<number>>) {

  }

  public static checkValids(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    // Reset buffer
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        valids[y][x] = true;
      }
    }
    // Run checks
    this.checkCells(field, valids);
    this.checkRows(field, valids);
    this.checkColumns(field, valids);
  }
}