import { fireEvent, render, screen } from "@testing-library/react";
import { Overlay } from "./Overlay";

test("Overlay", () => {
  test("closed", () => {
    const { container } = render(
      <div data-testid="closed-outside">
        <Overlay
          visible={false}
          setVisible={() => {
            /* do nothing */
          }}
        >
          <div>closed-inside</div>
        </Overlay>
      </div>
    );
    it("should not find inside", () => {
      expect(screen.queryByText("closed-inside")).toBeNull();
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  test("opened", () => {
    const spy = vi.fn();
    const { container } = render(
      <div data-testid="opened-outside">
        <Overlay visible={true} setVisible={spy}>
          <div>opened-inside</div>
        </Overlay>
      </div>
    );
    it("should be visible", () => {
      screen.getByText("opened-inside");
    });
    fireEvent.click(screen.getByTestId("opened-outside"));
    it("should call handler", () => {
      expect(spy).toBeCalledTimes(1);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
