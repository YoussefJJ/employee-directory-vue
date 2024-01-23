import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const user = ref(null)

    const username = computed(() => user.value?.username)
    function loginUser({ username }, rememberMe) {
        user.value = {
          username,
          isAuthenticated
        }
        isAuthenticated.value = true
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user.value))
        }
    }

    function checkLogin() {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser?.username) { // has login data stored
            isAuthenticated.value = true
            user.value = {
                username: storedUser.username,
                isAuthenticated: true
            }
        }
        return isAuthenticated.value
    }

    function logoutUser() {
        user.value = null
        localStorage.removeItem('user')
        isAuthenticated.value = false
    }

    return {
        username, loginUser, isAuthenticated, checkLogin, logoutUser, user
    }
})