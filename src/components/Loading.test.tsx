import { render } from "@testing-library/react";
import { Loading } from "./Loading";

test("Loading", () => {
  const { container } = render(<Loading />);
  it("should match snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});
