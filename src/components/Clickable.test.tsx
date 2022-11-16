import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Clickable } from "./Clickable";

describe("Clickable", () => {
  describe("disabled", () => {
    it("should trigger when clicked", async () => {
      const spy = vi.fn();
      const { container } = render(
        <Clickable onClick={spy}>not disabled</Clickable>
      );
      await userEvent.click(screen.getByText("not disabled"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(container).toMatchSnapshot();
    });
    it("should trigger when clicked", async () => {
      const spy = vi.fn();
      const { container } = render(
        <Clickable disabled={true} onClick={spy}>
          disabled
        </Clickable>
      );
      await userEvent.click(screen.getByText("disabled"));
      expect(spy).toHaveBeenCalledTimes(0);
      expect(container).toMatchSnapshot();
    });
  });
});
