<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import { mdiArrowUpBold, mdiArrowDownBold } from '@mdi/js'

const props = defineProps({
  courseId: {
    type: String,
    required: true
  },
  lessons: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const perPage = ref(10)

const currentPage = ref(0)

const lessonsPaginated = computed(
  () => props.lessons.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(props.lessons.length / perPage.value) || 1)

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
          Pos
        </th>
        <th>Name</th>
        <th>ID</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="lesson in lessonsPaginated"
        :key="lesson.id"
      >
        <td
          data-label="Position"
          class="pl-6 w-12 cursor-pointer"
          @click="router.push(`/courses/${courseId}/lessons/${lesson.id}`)"
        >
          {{ lesson.position + 1 }}
        </td>
        <td
          data-label="Name"
          class="cursor-pointer"
          @click="router.push(`/courses/${courseId}/lessons/${lesson.id}`)"
        >
          {{ lesson.name }}
        </td>
        <td
          data-label="ID"
          class="cursor-pointer"
          @click="router.push(`/courses/${courseId}/lessons/${lesson.id}`)"
        >
          {{ lesson.id }}
        </td>
        <td class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              v-if="lessons[0].id !== lesson.id"
              :icon="mdiArrowUpBold"
              small
              @click="store.dispatch('lessonPosChange', { courseId, lessonId: lesson.id, isInc: false })"
            />
            <jb-button
              v-if="lessons[lessons.length - 1].id !== lesson.id"
              :icon="mdiArrowDownBold"
              small
              @click="store.dispatch('lessonPosChange', { courseId, lessonId: lesson.id, isInc: true })"
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
