<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import SchoolsTable from '@/components/SchoolsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import SchoolEdit from '@/components/SchoolEdit.vue'
import SchoolAdd from '@/components/SchoolAdd.vue'
import { mdiPlusBox } from '@mdi/js'
import Notification from '@/components/Notification.vue'
const titleStack = ref([{ name: 'School' }])
const addActive = ref(false)
const editSchool = ref(false)
const error = ref(null)
</script>

<template>
  <SchoolAdd
    v-model="addActive"
    @error="error = $event"
  />
  <SchoolEdit v-model="editSchool" />
  <div
    v-if="error"
    class="mx-6 mt-6"
  >
    <notification
      id="edit-school-error"
      color="danger"
    >
      {{ error.message }}
    </notification>
  </div>
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
              Title
            </td>
            <td>
              {{ $store.state.schoolTitle }}
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
      title="Your schools"
      :header-icon="mdiPlusBox"
      has-table
      @header-icon-click="addActive = true"
    >
      <schools-table />
    </card-component>
  </main-section>
</template>
