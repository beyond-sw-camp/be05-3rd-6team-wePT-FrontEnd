<template>
    <section style='width: 100%'>
        <div class='main-title'>매칭 생성</div>
        <div class='d-flex flex-row justify-content-end'>
            <button class='btn btn-danger' @click='cancel'>취소</button>
            <button class='btn btn-success' style='margin-left: 1rem' @click='save'>저장</button>
        </div>


        <div class='mt-1'>
            <div class='row'>
                <div>
                    <div class='form-group'>
                        <label for='title'>제목</label>
                        <input type='text' id='title' v-model='title' class='form-control' placeholder='제목을 입력하세요.'>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='category'>카테고리 선택</label>
                        <select id='category' v-model='categoryDropdown' class='form-control'>
                            <option value='1'>배달</option>
                            <option value='2'>공동구매</option>
                            <option value='3'>모임</option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='date'>매칭 마감 날짜 선택</label>
                        <input type='date' id='date' v-model='date' class='form-control'>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='number'>인원 선택 (최대 10명)</label>
                        <select id='number' v-model='numberDropdown' class='form-control'>
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
                        <br />
                        <label for='content' style='margin-bottom: 1rem'>내용</label>
                        <textarea
                            id='content'
                            v-model='content'
                            class='form-control text-area-class'
                            rows='5'
                            placeholder='내용을 입력하세요.'
                            style='width: 100%; height: 230px; overflow-y: auto;'
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { inject, onMounted, ref } from 'vue'
import { addPost } from '@/api/api.js'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const modalHandler = inject('modalHandler')

// 반응적인 상태를 생성합니다.
const title = ref('')
const date = ref(new Date().toISOString().substr(0, 10))
const categoryDropdown = ref('delivery')
const numberDropdown = ref('1')
const content = ref('')
const matchingOwnerName = ref('')


onMounted(async () => {
    matchingOwnerName.value = await getMatchingOwnerName()

    console.log('=== matchingOwnerName ===', matchingOwnerName.value)
})

const findUserId = async () => {
    return await useAuthStore().user.email
}

const getMatchingOwnerName = async () => {
    console.log('=== getMatchingOwnerName ===', typeof (useAuthStore().user.providerData[0].displayName))
    return await useAuthStore().user.providerData[0].displayName
}

const save = async () => {
    const userId = await findUserId()
    const newData = {
        matchingId: new Date().getTime(),
        matchingTitle: title.value,
        matchingEndDate: date.value,
        matchingCategory: Number(categoryDropdown.value),
        matchingLimitHead: numberDropdown.value,
        matchingCurrentHead: 1,
        matchingContent: content.value,
        matchingCreateAt: new Date().toISOString().substr(0, 10),
        matchingDoneYn: false,
        matchingOwnerName: matchingOwnerName.value,
    }

    const addMatching = async (userId, newData) => {
        await addPost(userId, newData)
    }

    await addMatching(userId, newData)
}

const cancel = () => {
    router.go(-1)
}


</script>
<style>
/* scoped 속성을 사용하여 컴포넌트 스타일링 */
.color {
    color: var(--primary-color);
}

.navbar a {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

</style>
