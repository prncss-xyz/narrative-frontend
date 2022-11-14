import { fireEvent, render, screen } from "@testing-library/react";
import { RoundedButton } from "./RoundedButton";

test("RoundedButton", () => {
  test("not disabled", () => {
    const spy = vi.fn();
    const { container } = render(
      <RoundedButton onClick={spy}>not disabled</RoundedButton>
    );
    fireEvent.click(screen.getByText("not disabled"));
    it("should trigger when clicked", () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("disabled", () => {
    const spy = vi.fn();
    const { container } = render(
      <RoundedButton disabled={true} onClick={spy}>
        disabled
      </RoundedButton>
    );
    fireEvent.click(screen.getByText("disabled"));
    it("should trigger when clicked", () => {
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
