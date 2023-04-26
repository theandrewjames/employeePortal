import api from "./api";

export const getProjectsByTeam = async (companyId, teamId) => {
  const response = await api.get(`company/${companyId}/teams/${teamId}/projects`, {});
  return response.data;
};

export const createTeam = async (authorId, companyId, teamDto) => {

  const [error, response] = await api.post(`/${authorId}/company/${companyId}`, {
    teamDto,
  });
  if (error) {
    console.log(error.message);
    //TODO handle this error
  }
  console.log(response.data);
  // return response.data;
};