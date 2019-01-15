import React, { useState, useEffect } from "react";

import Routing from "./Routing";
import withStyleConfig from "./components/withStyleConfig";

export default withStyleConfig()(() => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(
    () => {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    [cart, currentUser, token]
  );

  return (
    <Routing
      {...{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        cart,
        setCart
      }}
    />
  );
});
