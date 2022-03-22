import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    meta: {
      title: 'Home',
      fullScreen: true
    },
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Home.vue')
  },
  {
    meta: {
      title: 'Get started'
    },
    path: '/start',
    name: 'start',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Start.vue')
  },
  {
    meta: {
      title: 'Courses'
    },
    path: '/courses',
    name: 'courses',
    component: () =>
      import(/* webpackChunkName: "courses" */ '@/views/Courses.vue')
  },
  {
    meta: {
      title: 'Billing'
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
      title: 'Course'
    },
    path: '/courses/:courseId',
    name: 'course',
    component: () =>
      import(/* webpackChunkName: "course" */ '@/views/Course.vue')
  },
  {
    meta: {
      title: 'Lesson'
    },
    path: '/courses/:courseId/lessons/:lessonId',
    name: 'lesson',
    component: () =>
      import(/* webpackChunkName: "lesson" */ '@/views/Lesson.vue')
  },
  {
    meta: {
      title: 'Students'
    },
    path: '/students',
    name: 'students',
    component: () =>
      import(/* webpackChunkName: "students" */ '@/views/Students.vue')
  },
  {
    meta: {
      title: 'School'
    },
    path: '/school',
    name: 'school',
    component: () =>
      import(/* webpackChunkName: "school" */ '@/views/School.vue')
  },
  {
    meta: {
      title: 'Analytics'
    },
    path: '/analytics',
    name: 'analytics',
    component: () =>
      import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue')
  },
  {
    meta: {
      title: 'Billing'
    },
    path: '/billing',
    name: 'billing',
    component: () =>
      import(/* webpackChunkName: "billing" */ '@/views/Billing.vue')
  },
  {
    meta: {
      title: 'Billing'
    },
    path: '/billing',
    name: 'billing',
    component: () =>
      import(/* webpackChunkName: "billing" */ '@/views/Billing.vue')
  },
  {
    meta: {
      title: 'Trial Ended',
      fullScreen: true
    },
    path: '/trial-ended',
    name: 'trial-ended',
    component: () =>
      import(/* webpackChunkName: "trial-ended" */ '@/views/TrialEnded.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  },
  {
    meta: {
      title: '404',
      fullScreen: true
    },
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404.vue')
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
