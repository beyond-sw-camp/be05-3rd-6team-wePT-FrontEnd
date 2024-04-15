<template>
    <div style='width: 100dvw'>
        <div class='main-title'>매칭 생성</div>
        <div class='d-flex flex-row justify-content-end'>
            <button class='btn btn-danger' @click='cancel'>취소</button>
            <button class='btn btn-success' style='margin-left: 1rem' @click='save'>저장</button>
        </div>


        <div class='mt-1 w-100'>
            <div class='row'>
                <div>
                    <div class='form-group w-100'>
                        <label for='title'>제목</label>
                        <input type='text' id='title' v-model='title' class='form-control' placeholder='제목을 입력하세요.'>
                    </div>
                    <div class='form-group'>
                        <br>
                        <label for='category'>카테고리 선택</label>
                        <select id='category' v-model='categoryDropdown' class='form-control'>
                            <option value='delivery'>배달</option>
                            <option value='buy'>공동구매</option>
                            <option value='meeting'>번개</option>
                            <option value='etc'>기타</option>
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
                        <br>
                        <label for='content'>내용</label>
                        <br>
                        <textarea id='content' v-model='content' class='form-control' rows='5'
                                  placeholder='내용을 입력하세요.'></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const router = useRouter()
const modalHandler = inject('modalHandler')

// 반응적인 상태를 생성합니다.
const title = ref('')
const date = ref(new Date().toISOString().substr(0, 10))
const categoryDropdown = ref('delivery')
const numberDropdown = ref('1')
const content = ref('')

const goBack = () => {
    router.go(-1)
}

const save = () => {
    const newData = {
        id: new Date().getTime(),
        title: title.value, // ref로 생성한 상태에는 .value로 접근합니다.
        date: date.value,
        category: categoryDropdown.value,
        limit_number: numberDropdown.value,
        status_number: 0,
        content: content.value,
    }

    axios.post('http://localhost:3000/insert', newData)
        .then(response => {
            modalHandler.openSuccess('데이터 저장 성공', '데이터가 성공적으로 저장되었습니다.')
            console.log(response)
            // 저장 후에 입력 필드를 비웁니다.
            title.value = ''
            date.value = new Date().toISOString().substr(0, 10)
            categoryDropdown.value = 'delivery'
            numberDropdown.value = '1'
            content.value = ''
        })
        .catch(error => {
            console.error('Failed to save data:', error)
            modalHandler.open('저장 실패', '데이터를 저장하는 데 실패했습니다.', false)
        })
}

const cancel = () => {
    router.go(-1)
}


</script>


<style scoped>
/* scoped 속성을 사용하여 컴포넌트 스타일링 */
.color {
    color: var(--primary-color);
}

.navbar a {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
