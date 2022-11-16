import { render } from "@testing-library/react";
import { ErrorFallback } from "./ErrorFallback";

describe("ErrorFallback", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ErrorFallback error={{ message: "message" }} />
    );
    expect(container).toMatchSnapshot();
  });
});
