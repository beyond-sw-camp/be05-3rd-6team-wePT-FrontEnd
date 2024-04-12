<template>
    <div>
        <b-button :style='style'>{{ text }}</b-button>
    </div>
</template>
<script setup>
/*TODO: 제거 예정 || 사용 주의 */
const props = defineProps({
    style: {
        type: String,
        default: 'button-primary',
    },
    text: {
        type: String,
        default: 'button text',
    },
})


</script>
<style scoped>

.button-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-secondary {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
}

.btn-primary--ten-percent {
    background-color: var(--primary--ten-percent);
    border-color: var(--primary--ten-percent);
}

</style>
