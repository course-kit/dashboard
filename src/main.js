import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import VueMarkdownEditor from '@coursekit/v-md-editor/lib/codemirror-editor'
import '@coursekit/v-md-editor/lib/style/codemirror-editor.css'
import vuepressTheme from '@coursekit/v-md-editor/lib/theme/vuepress.js'
import '@coursekit/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import './css/main.css'
import enUS from '@coursekit/v-md-editor/lib/lang/en-US'
import plugin from 'markdown-it-front-matter'

import Codemirror from 'codemirror'
// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter'

// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'

VueMarkdownEditor.Codemirror = Codemirror

VueMarkdownEditor.lang.use('en-US', enUS)
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend (md) {
    md.use(plugin, () => {})
  }
})

/* Default title tag */
const defaultDocumentTitle = 'CourseKit'

/* Collapse mobile aside menu on route change */
router.beforeEach(async (to) => {
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)
  if (store.state.userEmail === null) {
    await store.dispatch('getUser')
  }
  if (store.state.userEmail === null) {
    store.commit('setDataLoaded', true)
    if (to.name !== 'home') {
      return { name: 'home' }
    }
  } else {
    if (!store.state.userPlan && store.state.userTrialDaysRemaining === 0 && to.name !== 'trial-ended') {
      store.commit('setDataLoaded', true)
      return { name: 'trial-ended' }
    } else {
      if (to.name === 'home') {
        return { name: 'start' }
      }
      if (!store.state.dataLoaded) {
        await Promise.all([
          store.dispatch('getCourses'),
          store.dispatch('getStudents'),
          store.dispatch('getSchools')
        ])
        store.commit('setDataLoaded', true)
        return true
      }
    }
  }
})

router.afterEach(to => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }

  /* Full screen mode */
  store.dispatch('fullScreenToggle', !!to.meta.fullScreen)
})

const app = createApp(App)

app.use(store).use(router).use(VueMarkdownEditor).mount('#app')
