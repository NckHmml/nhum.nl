import * as React from "react";

import { ClassNames } from "~/helpers/classnames";

export interface IButtonProps {
  /** OnClick callback */
  onClick: () => void;
  /** Type of the button */
  type?: "primary" | "secondary";
  /** Child elements */
  children?: React.ReactChild;
  /** Optional class names */
  className?: string;
}

/**
 * Styled button
 * @example readme.md
 */
export class Button extends React.Component<IButtonProps> {
  public static defaultProps: Partial<IButtonProps> = {
    type: "primary"
  };

  /**
   * OnClick handler
   */
  public click = () => {
    this.props.onClick();
  }

  /**
   * React render
   */
  public render() {
    const { className, children, type } = this.props;
    const rootClass = ClassNames({
      "c-button": true,
      [`${type}`]: Boolean(type),
      [`${className}`]: Boolean(className)
    });

    return (
      <button
        className={rootClass}
        onClick={this.click}
      >
        {children}
      </button>
    );
  }
}

// Needed for styleguidist
export default Button;