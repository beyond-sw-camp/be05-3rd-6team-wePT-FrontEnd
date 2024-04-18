<template>
    <div class='matching-container'>
        <div class='matching-card' v-for='match in matching' :key='match.matchingId'
             @click='changeRouter(match.matchingId)'>
            <h3 class='matching-title'>{{ match.matchingTitle }}</h3>
            <p class='matching-info'>댓글 수: {{ match.matchingStatusHeads }}</p>
            <!-- 참여자수로 데이터 넣음 -->
            <p class='matching-info'>조회 수: 0</p>
            <p class='matching-info'>작성자: {{ match.matchingId }}</p>
            <!-- matchingId로 수정 -->
            <p class='matching-info'>작성 일자: {{ match.matchingCreatedAt }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FindPosts } from '@/api/api.js'

const router = useRouter()
const props = defineProps({
    service: {
        type: String,
        required: true,
    },
})

const FindmatchingCategory = () => {
    if (props.service === 'delivery') {
        return 1
    } else if (props.service === 'groupBuying') {
        return 2
    } else {
        return 3
    }
}

const matching = ref([])

const changeRouter = (id) => {
    const matchingId = id
    console.log(matchingId)
    router.push(`/matching/detail/${matchingId}`)
}

const matchingCategory = FindmatchingCategory()
const getMatchingBorad = async (matchingCategory) => {
    const matchingList = await FindPosts(matchingCategory)
    console.log(matchingList)
    matching.value = matchingList
}

getMatchingBorad(matchingCategory)
</script>

<style scoped>
.matching-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
}

.matching-card {
    background: linear-gradient(135deg, #6ec1e4, #9673e8);
    border: none;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 20px;
    width: calc(30% - 40px);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.5s;
    color: #ffffff;
    position: relative;
    overflow: hidden;
}

.matching-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: transform 0.5s ease;
    transform: rotate(30deg);
    pointer-events: none;
}

.matching-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.matching-card:hover::before {
    transform: translateX(20%) rotate(30deg);
}

.matching-title {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 10px;
}

.matching-info {
    font-size: 1em;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .matching-card {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .matching-card {
        width: 95%;
    }
}
</style>
