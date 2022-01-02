let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const getCourses = async () => {
  return await fetch(`${baseURL}/courses`, {
    credentials: 'include'
  })
}

const getStudents = async () => {
  return await fetch(`${baseURL}/students`, {
    credentials: 'include'
  })
}

const courseAdd = async (payload) => {
  return await fetch(`${baseURL}/courses`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload)
  })
}

const getUser = async () => {
  return await fetch(`${baseURL}/user`, {
    credentials: 'include'
  })
}

export { getCourses, getStudents, courseAdd, getUser }
