import { fireEvent, render, screen } from "@testing-library/react";
import { RoundedButton } from "./RoundedButton";

describe("RoundedButton", () => {
  describe("not disabled", () => {
    it("should trigger when clicked", () => {
      const spy = vi.fn();
      const { container } = render(
        <RoundedButton onClick={spy}>not disabled</RoundedButton>
      );
      fireEvent.click(screen.getByText("not disabled"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(container).toMatchSnapshot();
    });
  });
  describe("disabled", () => {
    it("should trigger when clicked", () => {
      const spy = vi.fn();
      const { container } = render(
        <RoundedButton disabled={true} onClick={spy}>
          disabled
        </RoundedButton>
      );
      fireEvent.click(screen.getByText("disabled"));
      expect(spy).toHaveBeenCalledTimes(0);
      expect(container).toMatchSnapshot();
    });
  });
});
