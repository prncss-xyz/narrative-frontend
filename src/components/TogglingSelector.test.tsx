import { fireEvent, render, screen } from "@testing-library/react";
import { TogglingSelector } from "./TogglingSelector";

describe("TogglingSelector", () => {
  it("toggle key appartenance to list when clicked on associated element", () => {
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
    expect(container).toMatchSnapshot();
    fireEvent.click(screen.getByText("b"));
    expect(setState.mock.calls[0][0]).toEqual(["a"]);
    fireEvent.click(screen.getByText("c"));
    expect(setState.mock.calls[1][0]).toEqual(["a", "b", "c"]);
  });
});
