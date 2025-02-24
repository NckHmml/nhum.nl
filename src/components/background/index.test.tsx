import { render, screen } from "@testing-library/react";

import BackgroundComponent from "./component";

test("Component renders", () => {
  render(<BackgroundComponent />);

  expect(screen.queryByTestId("c-background")).toBeInTheDocument();
});