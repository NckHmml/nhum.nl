import * as React from "react";

interface CheckboxProps {
  onChange?: (checked: boolean) => void
  title?: string;
  checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, void> {
  public render() {
    return (
      <span className="checkbox">
        <input
          type="checkbox"          
          checked={this.props.checked}
          readOnly
        />
        <label onClick={() => this.props.onChange(!this.props.checked)}>
          <span>{this.props.title}</span>
          <span className="checkbox-toggle"></span>
        </label>
      </span>
    );
  }
}