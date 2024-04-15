<template>
    <div>
        Main page
    </div>
    <button @click='logout'>로그아웃</button>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth.js'

const { logout } = useAuthStore()

</script>
<style scoped></style>
