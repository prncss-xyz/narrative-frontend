import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Clickable } from "./Clickable";

test("Clickable", () => {
  test("not disabled", async () => {
    const spy = vi.fn();
    const { container } = render(
      <Clickable onClick={spy}>not disabled</Clickable>
    );
    await userEvent.click(screen.getByText("not disabled"));
    it("should trigger when clicked", () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("disabled", async () => {
    const spy = vi.fn();
    const { container } = render(
      <Clickable disabled={true} onClick={spy}>
        disabled
      </Clickable>
    );
    await userEvent.click(screen.getByText("disabled"));
    it("should trigger when clicked", () => {
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
