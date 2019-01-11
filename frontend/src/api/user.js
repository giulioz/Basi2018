const users = [];

export const registerUser = ({
  username,
  password,
  name,
  surname,
  address,
  phone
}) => {
  users.push({
    username,
    password,
    name,
    surname,
    address,
    phone
  });
};

export const loginUser = (username, password) =>
  users.find(u => u.username === username && u.password === password);
