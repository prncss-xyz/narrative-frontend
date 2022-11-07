import "modern-css-reset/dist/reset.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Global, ThemeProvider, useTheme } from "@emotion/react";
import Navigation from "./elements/Navigation";
import BuyOrderList from "./pages/BuyOrderList";
import DatasetList from "./pages/DatasetList";
import ViewBuyOrder from "./pages/ViewBuyOrder";
import EditBuyOrder from "./pages/EditBuyOrder";
import NewBuyOrder from "./pages/NewBuyOrder";
import Error404 from "./pages/404";
import { CountrySelectorContext } from "./elements/CountrySelector";

import theme from "./theme";

function GlobalStyle() {
  const theme = useTheme() as any;
  return (
    <Global
      styles={{
        body: {
          backgroundColor: theme.colors.gray3,
          fontFamily: "Arial, Helvetica, sans serif",
          fontSize: theme.fontSizes[2],
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CountrySelectorContext>
        <GlobalStyle />
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate replace to="/buy-order-list" />} />
            <Route path="/buy-order-list" element={<BuyOrderList />} />
            <Route path="/dataset-list" element={<DatasetList />} />
            <Route path="/view-buy-order/:id" element={<ViewBuyOrder />} />
            <Route path="/edit-buy-order/:id" element={<EditBuyOrder />} />
            <Route path="/new-buy-order/" element={<NewBuyOrder />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </CountrySelectorContext>
    </ThemeProvider>
  );
}

export default App;
