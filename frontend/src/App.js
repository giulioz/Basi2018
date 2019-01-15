import React, { useState, useEffect } from "react";

import Routing from "./Routing";
import withStyleConfig from "./components/withStyleConfig";
import { getUser } from "./api/user";

export default withStyleConfig()(() => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(
    () => {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    [cart, token]
  );

  const [currentUser, setCurrentUser] = useState(null);
  async function fetchUser() {
    setCurrentUser(await getUser(token));
  }
  useEffect(
    () => {
      if (token) {
        fetchUser();
      }
    },
    [token]
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
