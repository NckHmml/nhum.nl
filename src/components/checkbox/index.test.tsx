import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vitest } from "vitest";

import Checkbox from ".";

test("Component renders", () => {
  const onClick = vitest.fn();
  render(<Checkbox checked onClick={onClick}>Checkbox</Checkbox>);

  expect(screen.getByText("Checkbox")).toBeDefined();
});

test("onClick event is triggered", async () => {
  const onClick = vitest.fn();
  render(<Checkbox checked onClick={onClick}>Checkbox</Checkbox>);

  await userEvent.click(screen.getByText("Checkbox"));
  expect(onClick).toHaveBeenCalled();
});