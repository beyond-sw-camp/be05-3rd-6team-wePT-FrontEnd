<template>
    <Header />
    <div class='auth-layout'>
        <router-view />
    </div>
</template>
<script setup>
import Header from '@/components/layout/Header.vue'
</script>
<style scoped>
.auth-layout {
    padding: 1rem;
}
</style>
