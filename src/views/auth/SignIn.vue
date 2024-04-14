<template>
    <section>
        <div class='main-title'>회원가입</div>
        <div class='form-wrapper'>
            <div class='input-wrapper'>
                <div class='m-2'>이메일</div>
                <b-form-input class='mb-2 input-something' :state='isRightEmail' v-model='params.email'
                              placeholder='이메일을 입력하세요.' />
                <b-form-input v-if='isSend' :state='isCert' v-model='certNumber' placeholder='인증번호를 입력하세요.' />
                <div class='d-flex flex-col mt-3'>
                    <b-button v-if='isSend' class='ms-auto button-primary' size='sm'>재인증</b-button>
                    <b-button :class="isSend ? 'button-primary' : 'ms-auto button-primary'" size='sm'
                              style='margin-left: 20px' @click='handleEmailButton'>이메일 인증하기
                    </b-button>

                </div>
            </div>
            <div class='input-wrapper'>
                <div class='m-2'>비밀번호</div>
                <b-form-input type='password' v-model='params.password' :state='isSame' placeholder='비밀번호를 입력하세요.'
                              class='mb-2'></b-form-input>
                <b-form-input type='password' v-model='params.passwordCheck' :state='isSame'
                              placeholder='비밀번호를 다시 입력하세요.'></b-form-input>
                <b-button class='mt-3 ms-auto button-primary' size='sm' @click='validatePassword'>일치 확인하기</b-button>
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
import { inject, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { emailCheck } from '@/lib/util.js'

const router = useRouter()
const modalHandler = inject('modalHandler')
const params = ref({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
})
// 인증번호
const certNumber = ref('')

// 이메일 형식 체크
const isRightEmail = ref()
// 이메일 전송여부
const isSend = ref(false)
// 비밀번호 일치여부
const isSame = ref()
// 이메일 인증 확인 여부
const isCert = ref()


watch(() => params.value.email, (newEmail) => {
    isRightEmail.value = emailCheck(newEmail)
})

const handleEmailButton = () => {
    isSend.value ? checkCertNumber() : sendEmail()
}

const sendEmail = () => {
    if (!isRightEmail.value) {
        modalHandler.open('이메일 형식 오류', '이메일이 아닙니다', false)
        return
    }
    // TODO: 이메일 중복 검사 로직 (API)
    // TODO: 이메일 인증 메일 발송 로직 (API) - true일 경우에만 isSend를 true로 변경
    isSend.value = true
}

// TODO: 인증번호 받아오는 로직 필요
const checkCertNumber = () => {
    if (!certNumber.value) {
        modalHandler.open('인증번호 미입력', '인증번호를 입력해주세요.', false)
        return
    }

    if (certNumber.value === '123123') {
        isCert.value = true
        modalHandler.openSuccess('인증 성공', '인증에 성공했습니다.')
    } else {
        modalHandler.open('인증 실패', '인증번호가 일치하지 않습니다.', false)
    }
}

const validatePassword = () => {
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

const onSubmit = () => {
    if (!isCert.value) {
        modalHandler.open('인증 필요', '이메일 인증을 진행해주세요.', false)
        return
    }

    for (let key in params.value) {
        if (!params.value[key]) {
            modalHandler.open('미입력', `값이 비어있습니다. 전부 입력해주세요.`, false)
            return
        }
    }

    // TODO: 폼 제출 로직
    console.log(':::::: success :::::::')

    modalHandler.open('가입 성공', '회원가입에 성공했습니다.', true, '로그인 하기', () => {
        router.push('/login')
        modalHandler.close()
    })
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

.input-something {

}

</style>
