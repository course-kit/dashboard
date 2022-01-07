<script setup>
import { ref } from 'vue'

import { mdiPlusBox } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import StudentsTable from '@/components/StudentsTable.vue'
import CardComponent from '@/components/CardComponent.vue'

const titleStack = ref([{ name: 'Students' }])

const addActive = ref(false)
</script>

<template>
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
