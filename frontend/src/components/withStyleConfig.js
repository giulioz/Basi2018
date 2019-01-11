import { CssBaseline, MuiThemeProvider, withStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import itLocale from "date-fns/locale/it";

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
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
                  <Component />
                </MuiPickersUtilsProvider>
              </GlobalStyled>
            </CssBaseline>
          </MuiThemeProvider>
        );
      }
    };
  };
}
