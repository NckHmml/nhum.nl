import * as React from "react";

interface CheckboxProps {
  onChange?: (checked: boolean) => void
  title?: string;
  checked: boolean;
}

export const Checkbox: React.StatelessComponent<CheckboxProps> = (props) => {
  return (
    <span className="checkbox">
      <input
        type="checkbox"
        checked={props.checked}
        readOnly
      />
      <label onClick={() => props.onChange(!props.checked)}>
        <span>{props.title}</span>
        <span className="checkbox-toggle"></span>
      </label>
    </span>
  );
};