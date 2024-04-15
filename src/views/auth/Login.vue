<template>
    <section>
        <div class='main-title'>로그인</div>
        <div class='form-wrapper'>
            <div class='input-wrapper'>
                <div class='m-2'>이메일</div>
                <b-form-input type='text' v-model='params.email' placeholder='이메일을 입력하세요.'
                              class='mb-2' />
                <div class='m-2'>비밀번호</div>
                <b-form-input type='password' v-model='params.password' placeholder='비밀번호를 입력하세요.' />
                <b-button class='mt-5' style='background-color: var(--primary-color);
                           border-color: var(--primary-color);' @click='onSubmit'>로그인
                </b-button>
                <div class='mt-1 d-flex flex-row justify-content-center align-items-center gap-3'>
                    <div class='find-button' @click='showToast'>아이디 찾기</div>
                    <div>|</div>
                    <router-link to='/password-reset' class='find-button'>비밀번호 찾기</router-link>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { inject, ref } from 'vue'

import { useRouter } from 'vue-router'
import { auth } from '@/firebase/index.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useToast } from 'vue-toastification'


const router = useRouter()
const toast = useToast()
const modalHandler = inject('modalHandler')
const params = ref({
    email: '',
    password: '',
})

const onSubmit = async () => {
    validateParams()

    try {
        await signInWithEmailAndPassword(auth, params.value.email, params.value.password)
        await router.push('/main')
    } catch (error) {
        console.error('Login Error:', error)
        modalHandler.open('로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.', false)
    }
}

const validateParams = () => {
    if (!params.value.email) {
        modalHandler.open('이메일을 입력해주세요.', '이메일을 입력해주세요.', false)
        return
    }
    if (!params.value.password) {
        modalHandler.open('비밀번호를 입력해주세요.', '비밀번호를 입력해주세요.', false)
    }
}

const showToast = () => {
    toast.success('아이디는 가입하신 이메일입니다.', {
        position: 'bottom-right',
        timeout: 2000,
    })
}

</script>
<style>
.input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.find-button {
    text-decoration: underline;
    font-size: small;
    font-weight: 500;
    color: var(--primary-color);
}
</style>
