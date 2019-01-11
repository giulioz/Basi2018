import React from "react";

import Header from "../components/Header";

export default ({ ...appState }) => {
  return (
    <Header
      username={
        appState.currentUser &&
        `${appState.currentUser.name} ${appState.currentUser.surname}`
      }
      admin={appState.currentUser && appState.currentUser.admin}
      cartQuantity={appState.cart && appState.cart.length}
    />
  );
};
