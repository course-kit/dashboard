const baseURL = 'http://app.coursekit.test:8080'

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

export { getCourses, getStudents, courseAdd }
