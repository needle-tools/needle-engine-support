<script>
// export default {}
export default {
    props: {
        name: String,
        src: String,
    }
}
</script>

<style scoped>
div {
    display: inline-block;
}

.testimonial {
    margin: 0 0 1rem 0;
    padding: 1rem;
    background-color: rgba(125, 125, 125, .2);
    border-radius: 5px;
    border: 1px solid rgba(125, 125, 125, .1);
    font-size: 1em
}

.marker {
    position: absolute;
    font-size: 2rem;
    color: rgba(50, 50, 50, .5);
    margin: -1.2rem -.7rem;
}

.quote {
}
</style>

<template>
    <div class="testimonial">
        <!-- <span class="marker">“</span> -->
        <span class="quote">
            <slot></slot>
        </span>
        <span class="name">
            — <a :href="src" target="_blank">
                {{ name }}
            </a>
        </span>
    </div>
</template>