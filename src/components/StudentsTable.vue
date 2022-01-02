<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import { mdiTrashCan } from '@mdi/js'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const items = computed(() => store.state.students)

const perPage = ref(10)

const currentPage = ref(0)

const studentsPaginated = computed(
  () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value) || 1)

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const getCourse = function (id) {
  const course = store.state.courses.find(course => course.id === id)
  return course.name
}

</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="pl-6">
          Name
        </th>
        <th>Email</th>
        <th>Course</th>
        <th>Status</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="student in studentsPaginated"
        :key="student.id"
      >
        <td
          data-label="Name"
          class="pl-6 cursor-pointer"
          @click="router.push(`/students/${student.id}/`)"
        >
          {{ student.name }}
        </td>
        <td
          data-label="Email"
          class="cursor-pointer"
          @click="router.push(`/students/${student.id}`)"
        >
          {{ student.email }}
        </td>
        <td
          data-label="Course"
          class="cursor-pointer"
          @click="router.push(`/courses/${student.course}`)"
        >
          {{ getCourse(student.course) }}
        </td>
        <td
          data-label="Status"
          class="cursor-pointer"
          @click="router.push(`/students/${student.id}`)"
        >
          {{ student.status }}
        </td>
        <td class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              :icon="mdiTrashCan"
              small
            />
          </jb-buttons>
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