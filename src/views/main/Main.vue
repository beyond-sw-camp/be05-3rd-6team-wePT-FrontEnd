<template>
    <section class='main-section'>
        <div class='main-title' style='text-align: center'>매칭을 선택하세요</div>
        <div class='sub-title'>해당 영역에 맞는 매칭 목록으로 이동합니다 :)</div>
        <MatchingTypeCard :goToService='goToService' />
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MatchingTypeCard from '@/components/matching/MatchingTypeCard.vue'

const router = useRouter()

const goToService = (service) => {
    router.push({ name: 'Matching', params: { service } })
}
</script>

<style scoped>
.main-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sub-title {
    text-align: center;
    margin-top: 10px;
    font-size: 1.3rem;
    font-weight: 500;
    background-image: linear-gradient(to left, #87CEEB, #38b036);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    word-break: keep-all;
    white-space: pre-wrap;
}

</style>
