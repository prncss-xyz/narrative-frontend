import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorFallback } from "./ErrorFallback";

describe("ErrorFallback", () => {
  const { container } = render(
    <ErrorFallback error={{ message: "message" }} />
  );
  it("should match snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});
