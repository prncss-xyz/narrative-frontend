import { ThemeProvider } from "@emotion/react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "../theme";
import { Navigation } from "./Navigation";

describe("Navigation", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Router>
          <Navigation />
        </Router>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
