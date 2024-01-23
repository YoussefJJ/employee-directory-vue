import { useAuthStore } from '@/stores/authStore'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Directory from '../components/directory/Directory.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import WIP from '@/views/WIP.vue'

const routes = [
    { path: '/', component: Home, redirect: '/directory', children: [
        { path: 'directory', component: Directory },
        { path: 'statistics', component: WIP },
        { path: 'jobs', component: WIP },
        { path: 'Demo', component: WIP },
        { path: '/:pathMatch(.*)*', component: NotFound}
    ] },
    { path: '/login', component: Login },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const publicPages = ['/login']
    const authRequired = !publicPages.includes(to.path)
    const { checkLogin } = useAuthStore()
    const isAuthenticated = checkLogin()

    if (authRequired && !isAuthenticated) {
        next('/login')
    }
    else {
        next()
    }
})

export default router