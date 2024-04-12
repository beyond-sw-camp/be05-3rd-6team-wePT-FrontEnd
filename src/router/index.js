import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '@/views/Intro.vue'
import IntroLayout from '@/layouts/lntroLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Intro',
            component: IntroView,
            meta: { layout: IntroLayout },
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/auth/Login.vue'),
            meta: { layout: AuthLayout },
        },
        {
            path: '/sign-in',
            name: 'SignIn',
            component: () => import('@/views/auth/SignIn.vue'),
            meta: { layout: AuthLayout },
        },
        {
            path: '/main',
            name: 'Main',
            component: () => import('@/views/Main.vue'),
        },
    ],
})

export default router
