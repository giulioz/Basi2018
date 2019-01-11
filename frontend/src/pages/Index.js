import React from "react";

import Header from "../components/Header";
import Catalog from "../components/Catalog";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

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
      cart.push(catalogItems.find(i => (i.name = name)));
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <LoginForm open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterForm
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <Header
        username={currentUser && `${currentUser.name} ${currentUser.surname}`}
        admin={currentUser && currentUser.admin}
        cartQuantity={cart ? cart.length : 0}
        setRegisterOpen={setRegisterOpen}
        setLoginOpen={setLoginOpen}
      />
      <Catalog catalogItems={catalogItems} onAddToCart={handleAddToCart} />
    </>
  );
};
