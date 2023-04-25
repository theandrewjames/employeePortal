import api from "./api"

export const getAnnouncements = async (id) => {
  const response = await api.get(`/company/${id}/announcements`)
  return response.data
}
