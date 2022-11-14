import { intersects } from "./intersects";
test("intersects", () => {
  it("description", () => {
    expect(intersects([1, 2], [2, 3])).toBeTruthy();
    expect(intersects([1, 2], [4, 5])).toBeFalsy();
  });
});
