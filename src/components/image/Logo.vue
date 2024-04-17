<template>
    <div class='logo-container'>
        <img :src='src' :alt='altText' class='logo-image' />
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        default: 'Logo',
    },
})
</script>

<style scoped>
.logo-container {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    border-radius: 30%;
}

.logo-image {
    max-width: 100%;
    height: auto;
}
</style>
