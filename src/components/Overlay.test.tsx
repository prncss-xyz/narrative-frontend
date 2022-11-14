import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Overlay } from "./Overlay";

describe("Overlay", () => {
  describe.skip("closed", () => {
    const { container } = render(
      <div data-testid="closed-outside">
        <Overlay
          visible={false}
          onClickOutside={() => {
            /* do nothing */
          }}
        >
          <div>closed-inside</div>
        </Overlay>
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
    const spy = vi.fn();
    const { container } = render(
      <div data-testid="opened-outside">
        <Overlay visible={true} onClickOutside={spy}>
          <div>opened-inside</div>
        </Overlay>
      </div>
    );
    it("should be visible", () => {
      screen.getByText("opened-inside");
    });
    await userEvent.click(screen.getByTestId("opened-outside"));
    it("should call handler", () => {
      expect(spy).toBeCalledTimes(1);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
