import { describe, expect, it } from "vitest";
import { intersects } from "./intersects";
describe("intersects", () => {
  it("description", () => {
    expect(intersects([1, 2], [2, 3])).toBeTruthy();
    expect(intersects([1, 2], [4, 5])).toBeFalsy();
  });
});
