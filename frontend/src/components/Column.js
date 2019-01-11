import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
};

class Column extends React.PureComponent {
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

export default withStyles(styles)(Column);
