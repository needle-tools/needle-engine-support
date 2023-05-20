<script setup lang="ts">

const props = defineProps({
    href: String,
    secondary: Boolean,
    same_tab: Boolean,
    no_spacing: Boolean,
    full_width: Boolean,
    small: Boolean,
    color: String,
    backgroundColor: String,
});

function getLinkTarget() {
    if (props.same_tab)
        return "_self";
    return "_blank"
}

function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

const darkerBackgroundColor = props.backgroundColor ? adjust(props.backgroundColor, -40) : undefined;

</script>

<style scoped>
button {
    position: relative;
    border: none;
    border-radius: 2em;
    text-shadow: none;
    min-width: 70px;
    padding: 0.85em 1em 0.7em 0.9em;
    background-color: #e5e3eb;
    background-color: v-bind('backgroundColor ? backgroundColor : secondary ? "#e5e3eb" : "#826bed"');
    border: 1px solid rgba(0, 0, 0, .1);
    transition: background-color .2s ease-in-out;
    margin: v-bind('no_spacing ? 0 : ".2em"');
    color: v-bind('color ? color : secondary ? "#444" : "#fff"');
    /* box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, .1); */
    line-height: 1.3em;
    width: v-bind('full_width ? "100%" : "initial"');
    padding-top: v-bind('small ? ".5em" : "0.85em"');
    padding-bottom: v-bind('small ? ".42em" : "0.85em"');
    font-size: v-bind('small ? ".8em" : "1em"');
    transition: text-shadow .2s ease-in-out;
    border: 2px solid rgba(255, 255, 255, .8);
    /* border-color: v-bind('secondary ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)"'); */
    box-shadow: 0 0 2px rgba(0, 0, 0, .5);
}

button:hover {
    background-color: #dbd8e4;
    background-color: v-bind('darkerBackgroundColor ? darkerBackgroundColor : secondary ? "#dbd8e4" : "#6248be"');
    transition: background-color .1s ease-in-out, text-shadow .3s ease-in-out;
    border-color: v-bind('secondary ? "rgba(255,255,255,1)" : "inherit"');
    /* border-color: rgba(0, 0, 0, 0); */
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.7);
}

a {
    text-shadow: initial !important;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    border: none !important;
    background-color: initial !important;
    padding: initial !important;
    box-shadow: initial !important;
}
</style>

<template>
    <a :href="props.href" :target='getLinkTarget()'>
        <button>
            <!-- {{ props.href }} -->
            <slot></slot>
        </button>
    </a>
</template>
