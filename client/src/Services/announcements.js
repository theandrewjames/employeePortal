import api from "./api"

export const getAnnouncements = async (id) => {
  const response = await api.get(`/company/${id}/announcements`)
  return response.data
}

export const saveAnnouncement = async (id, title, message, user) => {
  console.log(user)
  console.log(title)
  console.log(message)

  const response = await api.post(`company/${id}/announcements`, {
    title: title,
    message: message,
    author: user,
  })
  return response.data
}

// const response = await api.post("/users/login", {
//   username: username,
//   password: password,
// });

// BasicUserDto
// id: long,
// profile: ProfileDto,
// isAdmin: boolean,
// active: boolean,
// status: string

// { ProfileDto
//   firstname: string,
//   lastname: string,
//   email:string,
//   phone: string
// }
