<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import LessonAdd from '@/components/LessonAdd.vue'
import { loadFront } from 'yaml-front-matter'
import yaml from 'js-yaml'

const store = useStore()
const route = useRoute()

const course = computed(() =>
  store.getters.getCourseById(route.params.courseId)
)
const lesson = computed(() =>
  store.getters.getLessonById(route.params.courseId, route.params.lessonId)
)

const content = ref(null)

watchEffect(() => {
  if (content.value === null) {
    const publicContent = JSON.parse(lesson.value.publicContent)
    const privateContent = JSON.parse(lesson.value.privateContent)
    const markdown = privateContent.markdown
    delete privateContent.markdown
    privateContent.public = publicContent
    const frontmatter = yaml.dump(privateContent)
    const str = `---\n${frontmatter}---${markdown}`
    content.value = str
  }
})

const titleStack = computed(() => [
  { name: 'Courses', to: '/courses' },
  {
    name: course.value ? course.value.title : null,
    to: course.value ? `/courses/${course.value.id}` : null
  },
  {
    name: 'Lessons',
    to: course.value ? `/courses/${course.value.id}/#lessons` : null
  },
  { name: lesson.value ? lesson.value.title : null }
])

async function parseContent (content) {
  const str = content.replace(/\t/g, '  ')
  const vars = loadFront(str)
  let publicContent = {}
  let privateContent = {}
  if (vars) {
    if (typeof vars.public === 'object') {
      publicContent = vars.public
      delete vars.public
    }
    privateContent = vars
    privateContent.markdown = privateContent.__content
    delete privateContent.__content
  }
  return {
    publicContent: JSON.stringify(publicContent),
    privateContent: JSON.stringify(privateContent)
  }
}

const save = async () => {
  try {
    const { publicContent, privateContent } = await parseContent(content.value)
    await store.dispatch('lessonEdit', {
      lessonId: lesson.value.id,
      courseId: course.value.id,
      publicContent,
      privateContent
    })
    savedVersion.value = content.value
  } catch (err) {
    console.log(err)
  }
}

const changed = computed(() => {
  return content.value !== savedVersion.value
})
const savedVersion = ref(content.value)

const lessonEditActive = ref(false)

const codemirrorConfig = {
  mode: 'yaml-frontmatter',
  lineNumbers: false,
  extraKeys: {
    Tab: function (cm) {
      const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
      cm.replaceSelection(spaces)
    }
  }
}

const codemirrorEditor = ref()
</script>

<template>
  <LessonAdd
    v-model="lessonEditActive"
    :course-id="course.id"
    :lesson-id="lesson.id"
  />
  <title-bar :title-stack="titleStack" />
  <main-section v-if="lesson">
    <card-component
      class="mb-6"
      title="Lesson info"
      has-table
      @header-icon-click="lessonEditActive = true"
    >
      <table>
        <tbody>
          <tr>
            <td class="pl-6">
              Title
            </td>
            <td>{{ lesson.title }}</td>
          </tr>
          <tr>
            <td class="pl-6">
              ID
            </td>
            <td>{{ lesson.id }}</td>
          </tr>
        </tbody>
      </table>
    </card-component>
    <v-md-editor
      ref="codemirrorEditor"
      v-model="content"
      left-toolbar="undo redo | save"
      right-toolbar="preview sync-scroll fullscreen"
      :codemirror-config="codemirrorConfig"
      mode="edit"
      :autofocus="true"
      @save="save"
    />
    <div
      v-if="changed"
      class="rounded mt-4 bg-red-100 px-4 py-2 text-sm text-red-500 flex flex-row justify-between items-center"
    >
      <span>You have unsaved changes.</span>
      <button
        class="border border-red-500 py-2 px-4 rounded"
        @click="save"
      >
        Save
      </button>
    </div>
  </main-section>
</template>

<style>
.v-md-editor {
  box-shadow: none;
}
.v-md-editor__toolbar {
  background-color: rgb(209 213 219);
}
.v-md-editor__toolbar-divider:before {
  border-color: #6b7280;
}
</style>
