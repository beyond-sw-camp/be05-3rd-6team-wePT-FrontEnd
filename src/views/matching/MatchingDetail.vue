<template>
    <section style='width: 100%'>
        <div class='main-title'>매칭 상세</div>
        <div class='card mb-3'>
            <div class='card-body'>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>카테고리:</div>
                    <div class='col-md-9 col-6'>{{ ret.matchingCategory }}</div>
                </div>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>제목:</div>
                    <div class='col-md-9 col-6'>{{ ret.matchingTitle }}</div>
                </div>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>작성일:</div>
                    <div class='col-md-9 col-6'>{{ ret.matchingCreateAt }}</div>
                </div>
                <div class='row mb-2'>
                    <div class='col-md-3 col-6 font-weight-bold'>주최자 ID:</div>
                    <div class='col-md-9 col-6'>{{ ret.matchingId }}</div>
                </div>
                <div class='row'>
                    <div class='col-md-3 col-6 font-weight-bold'>인원 수:</div>
                    <div class='col-md-9 col-6'>{{ ret.matchingCurrentHead }} / {{ ret.matchingLimitHead }}</div>
                </div>
            </div>
        </div>

        <div class='card'>
            <div class='card-header'>
                게시글 내용
            </div>
            <div class='card-body'>
                <p class='card-text'>{{ ret.matchingContent }}</p>
            </div>
        </div>

        <div class='card'>
            <div class='card-header'>
                참가 신청자 목록
            </div>
            <div class='card-body'>
                <p class='card-text' v-for='param in joinNickname' :key='param'>
                    {{ param }}
                </p>
            </div>
        </div>

        <div class='text-center my-4 button-wrapper '>
            <button type='button' class='btn btn-success mr-2' @click='applyMatching'>참가 신청</button>
            <button type='button' class='btn btn-danger' @click='cancelMatching'>참가 취소</button>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue'
import { addComment, deleteComment, fetchMatchingDetail, getUserNicknamesByMatchingId } from '@/stores/firestore.js'
import { useAuthStore } from '@/stores/auth.js'

const params = ref({})
const ret = ref({})
const joinNickname = ref([])

const props = defineProps({
    id: Number,
    matchingId: Number,
    matchingTitle: String,
    matchingCreatedAt: Number,
    matchingCategory: String,
    matchingCurrentHead: Number,
    matchingLimitHead: Number,
    matchingContent: String,
    matchingDoneYn: Boolean,
})

const findUserEmail = async () => {
    return await useAuthStore().user.email
}

const matchingId = Number(props.id)

const getUserNickname = async (matchingId) => {
    const res = await getUserNicknamesByMatchingId(matchingId)
    console.log('nickname', res)
    joinNickname.value = res
}

const getMatchingDetail = async (matchingId) => {
    params.value = await fetchMatchingDetail(matchingId)
    console.log(params.value)
    ret.value = params.value[0]
}

const applyMatching = async () => {
    const userEmail = await findUserEmail() // Wait for the promise to be fulfilled and get the result
    await addComment(userEmail, matchingId)
}

const cancelMatching = async () => {
    const userEmail = await findUserEmail()
    await deleteComment(userEmail, matchingId)
}

const checkConditions = () => {
}

getUserNickname(matchingId)
getMatchingDetail(matchingId)

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
