<script>
export default {
    props: {
        text: String,
        generic_url: String,
        windows_url: String,
        osx_url: String,
        osx_silicon_url: String,
        linux_url: String,
    },
    methods: {
        getUrl: function () {
            const os = navigator.userAgent;
            if (os.indexOf('Windows') !== -1) {
                if (this.windows_url)
                    return this.windows_url;
            } else if (os.indexOf('Mac') !== -1) {
                if (this.osx_silicon_url && os.indexOf('Intel') === -1)
                    return this.osx_silicon_url;
                if (this.osx_url)
                    return this.osx_url;
            } else if (os.indexOf('Linux') !== -1) {
                if (this.linux_url)
                    return this.linux_url;
                if (this.osx_url)
                    return this.osx_url;
            }

            return this.generic_url ?? this.windows_url;
        }
    }
}
</script>



<template>
    <a :href="getUrl()">
        <slot>{{ text }}</slot>
    </a>
</template>