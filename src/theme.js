import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  status: {
    danger: "orange",
  },
  typography: {},
});

export default theme;
