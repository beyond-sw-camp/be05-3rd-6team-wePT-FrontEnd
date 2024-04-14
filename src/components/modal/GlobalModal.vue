<template>
    <transition name='modal'>
        <div class='modal fade' :class="{ 'show d-block': isOpen }" tabindex='-1'>
            <div class='modal-dialog modal-dialog-centered modal-sm'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>{{ title }}</h5>
                        <button type='button' class='btn-close' @click="$emit('close')"></button>
                    </div>
                    <div class='modal-body'>
                        <p>{{ content }}</p>
                    </div>
                    <div class='modal-footer'>
                        <b-button type='button' v-if='!successButton' variant='danger' size='sm'
                                  @click="$emit('close')">닫기
                        </b-button>
                        <b-button v-if='successButton' type='button' variant='success' size='sm'
                                  @click="$emit('close')">닫기
                        </b-button>
                        <b-button v-if='buttonDisplay' type='button' variant='success' size='sm' @click='buttonAction'>
                            {{ buttonTitle }}
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>기


<script setup>
// TODO: variant 문제 해결하
import { defineEmits, defineProps, inject, watch } from 'vue'

const emits = defineEmits(['close'])
const modalHandler = inject('modalHandler')

const props = defineProps({
    isOpen: Boolean,
    title: String,
    content: String,
    buttonTitle: String,
    buttonDisplay: Boolean,
    buttonAction: Function,
    successButton: Boolean,
})

watch(() => props.buttonDisplay, (value) => {
    console.log(':::::::::::::::', value)
})

</script>
<style>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.show {
    opacity: 1;
}

.modal-dialog {
    transform: scale(0.8);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    opacity: 0;
}

.modal.show .modal-dialog {
    transform: scale(1);
    opacity: 1;
}

</style>
