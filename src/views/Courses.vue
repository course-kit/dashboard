<script setup>
import { ref } from 'vue'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CoursesTable from '@/components/CoursesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import CourseAdd from '@/components/CourseAdd.vue'
import CoursesAddTest from '@/components/CoursesAddTest.vue'
import SchoolEdit from '@/components/SchoolEdit.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

const titleStack = ref([{ name: 'Courses' }])

const addActive = ref(false)
const addTestActive = ref(false)
const editSchool = ref(false)
</script>

<template>
  <CourseAdd v-model="addActive" />
  <SchoolEdit v-model="editSchool" />
  <CoursesAddTest v-model="addTestActive" />
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
              School URL (development)
            </td>
            <td>
              {{ $store.state.schoolUrlDev }}
            </td>
          </tr>
          <tr>
            <td class="pl-6">
              School URL (production)
            </td>
            <td>
              {{ $store.state.schoolUrlProd }}
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
    <JbButtons>
      <JbButton
        label="Add test courses"
        small
        @click="addTestActive = true"
      ></JbButton>
    </JbButtons>
  </main-section>
</template>
