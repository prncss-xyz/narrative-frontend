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
  describe("not disabled", () => {
    it("should trigger when clicked", () => {
      const spy = vi.fn();
      const { container } = render(
        <DatasetItemSmall
          dataset={{ ...dataset, label: "Not Disabled" }}
          onClick={spy}
        />
      );
      fireEvent.click(screen.getByText("Not Disabled"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(container).toMatchSnapshot();
    });
  });

  describe("disabled", () => {
    it("should not trigger when clicked", () => {
      const spy = vi.fn();
      const { container } = render(
        <DatasetItemSmall
          dataset={{ ...dataset, label: "Disabled" }}
          onClick={spy}
          disabled
        />
      );
      fireEvent.click(screen.getByText("Disabled"));
      expect(spy).toHaveBeenCalledTimes(0);
      expect(container).toMatchSnapshot();
    });
  });

  describe("active", () => {
    it("should render correctly", () => {
      const { container } = render(
        <DatasetItemSmall dataset={{ ...dataset, label: "Disabled" }} active />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
