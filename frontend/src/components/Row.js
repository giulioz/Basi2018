import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = {
  root: {
    display: "flex"
  }
};

class Row extends React.PureComponent {
  render() {
    const { classes, children, className, align, justify } = this.props;

    return (
      <div
        className={`${classes.root} ${className || ""}`}
        style={{ alignItems: align, justifyContent: justify }}
      >
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Row);
