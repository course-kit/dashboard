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

const selectSchool = function (id) {
  store.dispatch('changeSchool', id)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="pl-6">
          School ID
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="school in schoolsPaginated"
        :key="school"
        class="cursor-pointer"
        @click="selectSchool(school)"
      >
        <td
          data-label="School ID"
          class="pl-6"
        >
          {{ school }}
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
