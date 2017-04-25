import * as React from "react";

export interface ICheckboxProps {
  /** Checked state callback */
  onChange?: (checked: boolean) => void;
  /** Title label */
  title?: string;
  /** Default checked state */
  defaultValue?: boolean;
}

interface ICheckboxState {
  checked: boolean;
}

/**
 * Checkbox component styled as switch button
 * @example readme.md
 */
export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  public state: ICheckboxState = {
    checked: this.props.defaultValue || false
  };

  /**
   * Switch checked state
   */
  private switch = () => {
    this.setState({
      checked: !this.state.checked
    }, () => {
      if (this.props.onChange)
        this.props.onChange(this.state.checked);
    });
  }

  /**
   * Listen to a change in the props
   * @param props changed props
   */
  public componentWillReceiveProps(props: ICheckboxProps) {
    if ("defaultValue" in props) {
      this.setState({
        checked: props.defaultValue
      });
    }
  }

  /**
   * React render
   */
  public render() {
    const title = this.props.title ? <span>{this.props.title}</span> : undefined;

    return (
      <span className="checkbox">
        <input
          type="checkbox"
          checked={this.state.checked}
          readOnly={true}
        />
        <label onClick={this.switch}>
          {title}
          <span className="checkbox-toggle" />
        </label>
      </span>
    );
  }
}

// Needed for styleguidist
export default Checkbox;