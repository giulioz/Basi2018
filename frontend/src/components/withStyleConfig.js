import { CssBaseline, MuiThemeProvider, withStyles } from "@material-ui/core";
import React, { PureComponent } from "react";

import { globalStyles, GlobalTheme } from "../config/theme";

const createStyled = styles => {
  function StyleComponent(props) {
    return props.children;
  }
  return withStyles(styles)(StyleComponent);
};

export default function withStyleConfig() {
  return function decorator(Component) {
    return class WrappedWithStyleConfig extends PureComponent {
      render() {
        const GlobalStyled = createStyled(globalStyles);

        return (
          <MuiThemeProvider theme={GlobalTheme}>
            <CssBaseline>
              <GlobalStyled>
                <Component />
              </GlobalStyled>
            </CssBaseline>
          </MuiThemeProvider>
        );
      }
    };
  };
}
