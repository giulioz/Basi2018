import React from "react";
import {
  withStyles,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Button
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

import Pizza from "../graphics/Pizza";
import Row from "./Row";
import config from "../config/config";

const styles = theme => ({
  root: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 32,
    marginBottom: 40,
    maxWidth: 800,
    width: "100%",
    margin: "auto"
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    flexGrow: 1
  },
  logo: {
    fill: theme.palette.text.primary,
    marginRight: 32
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(
  ({
    classes,
    username,
    admin,
    cartQuantity,
    setRegisterOpen,
    setLoginOpen,
    onLogout
  }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      onLogout();
      handleMenuClose();
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="orders">
          I tuoi Ordini
        </MenuItem>
        {admin && (
          <MenuItem onClick={handleMenuClose} component={Link} to="admin">
            Amministrazione
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} component={Link} to="/">
          Esci
        </MenuItem>
      </Menu>
    );

    return (
      <>
        <Row className={classes.root} align="center">
          <Link className={classes.link} to="/">
            <Pizza width={80} className={classes.logo} />
            <Typography variant="h2" className={classes.title}>
              {config.siteName}
            </Typography>
          </Link>
          {username ? (
            <>
              <Typography variant="h6">{username}</Typography>
              <IconButton color="inherit" component={Link} to="/">
                <Badge badgeContent={cartQuantity} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={event => setAnchorEl(event.currentTarget)}
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                onClick={() => setRegisterOpen(true)}
                variant="text"
                className={classes.button}
                color="primary"
              >
                Registrati
              </Button>
              <Button
                onClick={() => setLoginOpen(true)}
                variant="contained"
                className={classes.button}
                color="primary"
              >
                Entra
              </Button>
            </>
          )}
        </Row>
        {renderMenu}
      </>
    );
  }
);
