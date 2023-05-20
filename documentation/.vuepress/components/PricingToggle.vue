<script setup lang="ts">
import { reactive } from 'vue';
import Button from './Button.vue';

const props = defineProps<{
    monthly: boolean;
}>();

const monthly = reactive({
    value: props.monthly
});

const emit = defineEmits(['changed']);


function updateMonthly(val: boolean) {
    monthly.value = val;
    emit('changed', monthly.value)
}
function toggleMonthly() {
    updateMonthly(!monthly.value);
}
function setYearly() {
    updateMonthly(false);
}
function setMonthly() {
    updateMonthly(true);
}

function getMonthlyClass() {
    return monthly.value ? 'active' : '';
}
function getYearlyClass() {
    return !monthly.value ? 'active' : '';
}

</script>

<template>
    <div class="toggle">
        <button :class="getMonthlyClass()" @click="setMonthly">
            <span class="label">Monthly</span>
        </button>
        <button :class="getYearlyClass()" @click="setYearly">
            <span class="label">Yearly</span>
            <span class="save">Save up to 55%</span>
        </button>
    </div>
</template>

<style scoped>
.toggle {
    border-radius: 2em;
    background: rgba(45, 15, 128, 0.05);
    /* box-shadow: inset 0px 0px 5px rgba(0, 0, 0, .1); */
    display: flex;
    flex-direction: row;
    height: 44px;
    padding: .15em;
    border: 1px solid rgba(0, 0, 0, .1);
    user-select: none;
}

button {
    padding: 1em;
    border-radius: 2em;
    color: rgba(0, 0, 0, .4);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);

    box-shadow: inset 0 0 20px 10px #f3f2f8;
    background: rgba(0, 0, 0, 0);
    transition: background 0.2s ease-in-out;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    min-width: 120px;
    font-weight: bold;

    user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
}

button.active {
    border: 2px solid rgba(106, 58, 196, .1);
}

button.active .label {
    text-shadow: 0 0 7px rgba(255, 255, 255, 0.5);
    transition: text-shadow 0.2s ease-in-out;
}

button.active:hover .label {
    text-shadow: 0 0 10px rgba(255, 255, 255, 1);
    transition: text-shadow 0.2s ease-in-out;
}

button:not(.active):hover {
    background: rgba(220, 81, 255, 0.3);
    transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
    color: rgba(0, 0, 0, .4);
}

.active {
    background-color: #826bed;
    color: white;
    box-shadow: inset 0px 0px 3px 1px rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(125, 78, 199, 0.1);
}

.save {
    font-size: .7em;
    font-weight: 700;
    margin-left: 1em;
    border-radius: 1em;
    padding: .51em .5em .5em .6em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.5);
    color: rgb(247, 108, 223);
    /* border: 1px dotted rgba(49, 49, 49, 0.5); */
    box-shadow: 0 0 3px rgba(50, 6, 78, 0.5);
}

.active .save {
    background: rgba(253, 255, 223, 0.836);
    color: rgb(192, 37, 166);
    /* border: 1px dotted rgba(255, 169, 248, 0.5); */
    box-shadow: 0 0 12px rgba(255, 255, 255, .2);
}


@media (max-width: 400px) {
    .save {
        display: none;
    }
}
</style>
