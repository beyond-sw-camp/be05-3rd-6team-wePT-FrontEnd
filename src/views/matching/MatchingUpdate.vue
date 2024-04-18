<template>
    <div style='width: 100%'>
        <div class='main-title'>매칭 수정</div>
        <div class='d-flex flex-row justify-content-end'>
            <button class='btn btn-danger' @click='goBack'>취소</button>
            <button class='btn btn-danger' style='margin-left: 1rem' @click='onHandleClick'>매칭 삭제</button>
            <button class='btn btn-success' style='margin-left: 1rem' @click='onUpdate'>저장</button>
        </div>

        <div class='mt-2'>
            <div class='row'>
                <div>
                    <div class='form-group'>
                        <label for='title'>제목</label>
                        <input type='text' id='title' v-model='params.matchingTitle' class='form-control'
                               placeholder='제목을 입력하세요.'>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='category'>카테고리 선택</label>
                        <select id='category' v-model='params.matchingCategory' class='form-control'>
                            <option value='1'>배달</option>
                            <option value='2'>공동구매</option>
                            <option value='3'>모임</option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='date'>매칭 마감 날짜 선택</label>
                        <input type='date' id='date' v-model='params.matchingEndDate' class='form-control'>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='number'>인원 선택 (최대 10명) 현재 {{ params.matchingCurrentHead }}명</label>
                        <select id='number' v-model='params.matchingLimitHead' class='form-control'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='content' style='margin-bottom: 1rem'>내용</label>
                        <br>
                        <textarea
                            id='content'
                            v-model='params.matchingContent'
                            class='form-control'
                            rows='5'
                            placeholder='내용을 입력하세요.'
                            style='width: 100%; height: 230px; overflow-y: auto;'
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchDeleteMatching, fetchMatchingDetail, fetchUpdateMatching } from '@/api/api.js'
import { useAuthStore } from '@/stores/auth.js'

const props = defineProps({
    id: Number,
})
const router = useRouter()
const params = ref({})
const modalHandler = inject('modalHandler')

const matchingId = Number(props.id)

onMounted(() => {
    console.log('MatchingUpdate  matching id:::::', props.id)
    getMatchingData()
})

const getMatchingData = async () => {
    const response = await fetchMatchingDetail(matchingId)
    console.log(':::::: getMatchingData :::::: ', response[0])

    params.value = response[0]
}

const onUpdate = async () => {
    params.value.matchingUpdateAt = new Date().toISOString().substr(0, 10)

    console.log(params.value)
    const userEmail = await findUserEmail()

    try {
        await fetchUpdateMatching(userEmail, matchingId, params.value).then(() => {
            modalHandler.openSuccess('매칭 수정 완료', '매칭이 수정되었습니다.')
            goBack()
        })
    } catch (error) {
        console.error('error', error)
    }
}

const onHandleClick = () => {
    modalHandler.open('매칭 삭제', '정말 삭제하시겠습니까?', true, '삭제', onDelete)
}

const onDelete = async () => {
    try {
        await fetchDeleteMatching(await findUserEmail(), matchingId).then(() => {
            modalHandler.close()
            goBack()
        })
    } catch (error) {
        console.error('error', error)
    }
}

const findUserEmail = async () => {
    return await useAuthStore().user.email
}

const goBack = () => {
    router.go(-1)
}


</script>

<style scoped>
.color {
    color: #38b036;
}

.main-header {
    background: linear-gradient(135deg, #32a029 0%, #38b036 50%, #3fc143 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
}

.navbar a {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
