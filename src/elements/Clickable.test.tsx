import { expect, it } from "vitest";
import renderer from "react-test-renderer";
import { Clickable } from "./Clickable";

it("renders correctly", () => {
  const tree = renderer.create(<Clickable onClick={console.log}>Test</Clickable>).toJSON();
  expect(tree).toMatchSnapshot();
});
