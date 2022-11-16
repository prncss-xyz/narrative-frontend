import { convertMoney, normalizeMoney } from "./money";

describe.only("money", () => {
  describe("normalizeMoney", () => {
    it("should remove decimals more than 2", () => {
      expect(normalizeMoney("")).toBe("");
      expect(normalizeMoney("12.4")).toBe("12.4");
      expect(normalizeMoney("12.43")).toBe("12.43");
      expect(normalizeMoney("12.434")).toBe("12.43");
    });
  });
  describe("convertMoney", () => {
    it("should convert to number if valid and not negative", () => {
      expect(convertMoney("")).toBe(0);
      expect(convertMoney("10.23")).toBe(10.23);
      expect(convertMoney("a")).toBeUndefined();
      expect(convertMoney("-1")).toBeUndefined();
    });
  });
});
