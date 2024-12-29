<script setup lang="ts">

defineProps({
    fallback_image: String,
})

import { ref } from 'vue';

type Discount = {
    banner: {
        title: string,
        subtitle: string,
    }
    url: string,
}

const discount = ref<Discount | null>(null);

if (typeof window !== "undefined") {
    const url = "https://cloud.needle.tools/api/v1/get/discounts";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const value: Discount = data.current_discounts?.[0];
            discount.value = value;
        });
}


</script>

<template>
    <div v-if="discount" class="discount_banner">
        <div class="content">
            <h2 class="main_text">{{ discount.banner.title }}</h2>
            <div class="text">{{ discount.banner.subtitle }}</div>
        </div>

        <div class="action">
            <a target="_blank" tabindex="-1" :href="discount.url">
                Claim now
            </a>
        </div>
    </div>
    <div v-else-if="fallback_image" class="banner">
        <img :src="fallback_image" alt="Needle Engine banner" />
    </div>
</template>

<style scoped>

.banner {
    margin: 1rem 0;
}

.discount_banner {
    margin: 1rem 0;

    border-radius: 1rem;
    outline: 1px solid var(--c-border);
    border: 1px solid rgba(255, 255, 255, 0.74);
    line-height: initial !important;

    background: var(--c-background-secondary);
    background-color: #a9d43a;
    background: linear-gradient(20deg, #b2f040 50%, #f1dc36 100%);

    box-shadow:
        inset 0 0 1rem rgba(255, 255, 255, 0.5),
        0 0 1rem rgba(0, 0, 0, 0.185);
    color: rgb(0, 0, 0);

    @media screen and (max-width: 800px) {
        margin-left: 0;
    }

    transition: all 0.4s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        transition: all 0.4s ease-in-out;

        & button {
            transition: all 0.2s ease-in-out;
            background: #414424 !important;
            text-shadow: 0 0 0.5em rgba(255, 255, 255, 0.9);
        }
    }

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    text-align: start;

    padding: 1.3rem;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;

    & .content {
        display: flex;
        flex-direction: column;
        gap: 0;
        max-width: 60ch;
        user-select: none;

        & > * {
            text-decoration: none;
            border: none;
        }

        & .main_text {
            margin: 0;
            padding: 0;
        }

        & .text {
            line-height: 1.2em;
        }
    }

    & .action {
        /* align-self: start; */
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: start;
        justify-content: start;

        & a {
            transition: all 0.4s ease-in-out;
            background-color: var(--c-brand-secondary);
            background-color: rgb(14, 14, 14);
            box-shadow:
                0 0 0.3rem rgba(0, 0, 0, 0.5),
                0 0 1rem rgba(255, 255, 255, 0.411);
            color: white;
            text-shadow: 0 0 0.5em rgba(255, 255, 255, 0.808);
            border: none;
            outline: none;
            font-size: 1.2rem;
            border-radius: 1rem;
            padding: .3rem 1rem;
        }
    }
}
</style>