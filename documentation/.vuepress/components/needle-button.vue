
<script>

export default {
    props: {
        href: String,
        secondary: Boolean,
        disabled: Boolean,
        same_tab: Boolean,
        large: Boolean,
        event_goal: String,
        event_position: String,
        next_url: String || undefined,
    },
    methods: {
        get_next_url,
    }
}

// declare method that returns the next_url relative to where we're at
// this is used to pass the next_url to the button component
function get_next_url() {
    if (typeof window === 'undefined') {
        return this.href;
    }
    if (!this.next_url) return this.href;
    
    let nextUrl = window.location.origin + window.location.pathname;
    let target = new URL(this.href);
    // get propUrl relative to nextUrl
    if (this.next_url) {
        console.log(this.next_url, nextUrl);
        nextUrl = new URL(this.next_url, nextUrl).href;
        // URL encode
        nextUrl = encodeURIComponent(nextUrl);
        // also append the current UTC time to the URL to prevent caching
        nextUrl += '?t=' + Date.now();
        // append query parameters to target via proper URL object
        target = new URL(target);
        target.searchParams.append('next', nextUrl);
        target.searchParams.append('t', Date.now().toString());
    }
    return target.href;
}


</script>

<template>
    <component
        :is="disabled ? 'span' : 'a'"
        :href="disabled ? undefined : get_next_url()"
        :target="same_tab ? '_self' : '_blank'" 
        class="no-external-link-icon"
        :data-rybbit-event="event_goal || undefined"
        :data-rybbit-prop-position="(event_goal && event_position) ? event_position : undefined"
    >
        <button :disabled="disabled" :data-rybbit-event="event_goal || undefined" :data-rybbit-prop-position="(event_goal && event_position) ? event_position : undefined">
            <slot></slot>
            <p v-if="false">{{ get_next_url() }}</p>
        </button>
    </component>
</template>


<style scoped>
button {
    border: none;
    border-radius: 10em;
    text-shadow: none;
    padding: 1em 2em;
    background-color: v-bind('secondary ? "#aaa" : "#826bed"');
    transition: background-color .2s ease-in-out;
    margin: .2em;
    cursor: pointer;
    margin-left:-0.3em;
    color: white;
    font-size: v-bind('large ? "1em" : ".8em"');
}

button:disabled {
    cursor: default;
    opacity: 0.65;
}

button:not(:disabled):hover {
    background-color: #6248be;
    background-color: v-bind('secondary ? "#bbb" : "#6248be"');
    transition: background-color .2s ease-in-out;
}

a {
    text-shadow: none !important;
}
</style>