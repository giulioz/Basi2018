import config from "../config/config";

export const registerUser = async ({
  username,
  password,
  name,
  surname,
  address,
  phone
}) =>
  fetch(config.apiUrl + "register", {
    method: "POST",
    body: JSON.stringify({
      Nome: username,
      Cognome: password,
      Indirizzo: name,
      Telefono: surname,
      Login: address,
      Password: phone
    })
  });

export const getUser = async token => {
  const user = await (await fetch(config.apiUrl + "user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })).json();

  return {
    name: user.Nome,
    surname: user.Cognome,
    address: user.Indirizzo,
    phone: user.Telefono,
    login: user.Login,
    password: user.Password
  };
};

export const loginUser = async (username, password) => {
  try {
    const request = await fetch(config.apiUrl + "login", {
      method: "POST",
      body: JSON.stringify({
        user: username,
        password: password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return request.text();
  } catch (e) {
    return false;
  }
};
