import * as React from "react";

interface ICheckboxProps {
  onChange?: (checked: boolean) => void
  title?: string;
  checked: boolean;
}

export const Checkbox: React.StatelessComponent<ICheckboxProps> = (props) => {
  return (
    <span className="checkbox">
      <input
        type="checkbox"
        checked={props.checked}
        readOnly={true}
      />
      <label onClick={() => props.onChange(!props.checked)}>
        <span>{props.title}</span>
        <span className="checkbox-toggle" />
      </label>
    </span>
  );
};