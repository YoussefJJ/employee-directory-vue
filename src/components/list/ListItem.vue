<template>
    <li class="list-item" :class="{ selected }">
      <slot></slot>  
    </li>
</template>

<script setup>
    const { selected } = defineProps({
        selected: {
            type: Boolean,
            default: false
        }
    })
</script>

<style scoped>
    .list-item {
        text-align: center;
        color: white;
        padding: 4px 8px;
        width: 100%;
        background-color: #262727;
        border-bottom: 1px solid #2d966e;
    }


    .list-item:hover {
        background-color: #2d966e;
        color: white;
        cursor: pointer;
    }

    .list-item.selected {
        background-color: #2d966e;
        color: white;
    }
</style>