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

/**
 * Sudoku cell partial
 */
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
  private click = () => {
    this.input.focus();
  }

  /**
   * Handles the change event
   * @param event onKeyPress event
   */
  private change = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.key) || 0;
    if (newValue === this.state.value)
      return;
    this.setState({
      value: newValue
    }, () => {
      this.props.onChange(newValue);
    });
  }

  /**
   * Sets the ref to the input element
   */
  private setInput = (input: HTMLInputElement) => {
    this.input = input;
  }

  /**
   * Sets the focused state
   * @param focused new focus state
   */
  private setFocus(focused: boolean) {
    return () => {
      this.setState({
        focused: focused
      });
    };
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
        onClick={this.click}
      >
        <div className="sudoku-cell-input">
          <input
            value={value}
            ref={this.setInput}
            onKeyPress={this.change}
            onFocus={this.setFocus(true)}
            onBlur={this.setFocus(false)}
          />
        </div>
        <label>{value}</label>
      </fieldset>
    );
  }
}