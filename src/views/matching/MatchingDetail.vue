<template>
    <section style='width: 100%'>
        <div class='main-title'>매칭 상세</div>
        <div class='card mb-3'>
            <div class='card-body'>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>카테고리:</div>
                    <div class='col-md-9 col-6'>{{ params.matchingCategory }}</div>
                </div>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>제목:</div>
                    <div class='col-md-9 col-6'>{{ params.matchingTitle }}</div>
                </div>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>작성일:</div>
                    <div class='col-md-9 col-6'>{{ params.matchingCreateAt }}</div>
                </div>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>주최자:</div>
                    <div class='col-md-9 col-6'>{{ params.matchingOwnerName }}</div>
                </div>
                <div class='row'>
                    <div class='col-md-3 col-6 font-weight-bold'>인원 수:</div>
                    <div class='col-md-9 col-6'>{{ params.matchingCurrentHead }} / {{ params.matchingLimitHead }}</div>
                </div>
            </div>
        </div>

        <div class='card'>
            <div class='card-header'>
                게시글 내용
            </div>
            <div class='card-body'>
                <p class='card-text'>{{ params.matchingContent }}</p>
            </div>
        </div>

        <div class='card'>
            <div class='card-header'>
                참가 신청자 목록
            </div>
            <div class='card-body'>
                <p class='card-text' v-for='member in joinMember' :key='member'>
                    {{ member }}
                </p>
            </div>
        </div>

        <div v-if='isUserCreatedMatching && isGathering' class='text-center my-4 button-wrapper '>
            <button type='button' class='btn btn-success mr-2' @click='applyMatching'>참가 신청</button>
            <button type='button' class='btn btn-danger' @click='cancelMatching'>참가 취소</button>
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { fetchCancelJoin, fetchJoin, fetchMatchingDetail, findUserNicknamesByMatchingId } from '@/api/api.js'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const props = defineProps({
    id: Number,
})
const router = useRouter()
const params = ref({})
const joinMember = ref([])
const matchingId = Number(props.id)
const isUserCreatedMatching = ref(false)
const isGathering = ref(true)

onMounted(() => {
    getUserNickname(matchingId)
    getMatchingDetail(matchingId)

    if (params.value.matchingDoneYn) {
        isGathering.value = false
    }

    if (params.value.matchingOwnerName === findUseNickname()) {
        console.log('일치')
        isUserCreatedMatching.value = true
    }
})

const getMatchingDetail = async (matchingId) => {
    const response = await fetchMatchingDetail(matchingId)
    console.log(':::::: getMatchingDetail :::::: ', response[0])

    params.value = response[0]
}

const getUserNickname = async (matchingId) => {
    const response = await findUserNicknamesByMatchingId(matchingId)
    console.log('::::::: getUserNickname :::::::', response)

    joinMember.value = response
}


const findUserEmail = async () => {
    return await useAuthStore().user.email
}

const findUseNickname = async () => {
    return await useAuthStore().user.providerData[0].displayName
}

const applyMatching = async () => {
    const userEmail = await findUserEmail()
    await fetchJoin(userEmail, matchingId)
}

const cancelMatching = async () => {
    const userEmail = await findUserEmail()
    await fetchCancelJoin(userEmail, matchingId)
}
</script>
<style scoped>
.sub-title {
    width: 100%;
    font-size: 20px;
    color: var(--text-color);
}

.button-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.card {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    margin-bottom: 40px;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: var(--primary--ten-percent);
    cursor: pointer;
}

.card-body {
    transition: max-height 0.5s ease-in-out;
    overflow: hidden;
}

.card-header:hover + .card-body {
    max-height: 1000px; /* Adjust max height based on your content */
}

.btn-success,
.btn-danger {
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.btn-success:hover {
    background-color: rgba(56, 176, 54, 0.8);
    border-color: rgba(56, 176, 54, 0.8);
    color: white;
}

.btn-danger:hover {
    background-color: rgba(220, 53, 69, 0.8);
    border-color: rgba(220, 53, 69, 0.8);
    color: white;
}

@media (max-width: 768px) {
    .font-weight-bold {
        font-size: 14px;
    }

    .btn {
        font-size: 14px;
        padding: 0.75rem 1.25rem;
    }
}
</style>
