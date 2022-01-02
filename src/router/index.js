import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    meta: {
      title: 'Courses'
    },
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '@/views/Courses.vue')
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
    component: () => import(/* webpackChunkName: "course" */ '@/views/Course.vue')
  },
  {
    meta: {
      title: 'Lesson'
    },
    path: '/courses/:courseId/lessons/:lessonId',
    name: 'lesson',
    component: () => import(/* webpackChunkName: "lesson" */ '@/views/Lesson.vue')
  },
  {
    meta: {
      title: 'Students'
    },
    path: '/students',
    name: 'students',
    component: () => import(/* webpackChunkName: "students" */ '@/views/Students.vue')
  },
  {
    meta: {
      title: 'Analytics'
    },
    path: '/analytics',
    name: 'analytics',
    component: () => import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue')
  },
  {
    meta: {
      title: 'Billing'
    },
    path: '/billing',
    name: 'billing',
    component: () => import(/* webpackChunkName: "billing" */ '@/views/Billing.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
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
