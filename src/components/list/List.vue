<template>
    <ol class="list">
        <slot></slot>
    </ol>
</template>

<script setup>

</script>

<style scoped>
    .list {
        padding: 0;
        list-style: none;
        list-style-type: none;
        overflow-y: auto;
        height: 500px;
        margin: 16px 0px;
        border: 1px solid #2d966e;
    }
</style>