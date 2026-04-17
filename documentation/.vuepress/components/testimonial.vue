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
            <span class="quote">
                <slot></slot>
            </span>
            <div class="testimonial-footer">
                <img :src="img || '/docs/testimonial/placeholder.svg'" alt="Testimonial" />
                <p class="author">
                    <span class="name">
                        <a v-if="src" :href="src" target="_blank">{{ name }}</a>
                        <span v-else>{{ name }}</span>
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
}

.testimonial {
    display: flex;
    flex-direction: column;
    margin: 0 0 1rem 0;
    padding: 1.5rem 1.5rem 1.5rem 2rem;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease, background 0.3s ease;
    flex-grow: 1;

    &:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        background: rgba(255, 255, 255, 0.8);
    }
}

.testimonial-footer {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    & img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.75rem;
        object-fit: cover;
    }

    & .author {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0;

        & .name, & .name a {
            font-weight: 600;
            color: var(--c-text);
            text-decoration: none;
        }

        & .name a:hover {
            color: var(--c-brand);
        }

        & .role {
            color: var(--c-text-lighter);
            font-size: 0.85rem;
        }
    }
}

.quote {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-left: 2.5rem;
    position: relative;
    color: var(--c-text);
    font-style: italic;

    &::before {
        content: "\201C";
        font-family: Georgia, serif;
        font-size: 3.5rem;
        line-height: 1;
        position: absolute;
        left: -2.5rem;
        top: -0.5rem;
        color: var(--c-brand);
        font-style: normal;
    }
}

.marker {
    position: absolute;
    font-size: 2rem;
    color: rgba(50, 50, 50, .5);
    margin: -1.2rem -.7rem;
}

</style>

<style>
/* ── Dark mode (unscoped so html selector works) ── */
html[data-theme='dark'] .testimonial {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
}

html[data-theme='dark'] .testimonial:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
</style>
