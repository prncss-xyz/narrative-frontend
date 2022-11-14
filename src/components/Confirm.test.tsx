import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Confirm } from "./Confirm";

describe("Confirm", () => {
  describe("closed", () => {
    const { container } = render(
      <div data-testid="closed-outside">
        <Confirm
          overlayVisible={false}
          setOverlayVisible={() => {
            /* do nothing */
          }}
          handler={() => {
            /* do nothing */
          }}
        >
          <div>closed-inside</div>
        </Confirm>
      </div>
    );
    it("should not find inside", () => {
      expect(() => {
        screen.getByText("closed-inside");
      }).toThrowErrorMatchingSnapshot('"error"');
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
  describe("opened", async () => {
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
    await userEvent.click(screen.getByText("Yes"));
    it("should call handler", () => {
      expect(handler).toBeCalledTimes(1);
    });
    await userEvent.click(screen.getByText("No"));
    it("should call setOverlayVisible", () => {
      expect(setOverlayVisible).toBeCalledTimes(1);
      expect(setOverlayVisible).toBeCalledWith(false);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
