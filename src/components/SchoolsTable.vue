<script setup>
import { computed, ref } from 'vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

import { useStore } from 'vuex'

const store = useStore()

const items = computed(() => store.state.schools)

const perPage = ref(10)

const currentPage = ref(0)

const schoolsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
)

const numPages = computed(
  () => Math.ceil(items.value.length / perPage.value) || 1
)

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const selectSchool = function (school) {
  if (school.active) {
    store.dispatch('changeSchool', school.id)
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="pl-6">
          ID
        </th>
        <th>Title</th>
        <td v-if="$store.state.isAdmin">
          Owner name
        </td>
        <td v-if="$store.state.isAdmin">
          Owner email
        </td>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="school in schoolsPaginated"
        :key="school.id"
        class="cursor-pointer"
        :class="{
          'bg-blue-50 hover:bg-blue-50 text-blue-900':
            school.id === $store.state.schoolId,
        }"
        @click="selectSchool(school)"
      >
        <td
          data-label="School ID"
          class="pl-6"
        >
          {{ school.id }}
        </td>
        <td data-label="School title">
          {{ school.title }}
        </td>
        <td
          v-if="$store.state.isAdmin"
          data-label="School owner name"
        >
          {{ school.owner.name }}
        </td>
        <td
          v-if="$store.state.isAdmin"
          data-label="School owner email"
        >
          {{ school.owner.email }}
        </td>
        <td>
          {{ school.active ? "Active" : "Inactive" }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons v-if="pagesList.length > 1">
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
