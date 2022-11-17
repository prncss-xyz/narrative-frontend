import { fireEvent, render, screen } from "@testing-library/react";
import { DatasetItemSmall } from "./DataItemSmall";

const dataset = {
  id: 1,
  name: "fishing",
  label: "Fishing Zones",
  description:
    "Data about global fishing zones, including yields, historical trends and ocean life surveys.",
  thumbnailUrl: "https://picsum.photos/id/1038/92/92",
  costPerRecord: 0.03,
};

describe("DataItemSmall", () => {
  describe("not active", () => {
    it("should trigger when clicked", () => {
      const spy = vi.fn();
      const { container } = render(
        <DatasetItemSmall
          dataset={{ ...dataset, label: "Not Active" }}
          active={false}
          setActive={spy}
        />
      );
      fireEvent.click(screen.getByText("Not Active"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(container).toMatchSnapshot();
    });
  });
  describe("active", () => {
    it("should render correctly", () => {
      const { container } = render(
        <DatasetItemSmall
          active={true}
          dataset={{ ...dataset, label: "Active" }}
        />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
