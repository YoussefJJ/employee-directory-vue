<template>
    <div class="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.wrapper {
    background-color: rgba(53, 53, 53, 0.247);
    padding: 36px;
    outline-offset: -10px;
    outline: 1px solid #2d966e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>