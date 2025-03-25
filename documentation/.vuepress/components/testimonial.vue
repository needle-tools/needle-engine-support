<script>
export default {
    props: {
        name: String,
        role: String,
        src: String,
        img: String,
    }
}
</script>

<template>
    <div class="root">
        <div class="testimonial">
            <!-- <span class="marker">“</span> -->
            <span class="quote">
                <slot></slot>
            </span>
            <div class="testimonial-footer">
                <img :src="img" alt="Testimonial" v-if="img" />
                <p class="author">
                    <span class="name">
                        <a :href="src" target="_blank">
                            {{ name }}
                        </a>
                    </span>
                    <span class="role" v-if="role">
                        {{ role }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.root {
    display: flex;
    /* justify-content: center; */
}

.testimonial {
    display: flex;
    flex-direction: column;
    margin: 0 0 1rem 0;
    padding: 1.5rem;
    background-color: var(--c-quote-background);
    color: var(--c-quote-text);
    border: 1px solid var(--c-border);
    border-radius: 1rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .0);
    flex-grow: 1;
}

.testimonial-footer {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    & img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 1rem;
    }

    & .author {
        display: flex;
        flex-direction: column;
        color: var(--c-quote-text);
        text-align: left;
        margin: 0;

        & .name, & .name a {
            font-weight: bold;
            color: var(--c-quote-text);
        }

        & .role {
            color: var(--c-quote-text);
        }
    }
}

.quote {
    font-size: 1.15rem;
    margin-left: 3.5rem;
    position: relative;

    &::before {
        content:"“";
        font-size: 6rem;
        line-height: 5rem;
        position: absolute;
        left: -3.5rem;
        color: var(--c-quote-light);
    }
}

.marker {
    position: absolute;
    font-size: 2rem;
    color: rgba(50, 50, 50, .5);
    margin: -1.2rem -.7rem;
}

</style>