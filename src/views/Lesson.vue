<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import LessonAdd from '@/components/LessonAdd.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

const store = useStore()
const route = useRoute()

const course = computed(() =>
  store.getters.getCourseById(route.params.courseId)
)
const lesson = computed(() =>
  store.getters.getLessonById(route.params.courseId, route.params.lessonId)
)

const titleStack = computed(() => [
  { name: 'Courses', to: '/courses' },
  {
    name: course.value ? course.value.title : null,
    to: course.value ? `/courses/${course.value.id}` : null
  },
  {
    name: 'Lessons',
    to: course.value ? `/courses/${course.value.id}/#lessons` : null
  },
  { name: lesson.value ? lesson.value.title : null }
])

const lessonEditActive = ref(false)
</script>

<template>
  <LessonAdd
    v-model="lessonEditActive"
    :course-id="course.id"
    :lesson-id="lesson.id"
  />
  <title-bar :title-stack="titleStack" />
  <main-section v-if="lesson">
    <card-component
      class="mb-6"
      title="Lesson info"
      has-table
      @header-icon-click="lessonEditActive = true"
    >
      <table>
        <tbody>
          <tr>
            <td class="pl-6">
              Title
            </td>
            <td>{{ lesson.title }}</td>
          </tr>
          <tr>
            <td class="pl-6">
              ID
            </td>
            <td>{{ lesson.id }}</td>
          </tr>
        </tbody>
      </table>
    </card-component>
    <markdown-editor
      v-if="lesson && course"
      :public-content-string="lesson.publicContent"
      :private-content-string="lesson.privateContent"
      :lesson-id="lesson.id"
      :course-id="course.id"
    />
  </main-section>
</template>
