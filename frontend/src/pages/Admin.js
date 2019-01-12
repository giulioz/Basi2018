import React, { useState } from "react";
import classNames from "classnames";

import { Link, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { ListItem, ListItemText, List, ListItemIcon } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import PeopleIcon from "@material-ui/icons/People";

import Column from "../components/Column";
import Row from "../components/Row";
import DataView from "../components/DataView";
import config from "../config/config";

const styles = theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    zIndex: theme.zIndex.drawer,
    position: "relative",
    whiteSpace: "nowrap",
    width: theme.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    zIndex: theme.zIndex.drawer,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar
});

export default withStyles(styles)(
  ({
    currentUser,
    setCurrentUser,
    cart,
    setCart,
    catalogItems,
    setCatalogItems,
    orders,
    setOrders,
    ingredients,
    setIngredients,
    classes
  }) => {
    const [drawerOpen, setDrawerOpen] = useState(true);

    return (
      <Row style={{ height: "100%" }}>
        <Column>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              drawerOpen && classes.appBarShift
            )}
          >
            <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className={classNames(
                  classes.menuButton,
                  drawerOpen && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {config.siteName}
              </Typography>
            </Toolbar>
          </AppBar>
          <Row grow>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !drawerOpen && classes.drawerPaperClose
                )
              }}
              open={drawerOpen}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <div>
                  <ListItem button component={Link} to="/admin/pizzas">
                    <ListItemIcon>
                      <LocalPizzaIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Pizze"} />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/ingredients">
                    <ListItemIcon>
                      <LocalFloristIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Ingredienti"} />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/orders">
                    <ListItemIcon>
                      <MoveToInboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Ordini"} />
                  </ListItem>
                  <ListItem button component={Link} to="/admin/clients">
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Clienti"} />
                  </ListItem>
                </div>
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <>
                <Route
                  exact
                  path="/admin/pizzas"
                  render={() => (
                    <DataView
                      data={catalogItems.map(p => [
                        p.name,
                        p.ingredients.join(", ")
                      ])}
                      columns={[{ name: "Nome" }, { name: "Ingredienti" }]}
                    />
                  )}
                />
                <Route
                  exact
                  path="/admin/ingredients"
                  render={() => (
                    <DataView
                      data={ingredients.map(p => [p.name, p.amount])}
                      columns={[{ name: "Nome" }, { name: "Quantità" }]}
                    />
                  )}
                />
                <Route
                  exact
                  path="/admin/orders"
                  render={() => (
                    <DataView
                      data={catalogItems.map(p => [
                        p.name,
                        p.ingredients.join(", ")
                      ])}
                      columns={[{ name: "Nome" }, { name: "Ingredienti" }]}
                    />
                  )}
                />
                <Route
                  exact
                  path="/admin/clients"
                  render={() => (
                    <DataView
                      data={catalogItems.map(p => [
                        p.name,
                        p.ingredients.join(", ")
                      ])}
                      columns={[{ name: "Nome" }, { name: "Ingredienti" }]}
                    />
                  )}
                />
              </>
            </main>
          </Row>
        </Column>
      </Row>
    );
  }
);
