import axios from 'axios'
axios.defaults.baseURL = 'http://app.coursekit.test:8080'

const getCourses = async () => {
  const { data } = await axios.get('/courses')
  return data
}

const getStudents = async () => {
  const { data } = await axios.get('/students')
  return data
}

const courseAdd = async (payload) => {
  const { data } = await axios.post('/courses', payload)
  return data
}

export { getCourses, getStudents, courseAdd }
