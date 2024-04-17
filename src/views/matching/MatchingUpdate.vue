<template>
    <div style='width: 100%'>
        <div class='main-title'>매칭 수정</div>
        <div class='d-flex flex-row justify-content-end'>
            <button class='btn btn-danger' @click='cancel'>취소</button>
            <button class='btn btn-danger' style='margin-left: 1rem' @click='deleteMatching'>매칭 삭제</button>
            <button class='btn btn-success' style='margin-left: 1rem' @click='save'>저장</button>
        </div>

        <div class='mt-2'>
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
                            <option value='delivery'>배달</option>
                            <option value='buy'>공동구매</option>
                            <option value='meeting'>모임</option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='date'>매칭 마감 날짜 선택</label>
                        <input type='date' id='date' v-model='date' class='form-control'>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='number'>인원 선택 (최대 10명) 현재 {{ this.status_number }}명</label>
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
                        <br>
                        <label for='content' style='margin-bottom: 1rem'>내용</label>
                        <br>
                        <textarea
                            id='content'
                            v-model='content'
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

import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const date = ref(new Date().toISOString().substr(0, 10))
const categoryDropdown = ref('delivery')
const numberDropdown = ref('1')
const content = ref('')
const status_number = ref('')

const router = useRouter()

const fetchData = async () => {
    let id = router.currentRoute.value.params.id
    // id = 1;
    try {
        const response = await axios.get(`http://localhost:3000/insert/${id}`)
        const data = response.data

        title.value = data.title
        date.value = data.date
        categoryDropdown.value = data.category
        numberDropdown.value = data.limit_number
        content.value = data.content
        status_number.value = data.status_number
    } catch (error) {
        console.error('Failed to fetch data:', error)
    }
}

onMounted(() => {
    fetchData()
})

const save = async () => {
    const id = router.currentRoute.value.params.id

    const updatedData = {
        id: id,
        title: title.value,
        date: date.value,
        category: categoryDropdown.value,
        limit_number: numberDropdown.value,
        status_number: status_number.value,
        content: content.value,
    }

    try {
        const response = await axios.put(`http://localhost:3000/insert/${id}`, updatedData)
        alert('저장되었습니다.')
        console.log(response)
    } catch (error) {
        console.error('Failed to update data:', error)
        alert('데이터를 수정하는 데 실패했습니다.')
    }
}

const cancel = () => {
    router.go(-1)
}

const deleteMatching = async () => {
    let id = router.currentRoute.value.params.id
    // id = 1;

    try {
        const response = await axios.delete(`http://localhost:3000/insert/${id}`)
        alert('매칭이 삭제되었습니다.')
        console.log(response)
        await router.push('/') // 삭제 후 홈페이지로 이동
    } catch (error) {
        console.error('Failed to delete data:', error)
        alert('매칭을 삭제하는 데 실패했습니다.')
    }
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
