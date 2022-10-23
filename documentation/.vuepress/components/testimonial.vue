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
.root {
    display: flex;
    /* justify-content: center; */
}

.testimonial {
    display: inline-block;
    margin: 0 0 1rem 0;
    padding: 1rem;
    background-color: rgba(125, 125, 125, .1);
    border-radius: 1em;
    border: 1px solid rgba(125, 125, 125, .2);
    box-shadow: inset 0 0 10px rgba(125, 125, 125, .1);
}

.marker {
    position: absolute;
    font-size: 2rem;
    color: rgba(50, 50, 50, .5);
    margin: -1.2rem -.7rem;
}

</style>

<template>
    <div class="root">
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
    </div>
</template>