<template>
    <label>
        <slot></slot>
    </label>
</template>

<script setup>

</script>

<style scoped>
    label {
        width: fit-content;
        margin-bottom: 8px;
        display: block;
        color: #2d966e;
        font-size: 12px;
        transition: color 0.2s;
    }

    .input label + input:focus {
        color: white;
    }
</style>