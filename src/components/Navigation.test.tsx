import { ThemeProvider } from "@emotion/react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it } from "vitest";
import theme from "../theme";
import { Navigation } from "./Navigation";

describe.todo("Navigation", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
  it("should match snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});
