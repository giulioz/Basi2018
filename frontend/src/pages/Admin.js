import React, { useState, useEffect } from "react";
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
import HomeIcon from "@material-ui/icons/Home";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";

import Column from "../components/Column";
import Row from "../components/Row";
import DataView from "../components/DataView";
import config from "../config/config";
import { getPizzas, getIngredients, getOrders } from "../api/data";
import { getUsers } from "../api/user";

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
  ({ token, currentUser, setCurrentUser, cart, setCart, classes }) => {
    const [catalogItems, setCatalogItems] = React.useState([]);
    async function fetchItems() {
      setCatalogItems(await getPizzas());
    }
    useEffect(
      () => {
        fetchItems();
      },
      [token]
    );

    const [ingredients, setIngredients] = React.useState([]);
    async function fetchIngredients() {
      setIngredients(await getIngredients());
    }
    useEffect(
      () => {
        fetchIngredients();
      },
      [token]
    );

    const [orders, setOrders] = useState([]);
    async function fetchOrders() {
      setOrders(await getOrders(token));
    }
    useEffect(
      () => {
        fetchOrders();
      },
      [token]
    );
    const aggregatedOrders = [...new Set(orders.map(p => p.ID_Ordine))].map(
      o => ({
        ...orders.filter(p => p.ID_Ordine === o)[0],
        Pizze: orders.filter(p => p.ID_Ordine === o)
      })
    );

    const [users, setUsers] = useState([]);
    async function fetchUsers() {
      setUsers(await getUsers(token));
    }
    useEffect(
      () => {
        fetchUsers();
      },
      [token]
    );

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
                  <Divider />
                  <ListItem button component={Link} to="/">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
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
                      data={ingredients.map(p => [p.name, p.quantity])}
                      columns={[{ name: "Nome" }, { name: "Quantità" }]}
                    />
                  )}
                />
                <Route
                  exact
                  path="/admin/orders"
                  render={() => (
                    <DataView
                      data={aggregatedOrders.map(p => [
                        p.ID_Ordine,
                        format(p.Data, "d MMMM yyyy hh:mm", {
                          locale: itLocale
                        }),
                        p.Indirizzo,
                        p.Pizze.filter(p => p.Quantita > 0)
                          .map(pizza => `${pizza.Quantita}x ${pizza.NomePizza}`)
                          .join(", ")
                      ])}
                      columns={[
                        { name: "ID" },
                        { name: "Data" },
                        { name: "Indirizzo" },
                        { name: "Pizze" }
                      ]}
                    />
                  )}
                />
                <Route
                  exact
                  path="/admin/clients"
                  render={() => (
                    <DataView
                      data={users.map(p => [
                        p.name,
                        p.surname,
                        p.address,
                        p.phone,
                        p.login
                      ])}
                      columns={[
                        { name: "Nome" },
                        { name: "Cognome" },
                        { name: "Indirizzo" },
                        { name: "Telefono" },
                        { name: "Login" }
                      ]}
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
