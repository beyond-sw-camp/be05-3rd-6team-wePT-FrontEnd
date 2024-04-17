<template>
    <section style='overflow: hidden;'>
        <div class='sub-header'>
            <div class='main-title'>마이 페이지</div>
            <div :class="{'hamburger': true, 'menu-open': menuOpen}" @click='toggleMenu'>
                <div class='bar'></div>
                <div class='bar'></div>
                <div class='bar'></div>
            </div>
        </div>
        <ul class='nav' :class="{'nav-open': menuOpen }">
            <li class='nav-item' :class="{ active: activeTab === 'createdMatch' }"
                @click="setActiveTab('createdMatch')">
                생성한 매칭
            </li>
            <li class='nav-item' :class="{ active: activeTab === 'joinedMatch' }"
                @click="setActiveTab('joinedMatch')">
                참여한 매칭
            </li>
        </ul>

        <div class='card-container-wrapper'>
            <div class='card-container' :class="{'show': activeTab === 'createdMatch'}">
                <b-card v-for='create in createMatchingWithCategory' :key='create.index'
                        :title='create.categoryName'
                        class='mb-4 main-card'>
                    <p class='card-text'>모집 여부: {{ create.matchingDoneYn ? '모집 완료' : '진행 중' }}</p>
                    <p class='card-text'>참여 인원 / 인원 제한: ( {{ create.matchingCurrentHead }} /
                        {{ create.matchingLimitHead }} )</p>
                    <p class='card-text'>생성 일시: {{ create.matchingCreatedAt }}</p>
                    <p class='card-text'>수정 일시: {{ create.matchingUpdateAt }}</p>
                </b-card>
            </div>

            <div class='card-container' :class="{'show': activeTab === 'joinedMatch'}">
                <b-card v-for='join in joinedMatchingWithCategory' :key='join.id'
                        :title='join.categoryName'
                        class='mb-4 main-card'>
                    <p class='card-text'>모집 여부: {{ join.matchingDoneYn ? '진행 중' : '모집 완료' }}</p>
                    <p class='card-text'>참여 인원 / 인원 제한: ( {{ join.matchingCurrentHead }} / {{ join.matchingLimitHead }}
                        )</p>
                </b-card>
            </div>
            <div style='height: 20px' />
        </div>
    </section>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

//store
import { useAuthStore } from '@/stores/auth.js'
import { FindMyJoinMatchingId, FindMyMatching } from '@/stores/firestore.js'

// const
import { categoryMap } from '@/lib/const.js'

const router = useRouter()
// data ref
const createMatchingData = ref([])
const joinedMatchingData = ref([])

// style ref
const menuOpen = ref(false)
const activeTab = ref('createdMatch')
const dynamicHeight = ref('')

onMounted(async () => {
    const userEmail = useAuthStore().user?.email
    if (userEmail) {
        createMatchingData.value = await FindMyMatching(userEmail)
        joinedMatchingData.value = await FindMyJoinMatchingId(userEmail)
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', calculateHeight)
})

const createMatchingWithCategory = computed(() => {
    return createMatchingData.value.map(data => ({
        ...data,
        categoryName: categoryMap[data.matchingCategory] || 'Unknown',
    }))
})

const joinedMatchingWithCategory = computed(() => {
    console.log(':::::: Mypage joinMatchingData ::::::::: ', joinedMatchingData.value)
    // TODO: joinedMatchinData에 관한 값 들고 오기
    return joinedMatchingData.value.map(data => ({
        ...data,
        categoryName: categoryMap[data.matchingCategory] || 'Unknown',
    }))
})

/* style 관련 function */
const calculateHeight = () => {
    const subHeaderHeight = document.querySelector('.sub-header').offsetHeight
    const availableHeight = window.innerHeight - subHeaderHeight
    dynamicHeight.value = `${availableHeight}px`
    document.documentElement.style.setProperty('--dynamic-height', dynamicHeight.value)
}

const setActiveTab = (tab) => {
    activeTab.value = tab
    calculateHeight()
}
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.sub-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.hamburger {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 35px;
    height: 30px;
}

.bar {
    height: 4px;
    background: var(--primary-color);
    transition: all 0.3s ease;
}

.menu-open .bar:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
}

.menu-open .bar:nth-child(2) {
    opacity: 0;
}

.menu-open .bar:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
}

.menu-icon:hover .bar {
    background-color: var(--primary--ten-percent);
}

.nav {
    position: fixed;
    top: 6rem;
    right: -10rem;
    width: 10rem;
    height: 10vh;
    transition: right 0.3s ease-in-out;
    z-index: 998;
}

.nav-open {
    right: 0;
}

.nav-item {
    display: block;
    color: var(--text-color);
    padding: 10px 16px;
    width: 100%;
    border-bottom: 1px solid var(--primary-color);
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    margin-bottom: 1rem;
    background-color: white;
}

.nav-item:hover {
    background-color: var(--primary--ten-percent);
}

.nav-item.active {
    background-image: linear-gradient(to left, #87CEEB, #38b036);
}

.card-container-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-container {
    display: none;
    overflow-y: auto;
    padding: 1rem;

    ::-webkit-scrollbar {
        display: none;
    }
}

.main-card {
    color: var(--text-color);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.main-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

.card-container.show {
    display: block;
    width: 100%;
}
</style>
