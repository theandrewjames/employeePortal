import api from './api'

export const getProjects = async (companyId, teamId) => {
  const response = await api.get(
    `/company/${companyId}/teams/${teamId}/projects`
  )
  return response.data
}

export const createProject = async (basicUserDto) => {
  const response = await api.post(`/projects`, {
    project: { name: 'name', description: 'dasd', active: true, team: {} },
    user: { basicUserDto },
  })
  return response.data
}

export const saveProject = async (editedProject) => {
  const response = await api.patch(
    `/projects/${editedProject.id}/`,
    editedProject
  )
  return response.data
}
