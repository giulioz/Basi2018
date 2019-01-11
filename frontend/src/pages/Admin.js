import React, { useState } from "react";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { ListItem, ListItemText, List, ListItemIcon } from "@material-ui/core";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import PeopleIcon from "@material-ui/icons/People";

import Column from "../components/Column";
import Row from "../components/Row";

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
  divider: {
    width: "100%",
    maxWidth: 600,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto"
  },
  end: {
    width: "100%",
    maxWidth: 600,
    margin: "auto"
  }
});

export default withStyles(styles)(({ classes }) => {
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
              ABC
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
        </Row>
      </Column>
    </Row>
  );
});
