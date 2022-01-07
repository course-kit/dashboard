<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

const store = useStore()
const router = useRouter()

const items = computed(() => store.state.courses)

const perPage = ref(10)

const currentPage = ref(0)

const itemsPaginated = computed(() =>
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
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="pl-6">
          Title
        </th>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="course in itemsPaginated"
        :key="course.id"
        class="cursor-pointer"
        @click="router.push(`/courses/${course.id}`)"
      >
        <td
          data-label="Title"
          class="pl-6"
        >
          {{ course.title }}
        </td>
        <td data-label="ID">
          {{ course.id }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
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
