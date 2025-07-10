<template>
    <div class="app_main">
        <el-alert title="长列表优化、虚拟滚动" type="success" />
        <h3>第三方库实现</h3>
        <!-- <RecycleScroller
            class="scroller"
            :items="items"
            :item-size="50"
            :emitUpdate="true"
            @update="update"
        >
            <template v-slot="{item}">
                <div class="user">
                    {{ item.title }}---
                    <h4>{{ item.id }}</h4>
                </div>
            </template>
        </RecycleScroller> -->
        <DynamicScroller
            class="scroller"
            :items="items"
            :item-size="50"
            :emitUpdate="true"
            @update="update">
            <template v-slot="{item, active}">
                <DynamicScrollerItem
                    :item="item"
                    :active="active"
                    :key="item.id">
                    <div class="user">
                        {{ item.title }}---
                        <h4>{{ item.id }}</h4>
                    </div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
        <el-divider />
        <h3>原生实现</h3>
        <div id="container" ref="containerRef" @scroll="handleScroll">
            <!-- 占位用容器撑起滚动条 -->
            <div
                id="phantom"
                ref="phantom"
                :style="{height: totalHeight + 'px'}"></div>
            <!-- 实际渲染可视区域数据 -->
            <div
                id="visible"
                ref="visible"
                :style="{transform: `translateY(${offset}px)`}">
                <div
                    v-for="item in visibleData"
                    :key="item.id"
                    :style="{height: itemHeight + 'px'}">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <el-alert title="异步组件" type="success" />
        <el-button type="primary" @click="showAsyncComponent">
            展示异步组件
        </el-button>
        <!-- <Suspense>
            <template #default>
                <AsyncElTable />
            </template>
            <template #fallback>
                <div>加载中...</div>
            </template>
        </Suspense> -->

        <AsyncElTable v-if="isShowAsyncComponent" />
        <el-alert title="按钮点击优化" type="success" />
        <el-button type="primary" @click="next => handleClickBtn(next)">测试重复点击</el-button>
    </div>
</template>

<script setup lang="ts">
import type {ListItem} from '@/types/optimize'

const items = ref<ListItem[]>([])
const isShowAsyncComponent = ref(false)

let isLoading = false
const initData = () => {
    items.value = Array.from({length: 1000}, (_, i) => ({
        title: `标题${i + 1}`,
        id: i + 1
    }))
}

initData()

const update = (_, end: number) => {
    if (!isLoading && end === items.value.length) {
        new Promise((resolve) => {
            isLoading = true
            setTimeout(() => {
                const data = Array.from({length: 10}, (_, i) => ({
                    title: `标题${end + i + 1}`,
                    id: end + i + 1
                }))
                resolve(data)
                isLoading = false
            }, 1000)
        }).then((data: ListItem[]) => {
            items.value = [...items.value, ...data]
        })
    }
}

// 异步组件
const AsyncElTable = defineAsyncComponent({
    loader: () => import('@/component/ElTable.vue'),
    delay: 30000
})

const showAsyncComponent = () => (isShowAsyncComponent.value = true)

// 虚拟滚动
const containerRef = ref(null)
const startIndex = ref(0)
const visibleData = ref<ListItem[]>([])
const maxCount = ref(0)

const itemHeight = 20

const totalHeight = computed(() => items.value.length * itemHeight)
const offset = computed(() => startIndex.value * itemHeight)

// debugger
onMounted(() => {
    maxCount.value = Math.ceil(containerRef.value?.clientHeight / itemHeight)
})

watchEffect(() => {
    visibleData.value = items.value.slice(
        startIndex.value,
        startIndex.value + maxCount.value
    )
})

const handleScroll = () => {
    startIndex.value = Math.floor(containerRef.value.scrollTop / itemHeight)
}

// 按钮重复点击
const handleClickBtn = (next) => {

}
</script>

<style scoped lang="scss">
.scroller {
    height: 300px; // 外部容器的高度
    // overflow: auto;
    background-color: rgba(0, 0, 0, 0.1);
}

.user {
    height: 50px; // 每个容器的高度
    padding: 0 12px;
    display: flex;
    align-items: center;
}

// 虚拟滚动原生实现
#container {
    height: 200px; /* 设置固定高度，超出部分滚动 */
    overflow-y: auto;
    position: relative;
    border: 1px solid #ccc;
}
#phantom {
    height: 0; /* 最终高度将被 JS 设置 */
}
#visible {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
