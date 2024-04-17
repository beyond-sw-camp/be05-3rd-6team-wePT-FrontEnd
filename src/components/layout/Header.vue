<template>
    <nav class='navbar sticky-top navbar-light main-header'>
        <div class='container-fluid'>
            <a v-if='showBackButton' @click='goBack'>
                <font-awesome-icon :icon='["fas", "chevron-left"]' style='color:black; font-size: 20px;' />
            </a>
            <button v-if='showLogoutButton' @click='logout' class='logout-button'>
                로그아웃
            </button>
        </div>
    </nav>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = useRouter()
const route = useRoute()
const { logout } = useAuthStore()

/* 로그아웃 버튼을 보여 줄 path*/
const allowedPaths = ['/main', '/matching', '/my-page']


const showBackButton = computed(() => {
    return route.path !== '/main'
})

const showLogoutButton = computed(() => {
    return allowedPaths.some(path => route.path.includes(path))
})

const goBack = () => {
    router.go(-1)
}

</script>
<style>
.main-header {
    background: linear-gradient(135deg, #32a029 0%, #38b036 50%, #3fc143 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    display: flex;
    justify-content: flex-start;
    position: relative;
}

.navbar a {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    transition: color 0.3s, transform 0.3s;
}

.navbar a::before {
    content: '';
    display: block;
    width: 25px;
}

.navbar a:hover {
    transform: scale(1.2);
}

.navbar a + .logout-button {
    margin-left: 0;
}

.logout-button {
    margin-left: auto;
    margin-right: 1rem;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 16px; /* 패딩 추가 */
    border-radius: 10px; /* 둥근 테두리 */
    transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 */
}

.logout-button:hover {
    background-color: white;
    color: var(--primary-color);
    border-color: var(--primary-color);
}
</style>
