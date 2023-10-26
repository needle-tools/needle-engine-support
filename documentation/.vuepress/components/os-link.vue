<script>
export default {
    props: {
        text: String,
        windows_url: String,
        osx_url: String,
        osx_silicon_url: String,
        linux_url: String,
    },
    methods: {
        getUrl: function () {
            const os = navigator.userAgent;
            if (os.indexOf('Windows') !== -1) {
                return this.windows_url;
            } else if (os.indexOf('Macintosh') !== -1) {
                if(this.osx_silicon_url && os.indexOf('Intel') === -1)
                    return this.osx_silicon_url;
                return this.osx_url;
            } else if (os.indexOf('Linux') !== -1) {
                if (this.linux_url)
                    return this.linux_url;
                return this.osx_url;
            } else {
                return this.windows_url;
            }
        }
    }
}
</script>



<template>
    <a :href="getUrl()">
        <slot>{{ text }}</slot>
    </a>
</template>