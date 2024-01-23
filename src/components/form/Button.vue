<template>
    <button class="form-btn">
        <slot></slot>
    </button>
</template>

<script setup>

</script>

<style scoped>
    .form-btn {
        outline: none;
        border: 0;
        background-color: #2d966e;
        color: white;
        border-radius: 0.15em;
        cursor: pointer;
        margin-top: 24px;
        margin-bottom: 8px;
        font-size: 16px;
        padding: 8px 8px;
        transition-property: background-color, color, border;
        transition: 0.15s ease-in;
    }
    .form-btn:enabled:hover {   
        background-color: #f8f2f2;
        color: #35ad7f
    }
    .form-btn:disabled {
        cursor: not-allowed;
        background-color: #6acca5;
    }
</style>