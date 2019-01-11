import React, { useState } from "react";

import Routing from "./Routing";
import withStyleConfig from "./components/withStyleConfig";

export default withStyleConfig()(() => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [catalogItems, setCatalogItems] = useState([
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
  ]);

  return <Routing {...{ currentUser, cart, catalogItems }} />;
});
