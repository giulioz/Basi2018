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

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const [ingredients, setIngredients] = useState(
    JSON.parse(localStorage.getItem("ingredients")) || [
      { name: "Pomodoro", amount: 1 },
      { name: "Mozzarella", amount: 1 },
      { name: "Carciofi", amount: 1 },
      { name: "Balene", amount: 1 }
    ]
  );

  useEffect(
    () => {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
    },
    [cart, currentUser, orders, ingredients, token]
  );

  return (
    <Routing
      {...{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        cart,
        setCart,
        orders,
        setOrders,
        ingredients,
        setIngredients
      }}
    />
  );
});
