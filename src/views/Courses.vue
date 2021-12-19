<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CoursesTable from '@/components/CoursesTable.vue'
import CardComponent from '@/components/CardComponent.vue'

const store = useStore()

const titleStack = ref(['Courses'])

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <card-component
      class="mb-6"
      title="Clients"
      :icon="mdiAccountMultiple"
      has-table
    >
      <courses-table checkable />
    </card-component>
  </main-section>
  <bottom-other-pages-section />
</template>
