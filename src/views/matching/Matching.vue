<template>
    <section>
        <div class='main-title'>{{ serviceName }} 서비스</div>
        <div class='button-wrapper'>
            <button class='post-button' @click='onWritePost'>게시글 작성</button>
        </div>

        <div>
            <MatchingTable v-if='service === DELIVERY' :service='DELIVERY' />
            <MatchingTable v-else-if='service === GROUP_BUYING' :service='GROUP_BUYING' />
            <MatchingTable v-else :service='GATHERING' />
        </div>
    </section>
</template>


<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { matchingType } from '@/lib/const.js'
import MatchingTable from '@/components/matching/MatchingTable.vue'
import { useRoute, useRouter } from 'vue-router'

const { DELIVERY, GROUP_BUYING, GATHERING, GROUP_BUYING_KR, GATHERING_KR, DELIVERY_KR } = matchingType
const route = useRoute()
const router = useRouter()
const props = defineProps({
    service: String,
})
const serviceName = ref('')

onMounted(() => {
    onHandleServiceName()
})

const onHandleServiceName = () => {
    if (route.params.service === DELIVERY) {
        serviceName.value = DELIVERY_KR
    } else if (route.params.service === GROUP_BUYING) {
        serviceName.value = GROUP_BUYING_KR
    } else {
        serviceName.value = GATHERING_KR
    }
}

const onWritePost = () => {
    router.push('/matching/insert')
}

</script>

<style scoped>
.button-wrapper {
    display: flex;
    justify-content: flex-end;
}

.post-button {
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background: linear-gradient(145deg, #32a92f, #2e974b);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.post-button:hover {
    background: linear-gradient(145deg, #2e974b, #32a92f);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.post-button:focus {
    box-shadow: 0 0 0 2px rgba(50, 169, 47, 0.5);
}
</style>
