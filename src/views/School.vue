<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import SchoolsTable from '@/components/SchoolsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import SchoolEdit from '@/components/SchoolEdit.vue'

const titleStack = ref([{ name: 'School' }])
const editSchool = ref(false)
</script>

<template>
  <SchoolEdit v-model="editSchool" />
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" />
    <card-component
      class="mb-6"
      title="Current school"
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
      v-if="$store.state.isAdmin"
      class="mb-6"
      title="Your schools"
      header-icon=""
      has-table
    >
      <schools-table />
    </card-component>
  </main-section>
</template>
