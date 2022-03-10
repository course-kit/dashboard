<script setup>
import { ref } from 'vue'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CoursesTable from '@/components/CoursesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import CourseAdd from '@/components/CourseAdd.vue'
import CoursesAddTest from '@/components/CoursesAddTest.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

const titleStack = ref([{ name: 'Courses' }])

const addActive = ref(false)
const addTestActive = ref(false)
</script>

<template>
  <CourseAdd v-model="addActive" />
  <CoursesAddTest v-model="addTestActive" />
  <title-bar :title-stack="titleStack" />
  <main-section>
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
      />
    </JbButtons>
  </main-section>
</template>
