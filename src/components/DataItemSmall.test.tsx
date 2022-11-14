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

test("DataItemSmall", () => {
  test("not disabled", async () => {
    const spy = vi.fn();
    const { container } = render(
      <DatasetItemSmall
        dataset={{ ...dataset, label: "Not Disabled" }}
        onClick={spy}
      />
    );
    fireEvent.click(screen.getByText("Not Disabled"));
    it("should trigger when clicked", () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });

  test("disabled", async () => {
    const spy = vi.fn();
    const { container } = render(
      <DatasetItemSmall
        dataset={{ ...dataset, label: "Disabled" }}
        onClick={spy}
        disabled
      />
    );
    fireEvent.click(screen.getByText("Disabled"));
    it("should not trigger when clicked", () => {
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });

  test("active", () => {
    const { container } = render(
      <DatasetItemSmall dataset={{ ...dataset, label: "Disabled" }} active />
    );
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });
});
