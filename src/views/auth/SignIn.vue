<template>
    <section>
        <div class='main-title'>회원가입</div>
        <div class='form-wrapper'>
            <div class='input-wrapper'>
                <div class='m-2'>이메일</div>
                <b-form-input class='mb-2 input-something' :state='isRightEmail' v-model='params.email'
                              placeholder='이메일을 입력하세요.' />
                <div class='d-flex flex-col mt-3'>
                    <b-button v-if='isSend' class='ms-auto button-primary' style='width: 100%' @click='onSendEmail'>재인증
                    </b-button>
                    <b-button v-if='!isSend' class='ms-auto button-primary'
                              style='margin-left: 20px; width: 100%' @click='onSendEmail'>이메일 인증하기
                    </b-button>
                </div>
                <div v-if='!isCert' class='status-message not-certified'>
                    <i class='fas fa-times-circle'></i> 인증이 완료되지 않았습니다.
                </div>
                <div v-if='isCert' class='status-message certified'>
                    <i class='fas fa-check-circle'></i> 인증이 완료되었습니다.
                </div>
            </div>
            <div class='input-wrapper'>
                <div class='m-2'>비밀번호</div>
                <b-form-input type='password' v-model='params.password' :state='isSame' placeholder='비밀번호를 입력하세요.'
                              class='mb-2'></b-form-input>
                <b-form-input type='password' v-model='params.passwordCheck' :state='isSame'
                              placeholder='비밀번호를 다시 입력하세요.'></b-form-input>
                <b-button class='mt-3 ms-auto button-primary' size='sm' @click='checkPassword'>일치 확인하기</b-button>
                <div v-if='!isSame' class='status-message not-certified'>
                    <i class='fas fa-times-circle'></i> 비밀번호가 일치하지 않습니다.
                </div>
                <div v-if='isSame' class='status-message certified'>
                    <i class='fas fa-check-circle'></i> 비밀번호가 일치합니다.
                </div>
            </div>

            <div class='input-wrapper'>
                <div class='m-2'>닉네임</div>
                <b-form-input v-model='params.nickname' placeholder='닉네임을 입력하세요.' class='mb-2'></b-form-input>
            </div>
        </div>
        <div class='two-button-wrapper' style='margin-top: 30px; gap: 50%'>
            <b-button variant='danger' @click='goIntro'>취소</b-button>
            <b-button class='button-primary' @click='onSubmit'>가입하기</b-button>
        </div>
    </section>
</template>
<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { emailCheck } from '@/lib/util.js'
import { auth } from '@/firebase/index.js'
import {
    fetchSignInMethodsForEmail,
    isSignInWithEmailLink,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    updatePassword,
    updateProfile,
} from 'firebase/auth'


const router = useRouter()
const modalHandler = inject('modalHandler')
const params = ref({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
})

// 이메일 형식 체크
const isRightEmail = ref()
// 이메일 전송여부
const isSend = ref(false)
// 비밀번호 일치여부
const isSame = ref()
// 이메일 인증 확인 여부
const isCert = ref()

const actionCodeSettings = {
    url: 'http://localhost:5173/sign-in',
    handleCodeInApp: true,
}

onMounted(() => {
    params.value.email = window.localStorage.getItem('emailForSignIn') || ''
    checkEmailVerification()
})

watch(() => params.value.email, (newEmail) => {
    isRightEmail.value = emailCheck(newEmail)
    if (newEmail) {
        window.localStorage.setItem('emailForSignIn', newEmail)
    }
})

const onSendEmail = async () => {
    if (!isRightEmail.value) {
        modalHandler.open('이메일 형식 오류', '이메일이 아닙니다', false)
        return
    }
    try {
        await validateDuplicateEmail()

        await sendSignInLinkToEmail(auth, params.value.email, actionCodeSettings)
        window.localStorage.setItem('emailForSignIn', params.value.email)
        modalHandler.openSuccess('인증 메일 발송', '인증 링크가 발송되었습니다. 메일을 확인해주세요.')

        isSend.value = true
    } catch (error) {
        modalHandler.open('인증 메일 발송 실패', '인증 메일 발송에 실패했습니다.', false)
        console.error('Error sending email link', error)
    }
}


const onSubmit = async () => {
    validateCertification()

    for (let key in params.value) {
        if (!params.value[key]) {
            modalHandler.open('미입력', `값이 비어있습니다. 전부 입력해주세요.`, false)
            return
        }
    }

    try {
        await updatePassword(auth.currentUser, params.value.password)
        await updateProfile(auth.currentUser, {
            displayName: params.value.nickname,
        })

        modalHandler.open('가입 성공', '회원가입에 성공했습니다.', true, '로그인 하기', () => {
            router.push('/login')
            modalHandler.close()
        })
    } catch (e) {
        console.error(e)
    }
}

const checkEmailVerification = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')

        if (!email) {
            email = window.prompt('Please provide your email for confirmation')
        }

        try {
            const result = await signInWithEmailLink(auth, email, window.location.href)
            window.localStorage.removeItem('emailForSignIn')
            isCert.value = true
        } catch (error) {
            modalHandler.open('인증 실패', '이메일 인증에 실패했습니다.', false)
            console.error('Error processing email link', error)
        }
    }
}

const checkPassword = () => {
    validateCertification()
    if (!params.value.password || !params.value.passwordCheck) {
        modalHandler.open('비밀번호 미입력', '비밀번호를 입력해주세요.', false)
        return
    }
    if (params.value.password === params.value.passwordCheck) {
        isSame.value = true
        modalHandler.openSuccess('비밀번호 일치', '비밀번호가 일치합니다.')
    } else {
        modalHandler.open('비밀번호 불일치', '비밀번호가 일치하지 않습니다.', false)
    }
}

const validateDuplicateEmail = async () => {
    const users = await fetchSignInMethodsForEmail(auth, params.value.email)
    if (users.length > 0) {
        modalHandler.open('이메일 중복', '이미 가입된 이메일입니다.', false)
    }
}

const validateCertification = () => {
    if (!isCert.value) {
        modalHandler.open('인증 필요', '이메일 인증부터 완료해주세요.', false)
    }
}

const goIntro = () => {
    router.push('/')
}
</script>

<style scoped>
.button-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.status-message {
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    animation: fadeIn 0.5s;
}

.not-certified {
    color: var(--danger-color, #dc3545);
    background-color: var(--danger-bg, #f8d7da);
}

.certified {
    color: var(--success-color, #28a745);
    background-color: var(--success-bg, #d4edda);
}

.status-message i {
    margin-right: 10px;
    text-align: center;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
