import React from "react";

import Header from "../components/Header";
import Catalog from "../components/Catalog";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { getUser } from "../api/user";

export default ({
  currentUser,
  setCurrentUser,
  cart,
  setCart,
  catalogItems,
  setCatalogItems
}) => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const handleAddToCart = name => {
    if (currentUser) {
      setCart([...cart, catalogItems.find(i => (i.name = name))]);
    } else {
      setLoginOpen(true);
    }
  };

  const handleLogin = username => {
    setCurrentUser(getUser(username));
  };

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
      </>

      <Header
        username={currentUser && `${currentUser.name} ${currentUser.surname}`}
        admin={currentUser && currentUser.admin}
        cartQuantity={cart ? cart.length : 0}
        setRegisterOpen={setRegisterOpen}
        setLoginOpen={setLoginOpen}
      />
      <Catalog
        catalogItems={catalogItems}
        cart={cart}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};
