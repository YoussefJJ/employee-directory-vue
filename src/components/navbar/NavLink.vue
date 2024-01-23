<template>
    <router-link v-bind="$attrs" style="position: relative;" class="nav-link" exact-active-class="active">
        <span class="link-content">
            <slot></slot>
        </span>
    </router-link>
</template>

<script setup>

</script>

<style scoped>
    .nav-link {
        color: #e4e2e2;
        font-weight: 600;
        transition: transform .5s ease-in-out, color 0.2s ease-in-out;
        font-size: 16px;
        transform: translateY(0px);
    }
    .nav-link .link-content:hover {
        color: white;
    }
    .nav-link .link-content:after {
        content: "";
        position: absolute;
        display: block;
        bottom: -6px;
        left: 0;
        height: 3px;
        width: 0;
        background-color: white;
        transition: transform .4s ease-in-out,width 0.2s ease-in-out;
    }
    .nav-link .link-content:hover:after {
        width: 100%;
    }

    .nav-link.active {
        color: white;
        transform: translateY(10px)
    }
    .nav-link.active .link-content:after {
        width: 100%;
    }
</style>