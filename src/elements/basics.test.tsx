import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ActionBox,
  Box,
  Flex,
  H1,
  H3,
  Img,
  OverlayActionBox,
} from "./basics";

describe("basics", () => {
  describe("Img", () => {
    const { container } = render(<Img />);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("Box", () => {
    const { container } = render(<Box />);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("Flex", () => {
    const { container } = render(<Flex />);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("H1", () => {
    const { container } = render(<H1>H1</H1>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("H2", () => {
    const { container } = render(<H3>H2</H3>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("H3", () => {
    const { container } = render(<H3>h3</H3>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("ActionBox", () => {
    const { container } = render(<ActionBox>h3</ActionBox>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("OverlayActionBox", () => {
    const { container } = render(<OverlayActionBox>h3</OverlayActionBox>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
