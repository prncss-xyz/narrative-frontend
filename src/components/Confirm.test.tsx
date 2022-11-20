import { fireEvent, render, screen } from "@testing-library/react";
import { Confirm } from "./Confirm";

describe("Confirm", () => {
  describe("closed", () => {
    it("should not display child component", () => {
      const { container } = render(
        <div data-testid="closed-outside">
          <Confirm
            overlayVisible={false}
            setOverlayVisible={() => {
              throw new Error("should not be called");
            }}
            handler={() => {
              throw new Error("should not be called");
            }}
          >
            <div>closed-inside</div>
          </Confirm>
        </div>
      );
      expect(() => {
        screen.getByText("closed-inside");
      }).toThrowErrorMatchingSnapshot('"error"');
      expect(container).toMatchSnapshot();
    });
  });
  describe("opened", () => {
    it("should call handler", () => {
      const setOverlayVisible = vi.fn();
      const handler = vi.fn();
      const { container } = render(
        <div data-testid="opened-outside">
          <Confirm
            overlayVisible={true}
            setOverlayVisible={setOverlayVisible}
            handler={handler}
          >
            <div>opened-inside</div>
          </Confirm>
        </div>
      );
      fireEvent.click(screen.getByText("Yes"));
      expect(handler).toBeCalledTimes(1);
      fireEvent.click(screen.getByText("No"));
      expect(setOverlayVisible).toBeCalledTimes(1);
      expect(setOverlayVisible).toBeCalledWith(false);
      expect(container).toMatchSnapshot();
    });
  });
});
