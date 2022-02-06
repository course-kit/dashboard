<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import CourseDelete from '@/components/CourseDelete.vue'
import { mdiTrashCan } from '@mdi/js'

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
const deleteId = ref(null)
const deleteActive = ref(false)
const del = (id) => {
  deleteId.value = id
  deleteActive.value = true
}
</script>

<template>
  <CourseDelete
    :id="deleteId"
    v-model="deleteActive"
    @confirm="deleteId = null"
  />
  <table>
    <thead>
      <tr>
        <th class="pl-6">
          Title
        </th>
        <th>ID</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="course in itemsPaginated"
        :key="course.id"
        class="cursor-pointer"
      >
        <td
          data-label="Title"
          class="pl-6"
          @click="router.push(`/courses/${course.id}`)"
        >
          {{ course.title }}
        </td>
        <td
          data-label="ID"
          @click="router.push(`/courses/${course.id}`)"
        >
          {{ course.id }}
        </td>
        <td data-label="ID">
          <jb-buttons>
            <jb-button
              :icon="mdiTrashCan"
              small
              @click="del(course.id)"
            />
          </jb-buttons>
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
