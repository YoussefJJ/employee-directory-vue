<template>
    <nav class="navbar">
        <div class="nav-title">
            <h2>Employee Directory</h2>
        </div>
        <div class="links">
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/jobs">
                Jobs Manager
            </NavLink>
            <NavLink to="/statistics">
                Statistics
            </NavLink>
            <NavLink to="/demo">
                Demo
            </NavLink>
        </div>
        <div class="nav-auth" v-if="username">
            Welcome {{ username }}!
            <button class="logout-btn" @click.stop="handleLogout">Logout</button>
        </div>
    </nav>
</template>

<script setup>
import NavLink from './NavLink.vue';
import { useAuthStore } from '@/stores/authStore'

const { username, logoutUser } = useAuthStore()

const handleLogout = () => {
    logoutUser()
    location.reload()
}
</script>

<style scoped>
    .navbar {
        width: 100%;
        background-color: rgb(45, 150, 110);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 16px;
        height: 80px;
    }
    .navbar .nav-title {
        margin-left: 16px;
        font-weight: 700;
        font-size: 16px;
    }
    @media (min-width: 768px) {
        .navbar .nav-title {
            font-size: 22px;
        }
    }
    .navbar .nav-auth {
        text-align: center;
        font-size: 14px;
        color: white;
    }

    .links {
        flex-grow: 2;
        margin: 0px 12px;
        display: flex;
        justify-content: space-evenly;
    }

    .navbar h2 {
        color: white;
    }

    .logout-btn {
        margin: auto;
        outline: none;
        cursor: pointer;
        border-radius: 0.15em;
        border: 2px solid white;
        background-color: transparent;
        color: white;
        display: block;
        padding: 8px 8px;
        transition: all .25s ease-in-out;
    }

    .logout-btn:hover {
        background-color: white;
        color: #37b685;
    }
</style>