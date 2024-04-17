import { defineStore } from 'pinia'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/index.js'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        initAuth() {
            onAuthStateChanged(auth, user => {
                this.user = user
                if (!user && router) {
                    router.push('/')
                }
            })
        },
        async logout() {
            try {
                await signOut(auth)
                this.user = null // 사용자 상태 초기화
                localStorage.clear()
                router.push('/login') // 로그인 페이지로 리디렉션
            } catch (error) {
                console.log('Logout Failed: ', error)
            }

        },
    },
})
