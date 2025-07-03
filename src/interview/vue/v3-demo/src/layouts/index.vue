<template>
    <div class="app-container">
        <navigationBar />
        <router-view v-slot="{Component, route}">
            <transition name="el-fade-in" mode="out-in">
                <keep-alive>
                    <component :is="Component" :key="route.path" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import navigationBar from './components/navigationBar.vue'


</script>

<style scoped lang="scss"></style>
