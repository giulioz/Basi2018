import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  withStyles,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ChevronLeft";
import Row from "./Row";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    maxWidth: 600,
    width: "100%"
  },
  title: {
    flexGrow: 1
  },
  titleContainer: {
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(
  ({ classes, catalogItems, cart, onAddToCart, onClearCartItem }) => {
    const [search, setSearch] = useState("");
    const filteredItems =
      search && search.length > 0
        ? catalogItems.filter(
            item =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.ingredients.filter(ing =>
                ing.toLowerCase().includes(search.toLowerCase())
              ).length > 0
          )
        : catalogItems;

    const aggregatedCart = filteredItems.map(item => ({
      ...item,
      count: (cart && cart.filter(ci => ci.name === item.name).length) || 0
    }));

    return (
      <div className={classes.root}>
        <Row align="center" className={classes.titleContainer}>
          <IconButton component={Link} to="/" color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Il tuo Carrello
          </Typography>
        </Row>
        <List>
          {aggregatedCart.map(item => (
            <ListItem key={item.name}>
              <ListItemText
                primary={item.name}
                secondary={item.ingredients.join(", ")}
              />
              <ListItemSecondaryAction>
                {item.count > 0 && (
                  <Chip
                    label={item.count}
                    onDelete={() => onClearCartItem(item.name)}
                    color="primary"
                  />
                )}
                <IconButton
                  color="inherit"
                  onClick={() => onAddToCart(item.name)}
                >
                  <PlusIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
);
