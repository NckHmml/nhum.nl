import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vitest } from "vitest";

import Checkbox from ".";

test("Component renders", () => {
  const onClick = vitest.fn();
  const { container } = render(<Checkbox checked onClick={onClick}>Checkbox</Checkbox>);

  expect(screen.queryByText("Checkbox")).toBeInTheDocument();
  expect(screen.queryByTestId("c-checkbox-label")).toBeInTheDocument();
  expect(container.querySelector("input")).not.toBeNull();
  expect(container.querySelector("input")!.checked).toBeTruthy();
});

test("Component renders without children", () => {
  const onClick = vitest.fn();
  const { container } = render(<Checkbox checked={false} onClick={onClick} />);
  expect(screen.queryByTestId("c-checkbox-label")).not.toBeInTheDocument();
  expect(container.querySelector(".toggle")).not.toBeNull();
  expect(container.querySelector("input")).not.toBeNull();
  expect(container.querySelector("input")!.checked).toBeFalsy();
});

test("onClick event is triggered", async () => {
  const onClick = vitest.fn();
  render(<Checkbox checked onClick={onClick}>Checkbox</Checkbox>);

  await userEvent.click(screen.getByText("Checkbox"));
  expect(onClick).toHaveBeenCalled();
});