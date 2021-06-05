import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const appPrimary = "#2a3d66";
const appSecondary = "#ac8f9c";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: appPrimary,
    },
    secondary: {
      main: appSecondary,
    },
  },
  typography: {
    fontFamily: `'Inconsolata', monospace`,
  },
  input: {
    paddingLeft: "20px",
    background: "#eeeeee",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    transition: "all 0.2s ease",
    boxShadow: "0px 0px 3px 1px black",
  },
  card: {
    margin: "25px auto 0px auto",
    height: "700px",
    width: "80%",
    borderRadius: "10px",
    boxShadow: "-5px 0px 10px 2px black",
  },
  links: {
    color: "white",
    textDecoration: "none",
  },
  centerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
