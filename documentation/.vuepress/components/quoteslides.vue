<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'

export default defineComponent({
  setup() {
    const activeIndex = ref(0);
    const slideCount = ref(0);
    const slidesContainer = ref(null);
    let autoplayTimer = null;
    const autoplayDelay = 5000; // 5 seconds between slides

    const setActiveSlide = (index) => {
      activeIndex.value = index;
      scrollToSlide(index);
      // Reset timer when manually navigating
      if (autoplayTimer) {
        stopAutoplay();
        startAutoplay();
      }
    };

    const nextSlide = () => {
      activeIndex.value = (activeIndex.value + 1) % slideCount.value;
      scrollToSlide(activeIndex.value);
    };

    const prevSlide = () => {
      activeIndex.value = (activeIndex.value - 1 + slideCount.value) % slideCount.value;
      scrollToSlide(activeIndex.value);
    };

    const scrollToSlide = (index) => {
      if (slidesContainer.value) {
        // Use simpler calculation with slide's offsetWidth to ensure accurate positioning
        const slide = slidesContainer.value.children[index];
        if (slide) {
          const scrollPosition = slide.offsetLeft;
          slidesContainer.value.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    const handleScroll = () => {
      if (slidesContainer.value) {
        const scrollPosition = slidesContainer.value.scrollLeft;
        const slideWidth = slidesContainer.value.offsetWidth;
        const newIndex = Math.round(scrollPosition / slideWidth);
        
        if (newIndex !== activeIndex.value) {
          activeIndex.value = newIndex;
          
          // Reset timer when user manually scrolls
          if (autoplayTimer) {
            stopAutoplay();
            startAutoplay();
          }
        }
      }
    };

    const setupSlides = () => {
      if (slidesContainer.value) {
        const slides = slidesContainer.value.children;
        slideCount.value = slides.length;
        
        // Force each slide to take exactly one viewport width of the container
        const containerWidth = slidesContainer.value.offsetWidth;
        
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.minWidth = `${containerWidth}px`;
          slides[i].style.width = `${containerWidth}px`;
          slides[i].style.flex = `0 0 ${containerWidth}px`;
          // Remove margin which was causing the offset issue
        }
        
        // Set initial slide
        scrollToSlide(activeIndex.value);
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setTimeout(() => {
        nextSlide();
        startAutoplay();
      }, autoplayDelay);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearTimeout(autoplayTimer);
        autoplayTimer = null;
      }
    };

    onMounted(() => {
      setTimeout(() => {
        if (slidesContainer.value) {
          setupSlides();
          
          // Add scroll event listener
          slidesContainer.value.addEventListener('scroll', handleScroll);
          
          // Add resize listener to update slide widths
          window.addEventListener('resize', setupSlides);
          
          // Start autoplay if we have more than one slide
          if (slideCount.value > 1) {
            startAutoplay();
          }
        }
      }, 100);
    });

    onBeforeUnmount(() => {
      stopAutoplay();
      if (slidesContainer.value) {
        slidesContainer.value.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', setupSlides);
      }
    });

    return {
      activeIndex,
      slideCount,
      slidesContainer,
      setActiveSlide,
      nextSlide,
      prevSlide
    };
  }
})
</script>

<style>
/* Global rules to ensure slide width */
.quoteslides .quotes > div {
  /* These fixed percentages will be overridden by our JS calculations */
  box-sizing: border-box;
  scroll-snap-align: start;
}
</style>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  overflow: hidden;
}

.quotes {
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scroll-behavior: smooth;
  overscroll-behavior-x: contain; /* Prevent overscroll on swipe */
  padding: 0;
  gap: 20px; /* Add gap between slides */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.quotes::-webkit-scrollbar {
  display: none;
}

/* Style for each slide */
.quotes > div {
  flex: 0 0 100% !important;
  min-width: 100% !important;
  width: 100% !important;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.2s ease;
}

.carousel-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -0.5rem;
  width: 100%;
  z-index: 2;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--c-quote-light);
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-dot.active {
  background-color: var(--c-brand);
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 2;
}

.carousel-control {
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  margin: 0 5px;
}

.carousel-control:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .carousel-control {
    width: 25px;
    height: 25px;
  }
}
</style>

<template>
  <div class="carousel-container quoteslides">
    <div class="quotes" ref="slidesContainer">
      <slot></slot>
    </div>
    
    <div class="carousel-nav" v-if="slideCount > 1">
      <div class="carousel-controls" v-if="false">
        <button class="carousel-control prev" @click="prevSlide">←</button>
      </div>
      
      <div 
        v-for="index in slideCount" 
        :key="index-1"
        class="carousel-dot"
        :class="{ active: activeIndex === index-1 }"
        @click="setActiveSlide(index-1)"
      ></div>
      
      <div class="carousel-controls" v-if="false">
        <button class="carousel-control next" @click="nextSlide">→</button>
      </div>
    </div>
  </div>
</template>