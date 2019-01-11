import React from "react";

import Header from "../components/Header";
import Catalog from "../components/Catalog";

export default ({ currentUser, cart, catalogItems }) => {
  return (
    <>
      <Header
        username={currentUser && `${currentUser.name} ${currentUser.surname}`}
        admin={currentUser && currentUser.admin}
        cartQuantity={cart ? cart.length : 0}
      />
      <Catalog catalogItems={catalogItems} />
    </>
  );
};
