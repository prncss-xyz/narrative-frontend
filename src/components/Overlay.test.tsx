import { fireEvent, render, screen } from "@testing-library/react";
import { Overlay } from "./Overlay";

describe("Overlay", () => {
  describe("closed", () => {
    it("should not display child component", () => {
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
      expect(screen.queryByText("closed-inside")).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });
  describe("opened", () => {
    it("should call handler when clicked outside", () => {
      const spy = vi.fn();
      const { container } = render(
        <div data-testid="opened-outside">
          <Overlay visible={true} setVisible={spy}>
            <div>opened-inside</div>
          </Overlay>
        </div>
      );
      screen.getByText("opened-inside");
      fireEvent.click(screen.getByTestId("opened-outside"));
      expect(spy).toBeCalledTimes(1);
      expect(container).toMatchSnapshot();
    });
  });
});
