import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Non-auth
  {
    meta: {
      title: 'Home',
      fullScreen: true,
      auth: false
    },
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Home.vue')
  },
  {
    meta: {
      title: 'PasswordReset',
      fullScreen: true,
      auth: false
    },
    path: '/password-reset',
    name: 'passwordReset',
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ '@/views/PasswordReset.vue'
      )
  },
  {
    meta: {
      title: 'PasswordRequest',
      fullScreen: true,
      auth: false
    },
    path: '/password-request',
    name: 'passwordRequest',
    component: () =>
      import(
        /* webpackChunkName: "passwordRequest" */ '@/views/PasswordRequest.vue'
      )
  },
  {
    meta: {
      title: 'Get started',
      auth: true
    },
    path: '/start',
    name: 'start',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Start.vue')
  },
  {
    meta: {
      title: 'Courses',
      auth: true
    },
    path: '/courses',
    name: 'courses',
    component: () =>
      import(/* webpackChunkName: "courses" */ '@/views/Courses.vue')
  },
  {
    meta: {
      title: 'Billing',
      auth: true
    },
    path: '/billing',
    name: 'billing',
    component: () =>
      import(/* webpackChunkName: "billing" */ '@/views/Billing.vue')
  },
  // {
  //   meta: {
  //     title: 'Add course'
  //   },
  //   path: '/courses/add',
  //   name: 'courses-add',
  //   component: () => import(/* webpackChunkName: "courses-add" */ '@/views/CoursesAdd.vue')
  // },
  {
    meta: {
      title: 'Course',
      auth: true
    },
    path: '/courses/:courseId',
    name: 'course',
    component: () =>
      import(/* webpackChunkName: "course" */ '@/views/Course.vue')
  },
  {
    meta: {
      title: 'Lesson',
      auth: true
    },
    path: '/courses/:courseId/lessons/:lessonId',
    name: 'lesson',
    component: () =>
      import(/* webpackChunkName: "lesson" */ '@/views/Lesson.vue')
  },
  {
    meta: {
      title: 'Students',
      auth: true
    },
    path: '/students',
    name: 'students',
    component: () =>
      import(/* webpackChunkName: "students" */ '@/views/Students.vue')
  },
  {
    meta: {
      title: 'School',
      auth: true
    },
    path: '/school',
    name: 'school',
    component: () =>
      import(/* webpackChunkName: "school" */ '@/views/School.vue')
  },
  {
    meta: {
      title: 'Analytics',
      auth: true
    },
    path: '/analytics',
    name: 'analytics',
    component: () =>
      import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue')
  },
  {
    meta: {
      title: 'Billing',
      auth: true
    },
    path: '/billing',
    name: 'billing',
    component: () =>
      import(/* webpackChunkName: "billing" */ '@/views/Billing.vue')
  },
  {
    meta: {
      title: 'Integrations',
      auth: true
    },
    path: '/integrations',
    name: 'integrations',
    component: () =>
      import(/* webpackChunkName: "integrations" */ '@/views/Integrations.vue')
  },
  {
    meta: {
      title: 'Profile',
      auth: true
    },
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true,
      auth: false
    },
    path: '/error',
    name: 'error',
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  },
  {
    meta: {
      title: '404',
      fullScreen: true,
      auth: false
    },
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
