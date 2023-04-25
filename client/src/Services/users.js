import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/users/login", {
    username: username,
    password: password,
  });
  return response.data;
};

export const createUser = async (userInfo) => {
  const response = await api.post("/company/{companyId}/users", {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    username: userInfo.username,
    password: userInfo.password,
  });
  return response.data;
};

export const getAllUsers = async (companyId) => {
  const response = await api.get(`/company/${companyId}/users`, {});
  return response.data;
};
