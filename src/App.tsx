import { Global, ThemeProvider, useTheme } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "modern-css-reset/dist/reset.min.css";
import { ErrorBoundary } from "react-error-boundary";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Box, H1 } from "./components/basics";
import { ErrorFallback } from "./components/ErrorFallback";
import { CountrySelectorContext } from "./components/GlobalCountrySelection";
import { Navigation } from "./components/Navigation";
import Error404Page from "./pages/404";
import BuyOrderListPage from "./pages/BuyOrderList";
import NewBuyOrderPage from "./pages/CreateBuyOrder";
import DatasetListPage from "./pages/DatasetList";
import EditBuyOrderPage from "./pages/EditBuyOrder";
import ViewBuyOrderPage from "./pages/ViewBuyOrder";
import theme from "./theme";

function GlobalStyle() {
  const theme: any = useTheme();
  return (
    <Global
      styles={{
        body: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          backgroundColor: theme.colors.bgLight,
          fontFamily: "'Noto Sans', Arial, Helvetica, sans serif",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          fontSize: theme.fontSizes[2],
          lineHeight: "1.5",
          "& a": {
            color: "inherit",
            textDecoration: "inherit",
            fontStyle: "inherit",
          },
          "& :disabled": {
            color: "inherit",
          },
        },
      }}
    />
  );
}

function Headers() {
  return (
    <Routes>
      <Route path="/buy-order-list" element={<H1>Your Buy Orders</H1>} />
      <Route path="/dataset-list" element={<H1>Datasets</H1>} />
      <Route path="/view-buy-order/:id" element={<H1>Buy Order Details</H1>} />
      <Route path="/edit-buy-order/:id" element={<H1>Edit Buy Order</H1>} />
      <Route path="/new-buy-order/" element={<H1>New Buy Order</H1>} />
      <Route path="*" element={<H1>404</H1>} />
    </Routes>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CountrySelectorContext>
          <Router>
            <Navigation />
            <Headers />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate replace to="/buy-order-list" />}
                />
                <Route path="/buy-order-list" element={<BuyOrderListPage />} />
                <Route path="/dataset-list" element={<DatasetListPage />} />
                <Route
                  path="/view-buy-order/:id"
                  element={<ViewBuyOrderPage />}
                />
                <Route
                  path="/edit-buy-order/:id"
                  element={<EditBuyOrderPage />}
                />
                <Route path="/new-buy-order/" element={<NewBuyOrderPage />} />
                <Route path="*" element={<Error404Page />} />
              </Routes>
            </ErrorBoundary>
            <Box pb={5} />
          </Router>
        </CountrySelectorContext>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
