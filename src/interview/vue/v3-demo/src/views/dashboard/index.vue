<template>
    <div class="app_main">
        <span v-copy="text" @click="handleCopy">复制用户id</span>
    </div>
</template>

<script setup lang="ts">
const text = 'hello world!!!'

const {proxy} = getCurrentInstance() as any
const handleCopy = () => {
    proxy.$copy(text)
}
</script>

<style scoped lang="scss"></style>
