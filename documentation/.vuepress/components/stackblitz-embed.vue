
<script>

// export default {
//     mounted() {
//         setTimeout(()=>{
//         StackBlitzSDK.embedProjectId(
//         'embed',
//         'needle-engine-cycle-src',
//         {
//             forceEmbedLayout: true,
//             openFile: 'README.md',
//         }
//         );
//         }, 1000);
//     },
// }


</script>

<template>
    <!-- <div id="embed"></div> -->
    <iframe src="https://stackblitz.com/edit/needle-engine-cycle-src?embed=1&file=README.md&hideExplorer=1&view=preview" />
</template>


<style scoped>

iframe {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    min-height: 500px;
}

</style>