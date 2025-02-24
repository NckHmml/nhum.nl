import { PropsWithChildren } from "react";

interface Props {
  checked: boolean;
  onClick: () => void;
}

const Checkbox: React.FC<PropsWithChildren<Props>> = ({ checked, onClick, children }) => {
  return (
    <div className="c-checkbox" onClick={onClick}>
      <style jsx>{`
        .c-checkbox {
          display: inline-block;
        }

        div, span {
          cursor: pointer;
          user-select: none;
        }

        label {
          line-height: 1em;
          display: block;
        }

        input {
          display: none;
        }

        .toggle {
          border: 1px solid var(--color-primary);
          border-radius: 1em;
          box-sizing: content-box;
          display: inline-block;
          height: 1em;
          position: relative;
          width: 1.8em;
        }

        .toggle::after {
          --height: calc(1em - 2px);
          background-color: var(--color-primary);
          border-radius: var(--height);
          bottom: 0;
          left: 2px;
          top: 0;
          content: ' ';
          height: var(--height);
          width: var(--height);
          margin: auto;
          position: absolute;
        }

        input:checked + label .toggle::after {
          background-color: var(--color-tertiary);
          left: initial;
          right: .1em;
        }

        span {
          vertical-align: middle;
        }
      `}</style>
      <input
        type="checkbox"
        checked={checked}
        readOnly
      />
      <label>
        {Boolean(children) ? <span data-testid="c-checkbox-label">{children}&nbsp;</span> : undefined}
        <span className="toggle" />
      </label>
    </div>
  );
};

export default Checkbox;