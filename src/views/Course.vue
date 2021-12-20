<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import LessonsTable from '@/components/LessonsTable.vue'
import CardComponent from '@/components/CardComponent.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const course = computed(() => store.getters.getCourseById(route.params.courseId))

const titleStack = computed(() => ['Courses', course.value ? course.value.name : null])

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section v-if="course">
    <card-component
      class="mb-6"
      title="Course info"
      @header-icon-click="console.log('edit course')"
      has-table
    >
      <table>
        <tbody>
          <tr>
            <td class="pl-6">Name</td>
            <td>{{ course.name }}</td>
          </tr>
          <tr>
            <td class="pl-6">ID</td>
            <td>{{ course.id }}</td>
          </tr>
          <tr>
            <td class="pl-6">Enrolment URL</td>
            <td>{{ course.enrolmentUrl }}</td>
          </tr>
        </tbody>
      </table>
    </card-component>
    <card-component
      class="mb-6"
      title="Lessons"
      :header-icon="mdiPlusBox"
      @header-icon-click="router.push(`/courses/${course.id}/lessons/add`)"
      has-table
    >
      <lessons-table :lessons="course.lessons" :course-id="course.id" />
    </card-component>
  </main-section>
</template>
