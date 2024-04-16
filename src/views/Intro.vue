<template>
    <section style='width: 100%'>
        <div class='intro-wrapper'>
            <div class='logo-wrapper'>
                <Logo src='../../public/assets/wePT_logo.svg' altText='wePT-Logo' />
            </div>
            <div class='two-button-wrapper'>
                <b-button
                    style='background-color: var(--primary-color);
                           border-color: var(--primary-color);'
                    @click='goToLogin'
                >로그인
                </b-button>
                <b-button
                    style='background-color: var(--primary-color);
                           border-color: var(--primary-color);'
                    @click='goToSignIn'
                >회원가입
                </b-button>
            </div>
        </div>

    </section>
</template>
<script setup>
import Logo from '@/components/image/Logo.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
    router.push('/login')
}

const goToSignIn = () => {
    router.push('/sign-up')
}
</script>
<style>

.intro-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.logo-wrapper {
    margin-bottom: 50px;
}


</style>
