<template>
    <ModalProvider>
        <!-- route.meta.layout이 있는 경우 해당 레이아웃으로 RouterView를 감싸고, 없는 경우 RouterView만 렌더링. -->
        <component :is="$route.meta.layout || 'div'">
            <RouterView />
        </component>
    </ModalProvider>

</template>
<script setup>
import { RouterView } from 'vue-router'
import ModalProvider from '@/provider/ModalProvider.vue'
</script>

<style scoped>
</style>
