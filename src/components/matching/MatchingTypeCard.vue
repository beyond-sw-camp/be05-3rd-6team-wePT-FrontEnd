<template>
    <div class='matching-type-card'>
        <b-card class='b-card' :title='DELIVERY_KR + " 서비스"' @click='goToService(DELIVERY)'>
            <p class='card-text'>함께 배달을 시켜봐요</p>
        </b-card>
        <b-card class='b-card' :title='GROUP_BUYING_KR + " 서비스"' @click='goToService(GROUP_BUYING)'>
            <p class='card-text'>필요한 물건을 같이 구매해요</p>
        </b-card>
        <b-card class='b-card' :title='GATHERING_KR + " 서비스"' @click='goToService(GATHERING)'>
            <p class='card-text'>친목도모를 같이해요</p>
        </b-card>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { matchingType } from '@/lib/const.js'

const { DELIVERY, GROUP_BUYING, GATHERING, DELIVERY_KR, GATHERING_KR, GROUP_BUYING_KR } = matchingType

const props = defineProps({
    goToService: {
        type: Function,
        required: true,
    },
})

</script>

<style scoped>
.matching-type-card {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.b-card {
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #76c893, #6ec1e4);
    cursor: pointer;
    color: var(--text-color);
    margin: 2rem 0;
}

.b-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.b-card .card-text {
    color: #fff;
}
</style>
