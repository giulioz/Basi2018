import React, { useState, useEffect } from "react";

import Routing from "./Routing";
import withStyleConfig from "./components/withStyleConfig";

export default withStyleConfig()(() => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const [catalogItems, setCatalogItems] = useState(
    JSON.parse(localStorage.getItem("catalogItems")) || [
      {
        name: "Margherita",
        price: 5.5,
        ingredients: ["Pomodoro", "Mozzarella"]
      },
      {
        name: "Capricciosa",
        price: 6.8,
        ingredients: ["Pomodoro", "Mozzarella", "Carciofi", "Balene"]
      },
      {
        name: "Prosciutto e funghi",
        price: 6,
        ingredients: ["Pomodoro", "Mozzarella", "Funghi", "Prosciutto"]
      },
      {
        name: "Diavola",
        price: 6.6,
        ingredients: ["Pomodoro", "Mozzarella", "Satana"]
      }
    ]
  );

  useEffect(
    () => {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("catalogItems", JSON.stringify(catalogItems));
    },
    [cart, catalogItems, currentUser, orders]
  );

  return (
    <Routing
      {...{
        currentUser,
        setCurrentUser,
        cart,
        setCart,
        orders,
        setOrders,
        catalogItems,
        setCatalogItems
      }}
    />
  );
});
