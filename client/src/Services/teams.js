import api from './api'

export const getProjectsByTeam = async (companyId, teamId) => {
  const response = await api.get(
    `/company/${companyId}/teams/${teamId}/projects`,
    {}
  )
  return response.data
}

export const createTeam = async (authorId, companyId, teamDto) => {
  console.log(teamDto)

  const response = await api.post(
    `/team/${authorId}/company/${companyId}`,
    teamDto
  )
  // if (error) {
  // console.log(error.message);
  //TODO handle this error
  // }
  console.log(response.data)
  // return response.data;
}

export const getTeamById = async (teamId) => {
  const response = await api.get(`/team/${teamId}`)
  return response.data
}
