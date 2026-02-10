<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import MobileMenuButton from '../components/MobileMenuButton.vue'
</script>

<template>
  <ParentLayout>
    <!-- Use navbar-before slot to properly inject hamburger button into navbar -->
    <template #navbar-before>
      <MobileMenuButton />
    </template>
  </ParentLayout>
</template>

<style lang="scss">
// Ensure the navbar-before content is properly aligned
// The navbar uses flexbox, so our button will be placed at the start
@media (max-width: 1023px) {
  // The navbar-before slot content appears before the brand
  // We want it to be visible and aligned properly
  .vp-navbar {
    // Ensure the navbar is a flex container (it should already be)
    display: flex;
    align-items: center;
  }
}
</style>
