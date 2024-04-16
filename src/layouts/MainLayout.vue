<template>
    <Header />
    <div class='main-layout'>
        <router-view />
    </div>
</template>
<script setup>
import Header from '@/components/layout/Header.vue'
</script>
<style scoped>
.main-layout {
    padding: 1rem;
    max-height: calc(100vh - 40px);
    overflow: hidden;
}
</style>
