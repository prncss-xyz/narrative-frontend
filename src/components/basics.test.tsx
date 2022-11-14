import { render } from "@testing-library/react";
import { ActionBox, Box, Flex, H1, H3, Img, OverlayActionBox } from "./basics";

test("basics", () => {
  test("Img", () => {
    const { container } = render(<Img />);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("Box", () => {
    const { container } = render(<Box />);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("Flex", () => {
    const { container } = render(<Flex />);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("H1", () => {
    const { container } = render(<H1>H1</H1>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("H2", () => {
    const { container } = render(<H3>H2</H3>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("H3", () => {
    const { container } = render(<H3>h3</H3>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("ActionBox", () => {
    const { container } = render(<ActionBox>h3</ActionBox>);
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("OverlayActionBox", () => {
    const { container } = render(<OverlayActionBox>h3</OverlayActionBox>);

    expect(container).toMatchSnapshot();
  });
});
