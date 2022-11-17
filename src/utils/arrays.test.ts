import { intersects, setInArray } from "./arrays";

describe("intersects", () => {
  it("should determine wether elements of two arrays intersects", () => {
    expect(intersects([1, 2], [2, 3])).toBeTruthy();
    expect(intersects([1, 2], [4, 5])).toBeFalsy();
  });
});

describe("setInArray", () => {
  it("should perform proper operations", () => {
    expect(setInArray([1, 2, 3], 3, true)).toEqual([1, 2, 3]);
    expect(setInArray([1, 2, 3], 0, true)).toEqual([0, 1, 2, 3]);
    expect(setInArray([1, 2, 3], 2, false)).toEqual([1, 3]);
    expect(setInArray([1, 2, 3], 0, false)).toEqual([1, 2, 3]);
  });
});
