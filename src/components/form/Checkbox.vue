<template>
    <label class="cb-container">
        <slot></slot>
        <input v-model="model" type="checkbox"/>
        <span class="checkmark"></span>
    </label>
</template>

<script setup>
    const model = defineModel({
        default: false
    })
</script>

<style scoped>
    .cb-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        margin-top: 12px;
        cursor: pointer;
        font-size: 12px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: color 0.2s ease-in;
    }
    .cb-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: transparent;
        border: 1px solid #2d966e;
        transition: border 0.2s ease-in;
    }

    /* On mouse-over, add a grey background color */
    .cb-container:hover input ~ .checkmark {
        border: 1px solid white;
    }

    .cb-container:hover {
        color: white
    }
  
    /* When the checkbox is checked, add a blue background */
    .cb-container input:checked ~ .checkmark {
        background-color: #3cce94;
    }
    
    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    
    /* Show the checkmark when checked */
    .cb-container input:checked ~ .checkmark:after {
        display: block;
    }
    
    /* Style the checkmark/indicator */
    .cb-container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>