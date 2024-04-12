<template>
    <GlobalModal
        :isOpen='modalHandler.isOpen.value'
        :title='modalHandler.title.value'
        :content='modalHandler.content.value'
        :button-title='modalHandler.buttonTitle.value'
        :buttonDisplay='modalHandler.buttonDisplay.value'
        :buttonAction='modalHandler.buttonAction.value'
        :successButton='modalHandler.successButton.value'
        @close='modalHandler.close'
    />
    <slot />
</template>

<script setup>
import { provide, ref } from 'vue'
import GlobalModal from '@/components/modal/GlobalModal.vue'

/**
 * @description 모달창을 관리하는 provider
 * inject를 통해 자식 컴포넌트에서 사용할 수 있도록 제공 ( const modalHandler = inject('modalHandler') )
 * modalHandler의 open 함수를 통해 어느 컴포넌트에서든 모달창을 띄울 수 있음.
 */

const modalHandler = {
    isOpen: ref(false),
    title: ref(''),
    content: ref(''),
    buttonTitle: ref('확인'),
    successButton: ref(false),
    buttonDisplay: ref(true),
    buttonAction: ref(() => {
    }),

    /**
     * 모달을 전체 커스텀하고 싶을 때 사용
     * @param title
     * @param content
     * @param buttonDisplay // 버튼 표시 여부 true인 경우 2개, false 인 경우는 1개를
     * @param buttonTitle
     * @param buttonAction
     */
    open(title, content, buttonDisplay, buttonTitle, buttonAction) {
        this.isOpen.value = true
        this.successButton.value = false
        this.title.value = title
        this.content.value = content
        this.buttonDisplay.value = buttonDisplay
        this.buttonTitle.value = buttonTitle
        this.buttonAction.value = buttonAction
    },

    /**
     * 모달 중 성공한 경우로 모달을 생성하고 싶을 때 사용, 단 버튼 타입은 'success'로 설정
     * @param title
     * @param content
     */
    openSuccess(title, content) {
        this.isOpen.value = true
        this.title.value = title
        this.content.value = content
        this.successButton.value = true
        this.buttonDisplay = false
    },

    close() {
        modalHandler.isOpen.value = false
    },
}

provide('modalHandler', modalHandler)
</script>
