import { fireEvent, render, screen } from "@testing-library/react";
import { TogglingSelector } from "./TogglingSelector";

test("TogglingSelector", () => {
  const keys = ["a", "b", "c"];
  const state = ["a", "b"];
  const setState = vi.fn();

  const { container } = render(
    <TogglingSelector
      state={state}
      setState={setState}
      items={keys.map((key) => ({
        key,
        toElem: ({ onClick }) => <button onClick={onClick}>{key}</button>,
      }))}
    />
  );
  it("should match snapshop", () => {
    expect(container).toMatchSnapshot();
  });
  fireEvent.click(screen.getByText("b"));
  it("should remove from state", () => {
    expect(setState.mock.calls[0][0]).toEqual(["a"]);
  });
  fireEvent.click(screen.getByText("c"));
  it("should remove from state", () => {
    expect(setState.mock.calls[1][0]).toEqual(["a", "b", "c"]);
  });
});
