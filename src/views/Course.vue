<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import LessonsTable from '@/components/LessonsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import LessonAdd from '@/components/LessonAdd.vue'
import CourseAdd from '@/components/CourseAdd.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { PLAN_FREE } from '@/constants.js'

const store = useStore()
const route = useRoute()

const course = computed(() =>
  store.getters.getCourseById(route.params.courseId)
)

const titleStack = computed(() => [
  {
    name: 'Courses',
    to: '/courses'
  },
  {
    name: course.value ? course.value.title : null
  }
])

const addActive = ref(false)
const courseEditActive = ref(false)
</script>

<template>
  <CourseAdd
    :id="course.id"
    v-model="courseEditActive"
  />
  <LessonAdd
    v-model="addActive"
    :course-id="course.id"
  />
  <title-bar :title-stack="titleStack" />
  <main-section v-if="course">
    <card-component
      class="mb-6"
      title="Course info"
      has-table
      @header-icon-click="courseEditActive = true"
    >
      <table>
        <tbody>
          <tr>
            <td class="pl-6">
              Title
            </td>
            <td>{{ course.title }}</td>
          </tr>
          <tr>
            <td class="pl-6">
              ID
            </td>
            <td>{{ course.id }}</td>
          </tr>
          <tr>
            <td class="pl-6">
              Path
            </td>
            <td>{{ course.path }}</td>
          </tr>
          <tr v-if="$store.state.userPlan !== PLAN_FREE">
            <td class="pl-6">
              Enrollment URL
            </td>
            <td>{{ course.enrollmentUrl }}</td>
          </tr>
          <tr v-else>
            <td class="pl-6">
              Price
            </td>
            <td>{{ course.price > 0 ? `USD $${course.price}` : "Free" }}</td>
          </tr>
        </tbody>
      </table>
    </card-component>
    <card-component
      class="mb-6"
      title="Lessons"
      :header-icon="mdiPlusBox"
      has-table
      @header-icon-click="addActive = true"
    >
      <lessons-table
        :lessons="course.lessons"
        :course-id="course.id"
      />
    </card-component>
    <markdown-editor
      v-if="course"
      :public-content-string="course.publicContent"
      :private-content-string="course.privateContent"
      :course-id="course.id"
    />
  </main-section>
</template>
