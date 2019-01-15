import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  withStyles,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  InputBase,
  Chip
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import PlusIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Row from "./Row";

const styles = theme => ({
  root: {
    maxWidth: 600,
    width: "100%",
    margin: "auto"
  },
  title: {
    flexGrow: 1
  },
  titleContainer: {
    marginBottom: theme.spacing.unit
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.15)
    }
  },
  searchIcon: {
    right: 0,
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
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
          <Typography variant="h4" className={classes.title}>
            Catalogo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Cerca…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </Row>
        <List>
          {aggregatedCart.map(item => (
            <ListItem key={item.name}>
              <ListItemText
                primary={
                  <>
                    <strong>{item.name}</strong> - €{item.price}
                  </>
                }
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
