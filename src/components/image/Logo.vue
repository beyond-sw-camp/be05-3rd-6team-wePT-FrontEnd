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
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.logo-image {
    max-width: 100%;
    height: auto;
//object-fit: cover;
}
</style>
