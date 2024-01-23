<template>
    <input v-model="model" type="text" ref="inputRef"/>
</template>

<script setup>
import { ref } from 'vue';

    const model = defineModel()
    const inputRef = ref(null)

    defineExpose({
        ref: inputRef
    })
</script>

<style scoped>
    input {
        background-color: transparent;
        outline: none;
        border: 1px solid #2d966e;
        padding: 8px 16px;
        color: rgb(235, 232, 232);
        box-sizing: border-box;
        transition: border 0.5s;
    }

    input:focus {
        border: 1px solid white;
    }
</style>