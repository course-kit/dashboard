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
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const courseEdit = async (id, payload) => {
  return await fetch(`${baseURL}/courses/${id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const lessonAdd = async (courseId, payload) => {
  return await fetch(`${baseURL}/courses/${courseId}/lessons`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const getUser = async () => {
  return await fetch(`${baseURL}/user`, {
    credentials: 'include'
  })
}

const editLesson = async (courseId, lessonId, payload) => {
  return await fetch(`${baseURL}/courses/${courseId}/lessons/${lessonId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export { getCourses, getStudents, courseAdd, getUser, lessonAdd, editLesson, courseEdit }
