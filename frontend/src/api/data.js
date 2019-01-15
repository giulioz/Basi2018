import config from "../config/config";

export const getPizzas = async () => {
  const request = await fetch(config.apiUrl + "pizzas");
  const data = await request.json();
  return data.map(pizza => ({
    name: pizza.Nome,
    ingredients: pizza.Ingredienti,
    price: parseFloat(pizza.Prezzo)
  }));
};

export const getIngredients = async () => {
  const request = await fetch(config.apiUrl + "ingredients");
  const data = await request.json();
  return data.map(ingredient => ({
    name: ingredient.Nome,
    quantity: parseFloat(ingredient.Quantita)
  }));
};

export const order = async ({ Data, Indirizzo, Pizze }, token) =>
  fetch(config.apiUrl + "orders", {
    method: "POST",
    body: JSON.stringify({
      Data,
      Indirizzo,
      Pizze
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
