import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  withStyles,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    minWidth: 600
  }
});

export default withStyles(styles)(({ classes, catalogItems }) => {
  const [search, setSearch] = useState("");

  return (
    <div className={classes.root}>
      <Typography variant="h4">Catalogo</Typography>
      <List>
        {catalogItems.map(item => (
          <ListItem key={item.name}>
            <ListItemText
              primary={item.name}
              secondary={item.ingredients.join(", ")}
            />
            <ListItemSecondaryAction>
              <IconButton color="inherit">
                <PlusIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
});
