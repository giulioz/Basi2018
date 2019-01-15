import React, { useEffect } from "react";
import { Button, Divider, withStyles, Typography } from "@material-ui/core";

import Header from "../components/Header";
import Catalog from "../components/Catalog";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { getUser } from "../api/user";
import OrderForm from "../components/OrderForm";
import Column from "../components/Column";
import Row from "../components/Row";
import { getPizzas, order } from "../api/data";

const styles = theme => ({
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

export default withStyles(styles)(
  ({
    token,
    setToken,
    currentUser,
    setCurrentUser,
    cart,
    setCart,
    classes
  }) => {
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);
    const [orderOpen, setOrderOpen] = React.useState(false);

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

    const handleAddToCart = name => {
      if (currentUser) {
        setCart([...cart, { ...catalogItems.find(i => i.name === name) }]);
      } else {
        setLoginOpen(true);
      }
    };

    const handleClearCartItem = name => {
      if (currentUser) {
        setCart(cart.filter(ci => ci.name !== name));
      } else {
        setLoginOpen(true);
      }
    };

    const handleLogin = async token => {
      setToken(token);
      setCurrentUser(await getUser(token));
      setLoginOpen(false);
    };

    const total =
      cart && cart.length > 0
        ? cart.reduce((sf, item) => item.price + sf, 0)
        : 0;

    return (
      <>
        <>
          <LoginForm
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            onLogin={handleLogin}
          />
          <RegisterForm
            open={registerOpen}
            onClose={() => setRegisterOpen(false)}
            onLogin={handleLogin}
          />
          <OrderForm
            token={token}
            catalogItems={catalogItems}
            user={currentUser}
            open={orderOpen}
            setCart={setCart}
            cart={cart}
            onClose={() => setOrderOpen(false)}
          />
        </>

        <Header
          username={currentUser && `${currentUser.name} ${currentUser.surname}`}
          admin={currentUser && currentUser.admin}
          cartQuantity={cart ? cart.length : 0}
          setRegisterOpen={setRegisterOpen}
          setLoginOpen={setLoginOpen}
          onLogout={() => setCurrentUser(null)}
        />

        <Catalog
          catalogItems={catalogItems}
          cart={cart}
          onAddToCart={handleAddToCart}
          onClearCartItem={handleClearCartItem}
        />

        <Divider className={classes.divider} />
        <Row className={classes.end}>
          <Column>
            <Typography variant="h6">
              <strong>Totale:</strong> € {total.toFixed(2)}
            </Typography>
          </Column>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOrderOpen(true)}
          >
            Ordina
          </Button>
        </Row>
      </>
    );
  }
);
