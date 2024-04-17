<template>
    <div class='matching-container'>
        <div class='matching-card' v-for='match in matching' :key='match.matchingId'
             @click='changeRouter(match.matchingId)'>
            <h3 class='matching-title'>{{ match.matchingTitle }}</h3>
            <p class='matching-info'>댓글 수: {{ match.countReply }}</p>
            <p class='matching-info'>조회 수: 0</p>
            <p class='matching-info'>작성자: {{ match.Nickname }}</p>
            <p class='matching-info'>작성 일자: {{ match.matchingDate }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    service: {
        type: String,
        required: true,
    },
})

const matching = ref([
        {
            'matchingIdx': 1,
            'matchingId': 1,
            'matchingTitle': 'test1',
            'matchingDate': '2021-10-10',
            'Nickname': 'test1',
            'countReply': 0,
        },
        {
            'matchingIdx': 2,
            'matchingId': 2,
            'matchingTitle': 'test2',
            'matchingDate': '2021-10-11',
            'Nickname': 'test2',
            'countReply': 1,
        },
        {
            'matchingIdx': 3,
            'matchingId': 3,
            'matchingTitle': 'test3',
            'matchingDate': '2021-10-12',
            'Nickname': 'test3',
            'countReply': 2,
        },
        {
            'matchingIdx': 4,
            'matchingId': 4,
            'matchingTitle': 'test4',
            'matchingDate': '2021-10-13',
            'Nickname': 'test4',
            'countReply': 3,
        },
        {
            'matchingIdx': 5,
            'matchingId': 5,
            'matchingTitle': 'test5',
            'matchingDate': '2021-10-14',
            'Nickname': 'test5',
            'countReply': 4,
        },
        {
            'matchingIdx': 6,
            'matchingId': 6,
            'matchingTitle': 'test6',
            'matchingDate': '2021-10-15',
            'Nickname': 'test6',
            'countReply': 5,
        },
        {
            'matchingIdx': 7,
            'matchingId': 7,
            'matchingTitle': 'test7',
            'matchingDate': '2021-10-16',
            'Nickname': 'test7',
            'countReply': 6,
        },
        {
            'matchingIdx': 8,
            'matchingId': 8,
            'matchingTitle': 'test8',
            'matchingDate': '2021-10-17',
            'Nickname': 'test8',
            'countReply': 7,
        },
        {
            'matchingIdx': 9,
            'matchingId': 9,
            'matchingTitle': 'test9',
            'matchingDate': '2021-10-18',
            'Nickname': 'test9',
            'countReply': 8,
        },
        {
            'matchingIdx': 10,
            'matchingId': 10,
            'matchingTitle': 'test10',
            'matchingDate': '2021-10-19',
            'Nickname': 'test10',
            'countReply': 9,
        },
    ],
)

const changeRouter = (id) => {
    const matchingId = id
    console.log(matchingId)
    router.push(`/matching/detail/${matchingId}`)
}

</script>

<style scoped>
.matching-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
}

.matching-card {
    background: linear-gradient(135deg, #6ec1e4, #9673e8);
    border: none;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 20px;
    width: calc(30% - 40px);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.5s;
    color: #ffffff;
    position: relative;
    overflow: hidden;
}

.matching-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: transform 0.5s ease;
    transform: rotate(30deg);
    pointer-events: none;
}

.matching-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.matching-card:hover::before {
    transform: translateX(20%) rotate(30deg);
}

.matching-title {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 10px;
}

.matching-info {
    font-size: 1em;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .matching-card {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .matching-card {
        width: 95%;
    }
}
</style>
