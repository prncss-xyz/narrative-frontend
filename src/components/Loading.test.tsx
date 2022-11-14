import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loading } from "./Loading";

describe("Loading", () => {
  const { container } = render(<Loading />);
  it("should match snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});
