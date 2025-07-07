<template>
    <div class="app_main">
        <el-alert title="长列表优化、虚拟滚动" type="success" />
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
    </div>
</template>

<script setup lang="ts">
interface Item {
    title: string
    id: number
}

const items = ref<Array<Item>>([])
const isShowAsyncComponent = ref(false)

let isLoading = false
const initData = () => {
    items.value = Array.from({length: 10}, (_, i) => ({
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
        }).then((data: Item[]) => {
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
</style>
