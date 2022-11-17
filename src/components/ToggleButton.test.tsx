import { fireEvent, render, screen } from "@testing-library/react";
import { ToggleButton } from "./ToggleButton";

describe("ToggleButton", () => {
  describe("not disabled", () => {
    it("should trigger when clicked", () => {
      const spy = vi.fn();
      const { container } = render(
        <ToggleButton onClick={spy}>not disabled</ToggleButton>
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
        <ToggleButton disabled={true} onClick={spy}>
          disabled
        </ToggleButton>
      );
      fireEvent.click(screen.getByText("disabled"));
      expect(spy).toHaveBeenCalledTimes(0);
      expect(container).toMatchSnapshot();
    });
  });
});
