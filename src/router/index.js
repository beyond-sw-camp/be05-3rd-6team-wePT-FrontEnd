import { createRouter, createWebHistory } from 'vue-router'

// firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/index.js'
import { useAuthStore } from '@/stores/auth.js'

// layouts
import IntroLayout from '@/layouts/lntroLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MatchingLayout from '@/layouts/MatchingLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Intro',
            component: () => import('@/views/Intro.vue'),
            meta: { layout: IntroLayout },
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/auth/Login.vue'),
            meta: { layout: AuthLayout },
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: () => import('@/views/auth/SignUp.vue'),
            meta: { layout: AuthLayout },
        },
        {
            path: '/password-reset',
            name: 'PasswordReset',
            component: () => import('@/views/auth/PasswordReset.vue'),
            meta: { layout: AuthLayout },
        },
        {
            path: '/main',
            name: 'Main',
            component: () => import('@/views/Main.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/matching/insert',
            name: 'Insert',
            component: () => import('@/views/matching/Insert.vue'),
            meta: { layout: MatchingLayout, requiresAuth: true },
        },
        {
            path: '/matching/update',
            name: 'Update',
            component: () => import('@/views/matching/Update.vue'),
            meta: { layout: MatchingLayout, requiresAuth: true },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    onAuthStateChanged(auth, user => {
        if (requiresAuth && !authStore.user) {
            next({ name: 'Login' }) // 인증되지 않은 사용자를 로그인 페이지로 리디렉트
        } else {
            next() // 인증 상태이거나 보호되지 않은 페이지인 경우 계속 진행
        }
    })
})


export default router
