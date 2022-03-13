let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const getCourses = async (schoolId) => {
  return await fetch(`${baseURL}/schools/${schoolId}/`, {
    credentials: 'include'
  })
}

const getStudents = async (schoolId) => {
  return await fetch(`${baseURL}/schools/${schoolId}/students`, {
    credentials: 'include'
  })
}

const courseAdd = async (schoolId, payload) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const schoolAdd = async (payload) => {
  return await fetch(`${baseURL}/schools`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const courseDelete = async (schoolId, id) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}

const lessonDelete = async (schoolId, courseId, lessonId) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses/${courseId}/lessons/${lessonId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}

const courseEdit = async (schoolId, id, payload) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses/${id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const lessonAdd = async (schoolId, courseId, payload) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses/${courseId}/lessons`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const studentAdd = async (schoolId, payload) => {
  return await fetch(`${baseURL}/schools/${schoolId}/students`, {
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

const editLesson = async (schoolId, courseId, lessonId, payload) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses/${courseId}/lessons/${lessonId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const schoolEdit = async (schoolId, payload) => {
  return await fetch(`${baseURL}/schools/${schoolId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const addTestCourses = async (schoolId) => {
  return await fetch(`${baseURL}/schools/${schoolId}/courses/seed`, {
    method: 'POST',
    credentials: 'include'
  })
}

const getSchools = async () => {
  return await fetch(`${baseURL}/schools`, {
    method: 'GET',
    credentials: 'include'
  })
}

export { getSchools, getCourses, getStudents, courseAdd, getUser, lessonAdd, editLesson, courseEdit, schoolEdit, studentAdd, courseDelete, addTestCourses, lessonDelete, schoolAdd }
