import { render } from "@testing-library/react";
import { ActionBox, Box, Flex, H1, H3, Img, OverlayActionBox } from "./basics";

describe("basics", () => {
  describe("Img", () => {
    it("should render properly", () => {
      const { container } = render(<Img />);
      expect(container).toMatchSnapshot();
    });
  });
  describe("Box", () => {
    it("should render properly", () => {
      const { container } = render(<Box />);
      expect(container).toMatchSnapshot();
    });
  });
  describe("Flex", () => {
    it("should render properly", () => {
      const { container } = render(<Flex />);
      expect(container).toMatchSnapshot();
    });
  });
  describe("H1", () => {
    it("should render properly", () => {
      const { container } = render(<H1>H1</H1>);
      expect(container).toMatchSnapshot();
    });
  });
  describe("H2", () => {
    it("should render properly", () => {
      const { container } = render(<H3>H2</H3>);
      expect(container).toMatchSnapshot();
    });
  });
  describe("H3", () => {
    it("should render properly", () => {
      const { container } = render(<H3>h3</H3>);
      expect(container).toMatchSnapshot();
    });
  });
  describe("ActionBox", () => {
    it("should render properly", () => {
      const { container } = render(<ActionBox>h3</ActionBox>);
      expect(container).toMatchSnapshot();
    });
  });
  describe("OverlayActionBox", () => {
    it("should render properly", () => {
      const { container } = render(<OverlayActionBox>h3</OverlayActionBox>);
      expect(container).toMatchSnapshot();
    });
  });
});
