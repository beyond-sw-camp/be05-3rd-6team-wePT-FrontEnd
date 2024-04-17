<template>
    <div>
        Main page
        {{users}}
    </div>
    <button @click='logout'>로그아웃</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { FindMyPost, deletePost } from '@/stores/firestore.js';

const { logout } = useAuthStore();
const users = ref([]);

const userId = 'teseuteu593@gmail.com'; // 사용자의 ID
const matchingId = 123123123;
// const postData = {
//     title: '수정 제목',
//     content: '수정 내용',
//     matchingId : matchingId,
//     // 필요한 경우 추가 데이터를 여기에 넣으세요
// };


const loadUsers = async () => {
  // deletePost(userId, matchingId);
  const FindPost = await FindMyPost("teseuteu593@gmail.com");
  users.value = FindPost;
};

onMounted(() => {
  loadUsers(); // 컴포넌트가 마운트되면 사용자 데이터를 가져옴
});
</script>

<style scoped></style>

