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
            <li class='nav-item' :class="{ active: activeTab === 'created-matching' }"
                @click="setActiveTab('created-matching')">
                생성한 매칭
            </li>
            <li class='nav-item' :class="{ active: activeTab === 'participated-matching' }"
                @click="setActiveTab('participated-matching')">
                참여한 매칭
            </li>
        </ul>

        <div class='card-container-wrapper'>
            <div class='card-container' :class="{'show': activeTab === 'created-matching'}">
                <b-card v-for='item in created_matching_data' :key='item.index'
                        :title='item.category'
                        class='mb-4 main-card'>
                    <p class='card-text'>모집 중: {{ item.on_recruiting ? '예' : '아니오' }}</p>
                    <p class='card-text'>참여 인원 / 인원 제한: ( {{ item.applied }} / {{ item.head_count_limit }} )</p>
                    <p class='card-text'>생성일시: {{ item.created_at }}</p>
                    <p class='card-text'>수정일시: {{ item.revised_at }}</p>
                </b-card>
            </div>

            <div class='card-container' :class="{'show': activeTab === 'participated-matching'}">
                <b-card v-for='item in participated_matching_data' :key='item.id'
                        :title='item.category'
                        class='mb-4 main-card'>
                    <p class='card-text'>모집 중: {{ item.on_recruiting ? '예' : '아니오' }}</p>
                    <p class='card-text'>참여 인원 / 인원 제한: ( {{ item.applied }} / {{ item.head_count_limit }} )</p>
                    <p class='card-text'>참여 여부: {{ item.participated_completed ? '완료' : '진행 중' }}</p>
                </b-card>
            </div>
            <div style='height: 20px' />
        </div>
    </section>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const created_matching_data = ref([])
const participated_matching_data = ref([])

// hamburger 관련 ref
const menuOpen = ref(false)
const activeTab = ref('created-matching')

// style
const dynamicHeight = ref('')

onMounted(() => {
    getCreatedMatchingData()
    getParticipateMatchingData()
})

onUnmounted(() => {
    window.removeEventListener('resize', calculateHeight)
})

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


const getCreatedMatchingData = () => {
    fetch('http://localhost:3000/created-matching')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            created_matching_data.value = data
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })
}


const getParticipateMatchingData = () => {
    fetch('http://localhost:3000/participated-matching')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            participated_matching_data.value = data
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })
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

    ::-webkit-scrollbar {
        display: none;
    }
}

.card-container {
    display: none;
    overflow-y: auto;
    max-height: 700px;
    padding: 1rem;
}

.main-card {
    color: var(--text-color);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
}

.card-container.show {
    display: block;
    width: 100%;
}
</style>
