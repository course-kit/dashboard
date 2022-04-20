import { createStore } from 'vuex'
import {
  getCourses,
  getStudents,
  courseAdd,
  getUser,
  lessonAdd,
  editLesson,
  courseEdit,
  schoolEdit,
  studentAdd,
  courseDelete,
  addTestCourses,
  lessonDelete,
  getSchools,
  schoolAdd
} from '@/apiService'

export default createStore({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    userPlan: null,
    userStripeConnectEnabled: null,
    userPaymentOverdue: false,

    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: false,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    courses: [],
    history: [],
    schools: [],
    loginUrl: null,
    regUrl: null,
    schoolId: null,
    schoolTitle: null,
    schoolUrlDev: null,
    schoolUrlProd: null,
    dataLoaded: false,
    isAdmin: false
  },
  getters: {
    getStudentById: (state) => (id) => {
      return state.students.find((student) => student.id === id)
    },
    getCourseById: (state) => (id) => {
      return state.courses.find((course) => course.id === id)
    },
    getLessonById: (state) => (courseId, lessonId) => {
      const course = state.courses.find((course) => course.id === courseId)
      return course
        ? course.lessons.find((lesson) => lesson.id === lessonId)
        : null
    },
    isLoading: (state) => {
      return !state.dataLoaded
    }
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    setSchool (state, payload) {
      state.schoolTitle = payload.title
      state.schoolUrlDev = payload.urlDev
      state.schoolUrlProd = payload.urlProd
    },

    /* User */
    user (state, payload) {
      state.schoolId = payload.schoolId
      state.isAdmin = payload.isAdmin
      state.userStripeConnectEnabled = payload.stripeConnectEnabled
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.plan) {
        state.userPlan = payload.plan
      }
      if (payload.paymentOverdue) {
        state.userPaymentOverdue = payload.paymentOverdue
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },
    setAuthUrls (state, { loginUrl, regUrl }) {
      const redirect = encodeURIComponent(window.location.href)
      state.loginUrl = loginUrl.concat('&redirect=', redirect)
      state.regUrl = regUrl.concat('&redirect=', redirect)
    },
    setDataLoaded (state, payload) {
      state.dataLoaded = payload
    }
  },
  actions: {
    asideMobileToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

      document
        .getElementById('app')
        .classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')

      document.documentElement.classList[isShow ? 'add' : 'remove'](
        'm-clipped'
      )

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },

    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', {
        key: 'isAsideLgActive',
        value: payload !== null ? payload : !state.isAsideLgActive
      })
    },

    fullScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFullScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove'](
        'full-screen'
      )
    },

    async changeSchool ({ state, commit, dispatch }, schoolId) {
      commit('basic', { key: 'schoolId', value: schoolId })
      await Promise.all([dispatch('getCourses'), dispatch('getStudents')])
    },

    async addTestCourses ({ state, dispatch }) {
      try {
        await addTestCourses(state.schoolId)
        await dispatch('getCourses')
      } catch (err) {
        alert(err.message)
      }
    },

    async getSchools ({ commit }) {
      try {
        const response = await getSchools()
        if (response.status === 200) {
          const { schools } = await response.json()
          commit('basic', {
            key: 'schools',
            value: schools
          })
        }
        if (response.status === 401) {
          alert('Network error.')
        }
      } catch (err) {
        console.log(err)
      }
    },

    async getCourses ({ state, commit }) {
      try {
        const response = await getCourses(state.schoolId)
        if (response.status === 200) {
          const data = await response.json()
          commit('basic', {
            key: 'courses',
            value: data.courses
          })
          commit('setSchool', data)
        }
        if (response.status === 401) {
          alert('Network error.')
        }
      } catch (err) {
        console.log(err)
      }
    },

    async getStudents ({ state, commit }) {
      try {
        const response = await getStudents(state.schoolId)
        const data = await response.json()
        if (response.status === 200) {
          commit('basic', {
            key: 'students',
            value: data
          })
        }
        if (response.status === 401) {
          alert('Network error.')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async lessonPosChange ({ state, dispatch }, { courseId, lessonId, isInc }) {
      try {
        const course = state.courses.find((course) => course.id === courseId)
        const lesson = course.lessons.find((lesson) => lesson.id === lessonId)
        const order = lesson.order + (isInc ? 1 : -1)
        await editLesson(state.schoolId, courseId, lessonId, { order })
        await dispatch('getCourses')
      } catch (err) {
        alert(err.message)
      }
    },
    async schoolAdd ({ state, commit, dispatch }, payload) {
      try {
        const response = await schoolAdd(payload)
        if (response.status === 200) {
          const { id } = await response.json()
          await dispatch('getSchools')
          return id
        } else {
          return null
        }
      } catch (err) {
        alert(err.message)
      }
    },
    async courseAdd ({ state, commit, dispatch }, payload) {
      try {
        const response = await courseAdd(state.schoolId, payload)
        await dispatch('getCourses')
        return await response.json()
      } catch (err) {
        alert(err.message)
      }
    },
    async courseEdit (
      { state, commit, dispatch, getters },
      { id, title, path, price, publicContent, privateContent }
    ) {
      const course = getters.getCourseById(id)
      const payload = {}
      if (typeof title !== 'undefined' && title !== course.title) {
        payload.title = title
      }
      if (typeof path !== 'undefined' && path !== course.path) {
        payload.path = path
      }
      if (typeof price !== 'undefined' && price !== course.price) {
        payload.price = price
      }
      if (
        typeof publicContent !== 'undefined' &&
        publicContent !== course.publicContent
      ) {
        payload.publicContent = publicContent
      }
      if (
        typeof privateContent !== 'undefined' &&
        privateContent !== course.privateContent
      ) {
        payload.privateContent = privateContent
      }
      try {
        await courseEdit(state.schoolId, id, payload)
        await dispatch('getCourses')
      } catch (err) {
        alert(err.message)
      }
    },
    async courseDelete ({ state, commit, dispatch }, id) {
      try {
        await courseDelete(state.schoolId, id)
        await dispatch('getCourses')
        await dispatch('getStudents')
      } catch (err) {
        alert(err.message)
      }
    },
    async lessonDelete ({ state, commit, dispatch }, { courseId, lessonId }) {
      try {
        await lessonDelete(state.schoolId, courseId, lessonId)
        await dispatch('getCourses')
      } catch (err) {
        alert(err.message)
      }
    },
    async schoolEdit (
      { state, commit, dispatch },
      { schoolTitle, schoolUrlDev, schoolUrlProd }
    ) {
      try {
        const payload = {}
        if (
          typeof schoolTitle !== 'undefined' &&
          schoolTitle !== state.schoolTitle
        ) {
          payload.title = schoolTitle
        }
        if (
          typeof schoolUrlDev !== 'undefined' &&
          schoolUrlDev !== state.schoolUrlDev
        ) {
          payload.urlDev = schoolUrlDev
        }
        if (
          typeof schoolUrlProd !== 'undefined' &&
          schoolUrlProd !== state.schoolUrlProd
        ) {
          payload.urlProd = schoolUrlProd
        }
        await schoolEdit(state.schoolId, payload)
        commit('setSchool', {
          title: schoolTitle,
          urlDev: schoolUrlDev,
          urlProd: schoolUrlProd
        })
        await dispatch('getSchools')
      } catch (err) {
        alert(err.message)
      }
    },
    async lessonEdit (
      { state, dispatch, getters },
      { courseId, lessonId, title, publicContent, privateContent }
    ) {
      try {
        const lesson = getters.getLessonById(courseId, lessonId)
        const payload = {}
        if (typeof title !== 'undefined' && title !== lesson.title) {
          payload.title = title
        }
        if (
          typeof publicContent !== 'undefined' &&
          publicContent !== lesson.publicContent
        ) {
          payload.publicContent = publicContent
        }
        if (
          typeof privateContent !== 'undefined' &&
          privateContent !== lesson.privateContent
        ) {
          payload.privateContent = privateContent
        }
        await editLesson(state.schoolId, courseId, lessonId, payload)
        await dispatch('getCourses')
      } catch (err) {
        alert(err.message)
      }
    },
    async lessonAdd ({ state, commit, dispatch }, { courseId, title }) {
      try {
        const response = await lessonAdd(state.schoolId, courseId, { title })
        await dispatch('getCourses')
        return await response.json()
      } catch (err) {
        alert(err.message)
      }
    },
    async studentAdd ({ state, dispatch }, payload) {
      try {
        const response = await studentAdd(state.schoolId, payload)
        if (response.status === 200) {
          await dispatch('getStudents')
          const { id } = await response.json()
          return id
        } else {
          const { error } = await response.json()
          alert(error)
          return null
        }
      } catch (err) {
        alert(err.message)
      }
    },
    async getUser ({ commit }) {
      try {
        const response = await getUser()
        if (response.status === 200) {
          const user = await response.json()
          commit('user', user)
          return user
        }
        if (response.status === 401) {
          const { loginUrl, regUrl } = await response.json()
          commit('setAuthUrls', { loginUrl, regUrl })
          return null
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {}
})
