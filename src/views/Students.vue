<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import StudentsTable from '@/components/StudentsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import CourseAdd from '@/components/CourseAdd.vue'

const store = useStore()
const router = useRouter()

const titleStack = ref([
  { name: 'Students' }
])

const addActive = ref(false)
</script>

<template>
  <CourseAdd v-model="addActive" />
  <title-bar :title-stack="titleStack" />
  <main-section>
    <card-component
      class="mb-6"
      title="Students"
      :header-icon="mdiPlusBox"
      has-table
      @header-icon-click="addActive = true"
    >
      <students-table />
    </card-component>
  </main-section>
</template>
