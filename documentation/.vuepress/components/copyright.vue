<script>
export default {}
</script>

<style scoped>
.footer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: .3em .6em;
    padding: 1em;
    font-size: .8em;
    opacity: .8;
}

.entry {
    white-space: nowrap;
}

.sep {
    margin-right: .5em;
    opacity: .6;
}

a {
    color: inherit;
    font-weight: normal;
}
</style>

<template>
    <div class="footer">
        <span class="entry">©2026 Needle Tools GmbH</span>
        <span class="entry"><span class="sep">–</span><a class="no-external-link-icon" target="_blank" href="https://needle.tools/contact">About</a></span>
        <span class="entry"><span class="sep">–</span><a class="no-external-link-icon" target="_blank" href="https://needle.tools/contact#privacy-policy">Privacy Policy</a></span>
        <span class="entry"><span class="sep">–</span><a class="no-external-link-icon" target="_blank" href="./sitemap.xml">Sitemap</a></span>
    </div>
</template>