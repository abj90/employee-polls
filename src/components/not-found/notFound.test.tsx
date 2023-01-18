import { render } from "@testing-library/react";
import NotFound from ".";

describe("NotFound", () => {
  it("will match snapshot", () => {
    const view = render(<NotFound />);

    expect(view).toMatchSnapshot();
  });
});

export {};
