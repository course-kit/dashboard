<script setup>
import { ref } from 'vue'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CoursesTable from '@/components/CoursesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import CourseAdd from '@/components/CourseAdd.vue'
import SchoolEdit from '@/components/SchoolEdit.vue'

const titleStack = ref([{ name: 'Courses' }])

const addActive = ref(false)
const editSchool = ref(false)
</script>

<template>
  <CourseAdd v-model="addActive" />
  <SchoolEdit v-model="editSchool" />
  <title-bar :title-stack="titleStack" />
  <main-section>
    <card-component
      class="mb-6"
      title="School"
      has-table
      @header-icon-click="editSchool = true"
    >
      <table>
        <tbody>
          <tr>
            <td class="pl-6">
              ID
            </td>
            <td>
              {{ $store.state.schoolId }}
            </td>
          </tr>
          <tr>
            <td class="pl-6">
              URL
            </td>
            <td>
              {{ $store.state.schoolUrl }}
            </td>
          </tr>
        </tbody>
      </table>
    </card-component>
    <card-component
      class="mb-6"
      title="Courses"
      :header-icon="mdiPlusBox"
      has-table
      @header-icon-click="addActive = true"
    >
      <courses-table />
    </card-component>
  </main-section>
</template>
