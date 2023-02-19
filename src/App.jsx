import React from "react";
import DataTable from "./DataTable";
import data from "./data";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { Roboto } from "@fontsource/roboto";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    components: {
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            "& th": {
              fontWeight: "bold",
              textAlign: "left",
              backgroundColor: "#f2f2f2",
              color: "#444",
              borderBottom: "none",
            },
            "& th:first-child": {
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            },
            "& th:last-child": {
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
            },
            "& td": {
              borderBottom: "1px solid #ddd",
            },
            "& td:first-child": {
              paddingLeft: "16px",
            },
            "& td:last-child": {
              paddingRight: "16px",
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            "& tr:last-child td": {
              borderBottom: "none",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <>Kemp's Cannabis Deals</h1> */}
      <DataTable data={data} />
    </ThemeProvider>
  );
};

export default App;
