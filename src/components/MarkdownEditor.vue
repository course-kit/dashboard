<script setup>
import { loadFront } from 'yaml-front-matter'
import { computed, ref, watchEffect } from 'vue'
import yaml from 'js-yaml'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  publicContentString: {
    type: String,
    default: ''
  },
  privateContentString: {
    type: String,
    default: ''
  },
  lessonId: {
    type: String,
    default: null
  },
  courseId: {
    type: String,
    required: true
  }
})

const privateContent = JSON.parse(props.privateContentString) || {}
const publicContent = JSON.parse(props.publicContentString) || {}

const content = ref(null)

function extractMarkdown () {
  let markdown
  if (publicContent.content) {
    if (!publicContent.markdown) {
      publicContent.markdown = ''
    }
    markdown = publicContent.markdown
    delete publicContent.markdown
  } else {
    if (!privateContent.markdown) {
      privateContent.markdown = ''
    }
    markdown = privateContent.markdown
    delete privateContent.markdown
  }
  return markdown
}

function initializeContent () {
  const markdown = extractMarkdown()
  // console.log(markdown)
  if (Object.keys(publicContent).length > 0) {
    privateContent.public = publicContent
  }
  if (Object.keys(privateContent).length === 0) {
    content.value = markdown
  } else {
    const frontmatter = yaml.dump(privateContent)
    content.value = `---\n${frontmatter}---\n${markdown}`
  }
}

async function parseContent (content) {
  const str = content.replace(/\t/g, '  ')
  const vars = loadFront(str)
  let publicContent = {}
  if (typeof vars.public === 'object') {
    publicContent = vars.public
    delete vars.public
  }
  let md = vars.__content
  if (md.charAt(0) === '\n') {
    md = vars.__content.substring(1)
  }
  delete vars.__content
  const privateContent = vars
  if (publicContent.content) {
    publicContent.markdown = md
  } else {
    privateContent.markdown = md
  }
  return {
    publicContent: JSON.stringify(publicContent),
    privateContent: JSON.stringify(privateContent)
  }
}

watchEffect(() => {
  if (content.value === null) {
    initializeContent()
  }
})

async function save () {
  try {
    const { publicContent, privateContent } = await parseContent(content.value)
    const action = props.lessonId ? 'lessonEdit' : 'courseEdit'
    const payload = {
      publicContent,
      privateContent
    }
    if (props.lessonId) {
      payload.lessonId = props.lessonId
      payload.courseId = props.courseId
    } else {
      payload.id = props.courseId
    }
    await store.dispatch(action, payload)
    savedVersion.value = content.value
  } catch (err) {
    console.log(err)
  }
}

const changed = computed(() => {
  return content.value !== savedVersion.value
})

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

const savedVersion = ref(content.value)
</script>
<template>
  <div>
    <header class="flex items-stretch bg-gray-300">
      <p class="flex items-center py-3 grow font-bold px-6">
        Content
      </p>
    </header>
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
  </div>
</template>
<style>
.v-md-editor {
  box-shadow: none;
}
.v-md-editor__toolbar {
  background-color: rgb(249 250 251);
}
.v-md-editor__main {
  padding: 1rem 0 1.5rem;
}
</style>
