<template>
    <div>
        <el-button @click="handleLogin">login</el-button>
    </div>
</template>

<script setup lang='ts'>
import { setToken } from '@/utils/cookies'

const router = useRouter()
const handleLogin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  }).then(() => {
    setToken('ramayana')
    router.push('/')
  })
}
</script>

<style scoped lang='scss'>

</style>