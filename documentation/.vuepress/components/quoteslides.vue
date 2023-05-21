<script>
import { defineComponent, onMounted } from 'vue'
import { defineClientConfig } from '@vuepress/client'


export default defineClientConfig({
    setup() {
        onMounted(() => {
            const quotesContainer = document.querySelector('.quotes');
            quotesContainer.style.display = 'flex';
            const quotes = document.querySelectorAll('.quotes > div');
            for (let i = 0; i < quotes.length; i++) {
                if (i !== 0) {
                    quotes[i].style.display = 'none';
                }
            }
            let i = 0;
            setInterval(() => {
                quotes[i].style.display = 'none';
                i = (i + 1) % quotes.length;
                quotes[i].style.display = 'block';
            }, 5000);
        })
    }
})

</script>

<style scoped>
.quotes {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: .5em;
    text-align: center;
    min-height: 90px;
    display: none;
    padding-top: 0;
}

@media (max-width: 768px) {
    .quotes {
        min-height: 200px;
    }
}

/* .quotes::before {
    content: "“";
    font-size: 1em;
    font-weight: bold;
    margin-right: 0.5em;
}
.quotes::after {
    content: "”";
    font-size: 1em;
    font-weight: bold;
    margin-left: 0.5em;
} */

.quotes {
    font-size: 1.2em;
    font-style: italic;
}

</style>

<template>
    <div class="quotes">
        <slot></slot>
    </div>
</template>