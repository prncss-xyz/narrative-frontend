import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  describe("validate: true", () => {
    it("should trigger when clicked", () => {
      function converter(v: string) {
        const n = Number(v);
        if (isNaN(n)) return;
        return n;
      }
      const setValue = vi.fn();
      const { container } = render(
        <Input
          placeholder="placeholder"
          value={3}
          setValue={setValue}
          converter={converter}
        />
      );
      const input3 = screen.getByDisplayValue("3");
      fireEvent.change(input3, { target: { value: "5" } });
      const input5 = screen.getByDisplayValue("5");
      expect(setValue).toHaveBeenCalledTimes(1);
      fireEvent.change(input5, { target: { value: "a" } });
      expect(() => {
        screen.getByDisplayValue("a");
      }).toThrowErrorMatchingSnapshot();
      expect(container).toMatchSnapshot();
    });
  });
  describe("disabled", () => {
    it("should render correctly", () => {
      const setValue = () => {
        /* do nothing */
      };
      const { container } = render(
        <Input
          placeholder="placeholder"
          value={3}
          setValue={setValue}
          converter={Number}
        />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
