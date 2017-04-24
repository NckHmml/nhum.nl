import * as React from "react";

import { ClassNames } from "helpers/classnames";

interface ISudokuCellProps {
  value: number;
  valid: boolean;
  onChange: (value: number) => void;
  className?: string;
}

interface ISudokuCellState {
  value: number;
  focused: boolean;
}

export class SudokuCell extends React.Component<ISudokuCellProps, ISudokuCellState> {
  public state: ISudokuCellState = {
    value: this.props.value,
    focused: false
  };

  /**
   * Reference to the input element
   */
  public input: HTMLInputElement;

  /**
   * Click trigger
   */
  private click() {
    this.input.focus();
  }

  private change(value: string) {
    const newValue = parseInt(value) || 0;
    if (newValue === this.state.value)
      return;
    this.setState({
      value: newValue
    }, () => {
      this.props.onChange(newValue);
    });
  }

  /**
   * Listen to a change in the props
   * @param props changed props
   */
  public componentWillReceiveProps(props: ISudokuCellProps) {
    if ("value" in props) {
      this.setState({
        value: props.value
      });
    }
  }

  /**
   * React render
   */
  public render() {
    const { value, focused } = this.state;
    const className = ClassNames({
      "sudoku-cell": true,
      "focused": focused,
      "invalid": !this.props.valid
    });

    return (
      <fieldset
        className={className}
        onClick={() => this.click()}
      >
        <div className="sudoku-cell-input">
          <input
            value={value}
            ref={(ref) => this.input = ref}
            onKeyPress={event => this.change(event.key)}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
          />
        </div>
        <label>{value}</label>
      </fieldset>
    );
  }
}