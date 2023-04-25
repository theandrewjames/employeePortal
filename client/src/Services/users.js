import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/users/login", {
    username: username,
    password: password,
  });
  return response.data;
};

export const createUser = async (userInfo) => {
  const response = await api.post("/users/user", {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password,
  });
};
