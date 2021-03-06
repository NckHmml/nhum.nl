import * as React from "react";

import { ClassNames } from "~/helpers/classnames";

export interface ICheckboxProps {
  /** Checked state callback */
  onChange?: (checked: boolean) => void;
  /** Title label */
  title?: string;
  /** Default checked state */
  defaultValue?: boolean;
  /** Optional class names */
  className?: string;
}

interface ICheckboxState {
  checked: boolean;
}

/**
 * Checkbox styled as a toggle element
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
    const { className, title } = this.props;

    const rootClass = ClassNames({
      "c-checkbox": true,
      [`${className}`]: Boolean(className)
    });

    return (
      <span className={rootClass}>
        <input
          type="checkbox"
          checked={this.state.checked}
          readOnly={true}
        />
        <label onClick={this.switch}>
          {title ? <span>{title}</span> : undefined}
          <span className="c-checkbox-toggle" />
        </label>
      </span>
    );
  }
}

// Needed for styleguidist
export default Checkbox;