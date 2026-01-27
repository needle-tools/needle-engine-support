import { defineClientConfig } from '@vuepress/client'
import '@shikijs/twoslash/style-rich.css';
import PageNav from './components/PageNav.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [PageNav],
})