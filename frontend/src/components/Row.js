import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex"
  }
};

class Row extends React.PureComponent {
  render() {
    const { classes, children, className, align, justify, grow } = this.props;

    return (
      <div
        className={`${classes.root} ${className || ""}`}
        style={{
          alignItems: align,
          justifyContent: justify,
          flexGrow: grow ? 1 : 0
        }}
      >
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Row);
