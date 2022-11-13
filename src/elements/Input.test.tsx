import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  describe("validate: true", () => {
    const validate = (_: string) => true;
    const setValue = vi.fn();
    const { container } = render(
      <Input
        placeholder="placeholder"
        value="value: true"
        setValue={setValue}
        validate={validate}
      />
    );
    const input = screen.getByDisplayValue("value: true");
    fireEvent.change(input, { target: { value: "new" } });
    it("should trigger when clicked", () => {
      expect(setValue).toHaveBeenCalledTimes(1);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("validate: false", () => {
    const validate = (_: string) => false;
    const setValue = vi.fn();
    render(
      <Input
        placeholder="placeholder"
        value="value: false"
        setValue={setValue}
        validate={validate}
      />
    );
    const input = screen.getByDisplayValue("value: false");
    fireEvent.change(input, { target: { value: "new" } });
    it("should trigger when clicked", () => {
      expect(setValue).toHaveBeenCalledTimes(0);
    });
  });
  describe("disabled", () => {
    const validate = (_: string) => false;
    const setValue = (_: string) => {
      /* do nothing */
    };
    const { container } = render(
      <Input
        placeholder="placeholder"
        value="disabled"
        setValue={setValue}
        validate={validate}
      />
    );
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
