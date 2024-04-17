<template>
    <section class='main-section'>
        <div class='main-title' style='text-align: center'>매칭을 선택하세요</div>
        <div class='sub-title'>해당 영역에 맞는 매칭 목록으로 이동합니다 :)</div>
        <MatchingTypeCard :goToService='goToService' />
        <button @click='goToMyPage' class='my-page-button'>
            <font-awesome-icon icon='comment-dots' />
            <span>MY</span>
        </button>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MatchingTypeCard from '@/components/matching/MatchingTypeCard.vue'

const router = useRouter()

const goToService = (service) => {
    router.push({ name: 'Matching', params: { service } })
}

const goToMyPage = () => {
    router.push('/my-page')
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

.my-page-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.my-page-button:hover {
    background-color: #45a049;
}

.my-page-button span {
    font-size: 14px;
    margin-left: 4px;
}

.my-page-button font-awesome-icon {
    font-size: 1.2rem;
}
</style>
