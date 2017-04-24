import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { SudokuCell } from "./partials/cell";
import { SudokuSolver } from "helpers/sudoku.solver";

interface ISudokuState {
  valids: Array<Array<boolean>>;
}

export class Sudoku extends React.Component<RouteComponentProps<void>, ISudokuState> {
  public field = new Array<Array<number>>();
  public state: ISudokuState = {
    valids: new Array<Array<boolean>>()
  };

  private renderCell(value: number, x: number, y: number) {
    return (
      <td key={x}>
        <SudokuCell
          valid={this.state.valids[y][x]}
          value={value}
          onChange={(val) => this.setCell(val, x, y)}
        />
      </td>
    );
  }

  private setCell(value: number, x: number, y: number) {
    this.field[y][x] = value;
    SudokuSolver.checkValids(this.field, this.state.valids);

    this.setState({
      valids: this.state.valids
    });
  }

  private generateField() {
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

  public componentWillMount() {
    this.generateField();
  }

  public render() {
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
            <table className="sudoku-table">
              <tbody>
                {cells.map((row, index) => <tr key={index}>{row.map(cell => cell)}</tr>)}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    );
  }
}