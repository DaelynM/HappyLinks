import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#1e1e2f",
    },
    primary: {
      main: "#1583f9",
    },
  },
  status: {
    danger: "orange",
  },
});

export default theme;
