<template>
    <section>
        <div class='main-title'>비밀번호 찾기 및 재설정</div>
        <div class='sub-title'>비밀번호를 잊으셨나요?<br /> 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.</div>
        <div class='form-wrapper'>
            <b-form-input type='email' v-model='email' :state='isRightEmail' class='mb-4' placeholder='이메일을 입력해주세요.' />
            <b-button class='button-primary' @click='onHandleResetPassword'>비밀번호 재설정 이메일 보내기</b-button>
        </div>

    </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/index.js'
import { useToast } from 'vue-toastification'

// lib
import { emailCheck } from '@/lib/util.js'
import { authMessages } from '@/lib/const.js'

const toast = useToast()
const email = ref('')
const isRightEmail = ref()

const {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    MISSING_EMAIL,
    EMAIL_NOT_FOUND,
    INVALID_EMAIL,
} = authMessages

watch(() => email.value, (newEmail) => {
    isRightEmail.value = emailCheck(newEmail)
})

const onHandleResetPassword = async () => {
    validateEmail()

    try {
        await sendPasswordResetEmail(auth, email.value)
        toast.success(PASSWORD_RESET_SUCCESS, {
            position: 'bottom-right',
            timeout: 5000,
        })
    } catch (err) {
        console.error('Firebase error: ', err)
        console.error('Error code: ', err.code) // 에러 코드 확인
        console.error('Error message: ', err.message) // 에러 메시지 확인

        let errorMessage = PASSWORD_RESET_FAILED
        if (err.code === 'auth/user-not-found') {
            errorMessage = EMAIL_NOT_FOUND
        } else if (err.code === 'auth/invalid-email') {
            errorMessage = INVALID_EMAIL
        }
        toast.error(errorMessage, {
            position: 'bottom-right',
            timeout: 2000,
        })
    }
}

const validateEmail = () => {
    if (!email.value) {
        toast.error(MISSING_EMAIL, {
            position: 'bottom-right',
            timeout: 2000,
        })
        return
    }

    if (!isRightEmail.value) {
        toast.error(INVALID_EMAIL, {
            position: 'bottom-right',
            timeout: 2000,
        })
    }
}
</script>
<style scoped>
.sub-title {
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    font-size: 1.25rem;
    line-height: 1.6;
    text-align: center;
    word-break: keep-all;
    white-space: pre-wrap;
}

.form-wrapper {
    margin: 2rem 0;
}

.button-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}
</style>

