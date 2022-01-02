import { createStore } from 'vuex'
import { getCourses, getStudents, courseAdd, getUser } from '@/apiService'

export default createStore({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

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
    loginUrl: null,
    regUrl: null,
    dataLoaded: false
  },
  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id)
    },
    getLessonById: (state) => (courseId, lessonId) => {
      const course = state.courses.find(course => course.id === courseId)
      return course.lessons.find(lesson => lesson.id === lessonId)
    }
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
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

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },

    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
    },

    fullScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFullScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove']('full-screen')
    },

    async getCourses ({ commit }) {
      try {
        const response = await getCourses()
        if (response.status === 200) {
          const { data } = await response.json()
          commit('basic', {
            key: 'courses',
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

    async getStudents ({ commit }) {
      try {
        const response = await getStudents()
        const { data } = await response.json()
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
    lessonPosChange ({ state }, { courseId, lessonId, isInc }) {

    },

    async courseAdd ({ commit, dispatch }, payload) {
      try {
        const { data } = await courseAdd(payload)
        await dispatch('getCourses')
        return data.id
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
  modules: {
  }
})
