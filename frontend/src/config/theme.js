import { createMuiTheme } from "@material-ui/core/styles";

export const globalStyles = {
  "@global": {
    "html, body, #root": {
      height: "100%",
      overscrollBehaviorY: "none"
    },
    "#root": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }
};

export const GlobalTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { main: "rgba(0, 0, 0, 0.87)" }
    // type: "dark"
  },
  drawerWidth: 240
});
