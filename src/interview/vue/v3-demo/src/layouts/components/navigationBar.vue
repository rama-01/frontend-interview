<template>
    <div class="navigationBar">
        <el-button @click="handleLogout">logout</el-button>
    </div>
</template>

<script setup lang="ts">
import {removeToken} from '@/utils/cookies'

const router = useRouter()
const handleLogout = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    }).then(() => {
        removeToken()
        router.push('/login')
    })
}
</script>

<style scoped lang="scss">
.navigationBar {
    position: fixed;
    left: 0;
    top: 0;
    height: 70px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #eee;
}
</style>
