<template>
    <header>
        <Navbar/>
    </header>
    
    <main>
        <div class="container">
            <router-view></router-view>
        </div>
    </main>
</template>

<script setup>
import Navbar from '@/components/navbar/Navbar.vue';

</script>

<style scoped>

</style>