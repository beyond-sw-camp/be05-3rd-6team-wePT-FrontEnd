<template>
    <nav class='navbar sticky-top navbar-light main-header'>
        <div class='container-fluid'>
            <a @click='goBack'>
                <font-awesome-icon :icon='["fas", "chevron-left"]' style='color:black; font-size: 20px;' />
            </a>
        </div>
    </nav>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.go(-1)
}
</script>
<style>
.main-header {
    background: linear-gradient(135deg, #32a029 0%, #38b036 50%, #3fc143 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
}

.navbar a {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
