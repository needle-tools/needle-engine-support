import { defineClientConfig } from '@vuepress/client'
import Pricing from "./layouts/Pricing.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
  layouts: {
    Pricing
  }
})