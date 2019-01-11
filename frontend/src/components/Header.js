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

import Pizza from "../graphics/Pizza";
import Row from "./Row";
import RegisterForm from "./RegisterForm";
import config from "../config/config";
import LoginForm from "./LoginForm";

const styles = theme => ({
  root: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 32,
    marginBottom: 12,
    maxWidth: 1000,
    width: "100%"
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
  ({ classes, username, admin, cartQuantity }) => {
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>I tuoi Ordini</MenuItem>
        {admin && (
          <MenuItem onClick={handleMenuClose}>Amministrazione</MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>Esci</MenuItem>
      </Menu>
    );

    return (
      <>
        <Row className={classes.root} align="center">
          <Pizza width={80} className={classes.logo} />
          <Typography variant="h2" className={classes.title}>
            {config.siteName}
          </Typography>
          {username ? (
            <>
              <Typography variant="h6">{username}</Typography>
              <IconButton color="inherit">
                <Badge badgeContent={cartQuantity}>
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
        <RegisterForm
          open={registerOpen}
          onClose={() => setRegisterOpen(false)}
        />
        <LoginForm open={loginOpen} onClose={() => setLoginOpen(false)} />
      </>
    );
  }
);
