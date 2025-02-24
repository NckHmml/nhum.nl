import { render, screen } from "@testing-library/react";

import Loader from ".";

test("Component renders", () => {
  render(<Loader />);

  expect(screen.queryByText("Loading")).toBeInTheDocument();
});