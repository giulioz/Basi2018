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
