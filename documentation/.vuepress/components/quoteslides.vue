<script>
import { defineComponent, onMounted } from 'vue'
import { defineClientConfig } from '@vuepress/client'


export default defineClientConfig({
    setup() {
        onMounted(() => {
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
            }, 3000);
        })
    }
})

</script>

<style scoped>
.quotes {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1em;
    text-align: center;
    min-height: 100px;
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
    font-size: 1.5em;
    font-style: italic;
}

.quotes>div {
    border: 1px solid red;
}
</style>

<template>
    <div class="quotes">
        <slot></slot>
    </div>
</template>