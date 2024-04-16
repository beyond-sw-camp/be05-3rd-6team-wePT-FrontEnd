<template>
    <Header />
    <div class='matching-layout'>
        <router-view />
    </div>
</template>
<script setup>
import Header from '@/components/layout/Header.vue'
</script>
<style scoped>

.matching-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
}
</style>
