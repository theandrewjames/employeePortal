import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/users/login", {
    username: username,
    password: password,
  });
  return response.data;
};

export const createUser = async (companyId, userInfo) => {
  const response = await api.post(`/company/${companyId}/users`, {
    credentials: {
      username: userInfo.username.value,
      password: userInfo.password.value,
    },
    profile: {
      firstName: userInfo.firstName.value,
      lastName: userInfo.lastName.value,
      email: userInfo.email.value,
      phone: userInfo.phone.value,
    },
    admin: userInfo.admin,
  });
  return response.data;
};

export const getAllUsers = async (companyId) => {
  const response = await api.get(`/company/${companyId}/users`, {});
  return response.data;
};
