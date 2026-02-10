<template>
  <button 
    :class="['mobile-menu-btn', { open: isOpen }]" 
    @click="toggleMenu" 
    aria-label="Toggle menu"
  >
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'MobileMenuButton',
  setup() {
    const isOpen = ref(false)
    
    // Listen for state updates from PageNav
    const handleStateUpdate = (event) => {
      isOpen.value = event.detail.isOpen
    }
    
    const toggleMenu = () => {
      // Emit toggle event to PageNav
      window.dispatchEvent(new CustomEvent('toggle-mobile-menu'))
    }
    
    onMounted(() => {
      window.addEventListener('mobile-menu-state', handleStateUpdate)
    })
    
    onUnmounted(() => {
      window.removeEventListener('mobile-menu-state', handleStateUpdate)
    })
    
    return {
      isOpen,
      toggleMenu
    }
  }
}
</script>