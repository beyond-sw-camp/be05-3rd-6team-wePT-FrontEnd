<template>
    <section>
        <div class='main-title'>로그인</div>
        <div class='form-wrapper'>
            <div class='input-wrapper'>
                <div class='m-2'>이메일</div>
                <b-form-input type='password' v-model='params.email' placeholder='이메일을 입력하세요.'
                              class='mb-2'></b-form-input>
                <div class='m-2'>비밀번호</div>
                <b-form-input type='password' v-model='params.password' placeholder='비밀번호를 입력하세요.'></b-form-input>
                <b-button class='mt-3 ms-auto' style='background-color: var(--primary-color);
                           border-color: var(--primary-color);' @click='validateAndSubmit'>로그인
                </b-button>
            </div>
        </div>
    </section>
</template>
<script setup>
import { inject, ref } from 'vue'

const modalHandler = inject('modalHandler')
const params = ref({
    email: '',
    password: '',
})

const validateAndSubmit = () => {
    if (!params.value.email) {
        modalHandler.open('이메일을 입력해주세요.', '이메일을 입력해주세요.', false)
    }
    if (!params.value.password) {
        modalHandler.open('비밀번호를 입력해주세요.', '비밀번호를 입력해주세요.', false)
    }


    // TODO: 유효성 검증 로직 작성
    // API 호출

    // TODO: 메인페이지 이동
}


</script>
<style>
.input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}
</style>
