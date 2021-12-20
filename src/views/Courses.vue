<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CoursesTable from '@/components/CoursesTable.vue'
import CardComponent from '@/components/CardComponent.vue'

const store = useStore()
const router = useRouter()

const titleStack = ref(['Courses'])

async function addCourse () {
  console.log('add course')
}

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <card-component
      class="mb-6"
      title="Courses"
      :header-icon="mdiPlusBox"
      @header-icon-click="router.push('/courses/add')"
      has-table
    >
      <courses-table />
    </card-component>
  </main-section>
</template>
