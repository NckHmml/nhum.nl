import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { SudokuCell } from "./partials/cell";
import { SudokuSolver } from "~/helpers/sudoku.solver";

import { Button } from "~/components/button";

interface ISudokuState {
  valids: Array<Array<boolean>>;
}

export class Sudoku extends React.Component<RouteComponentProps<{}>, ISudokuState> {
  public field = new Array<Array<number>>();
  public state: ISudokuState = {
    valids: new Array<Array<boolean>>()
  };

  /**
   * Renders a cell with a value
   * @param value value of the cell
   * @param x column number
   * @param y row number
   */
  private renderCell(value: number, x: number, y: number) {
    return (
      <td key={x}>
        <SudokuCell
          valid={this.state.valids[y][x]}
          value={value}
          onChange={this.setCell(x, y)}
        />
      </td>
    );
  }

  /**
   * Provides a callback to set the value of a cell
   * @param x column number
   * @param y row number
   */
  private setCell(x: number, y: number) {
    return (value: number) => {
      this.field[y][x] = value;
      SudokuSolver.checkValids(this.field, this.state.valids);

      this.setState({
        valids: this.state.valids
      });
    };
  }

  /**
   * Generates the initial field data
   */
  private generateField = () => {
    this.field = new Array<Array<number>>();
    const valids = new Array<Array<boolean>>();

    for (let y = 0; y < 9; y++) {
      this.field.push([]);
      valids.push([]);
      for (let x = 0; x < 9; x++) {
        this.field[y].push(0);
        valids[y].push(true);
      }
    }

    this.setState({
      valids: valids
    });
  }

  /**
   * Starts the solving algorithm
   */
  private solve = () => {
    const result = SudokuSolver.solve(this.field);

    // We don't really need to do this, but it helps debugging and triggers a state update
    SudokuSolver.checkValids(this.field, this.state.valids);
    this.setState({
      valids: this.state.valids
    });
  }

  /**
   * React component mounting
   */
  public componentWillMount() {
    this.generateField();
  }

  /**
   * React render
   */
  public render() {
    // Generate and fill cell buffer to render
    const cells = [];
    for (let y = 0; y < 9; y++) {
      cells.push([]);
      for (let x = 0; x < 9; x++) {
        const value = this.field[y][x];
        cells[y].push(this.renderCell(value, x, y));
      }
    }

    return (
      <div className="group">
        <section className="g-24 g-md-16 g-md-p-4 sudoku">
          <header className="group">
            <div className="g-24">
              <h2>Sudoku solver</h2>
            </div>
          </header>
          <section>
            <p>
              Sudoku is a logic-based, combinatorial number-placement puzzle.
              The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contains all of the digits from 1 to 9.
              The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.
            </p>
            <p>I was solving puzzles while travelling, when I thought to myself "I wonder how hard it would be to solve these puzzles programmatically" and this resolver tool is the answer to that question.</p>
          </section>
          <section>
            <h3>Instructions</h3>
            <ul>
              <li>Click a cell to change its value by typing a number</li>
              <li>Fill the field according to the puzzle you want to solve</li>
              <li>Cells that are colored red, are in conflict with eachother</li>
              <li>Press "Solve puzzle" to start solving</li>
              <li>Press "Clear puzzle" to set all cells back to "0"</li>
            </ul>
            <small>(please note that a difficult puzzle may take up to 30 seconds to solve, during which your browser may alert you that it's taking longer than expected)</small>
          </section>
          <section>
            <table className="sudoku-table">
              <tbody>
                {cells.map((row, index) => <tr key={index}>{row.map(cell => cell)}</tr>)}
              </tbody>
            </table>
          </section>
          <footer>
            <Button onClick={this.solve}>
              Solve puzzle
            </Button>
            <Button
              type="secondary"
              onClick={this.generateField}
            >
              Clear puzzle
            </Button>
          </footer>
        </section>
      </div>
    );
  }
}