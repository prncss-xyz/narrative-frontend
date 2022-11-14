import { render } from "@testing-library/react";
import { ErrorFallback } from "./ErrorFallback";

test("ErrorFallback", () => {
  const { container } = render(
    <ErrorFallback error={{ message: "message" }} />
  );
  it("should match snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});
