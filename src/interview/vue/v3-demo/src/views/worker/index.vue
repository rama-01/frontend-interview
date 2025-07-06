<template>
    <div>
        <el-alert title="web worker使用示例" type="success" />
        <div>1. 耗时任务计算</div>
        <div>result1: {{ result1 }}</div>
        <div>time1: {{ time1 }}</div>
        <div>result2: {{ result2 }}</div>
        <div>time2: {{ time2 }}</div>
        <div>improvement: {{ improvement }}</div>
        <el-button @click="startWorker">开始worker计算</el-button>
        <el-button @click="startMainTread">主线程计算</el-button>
        <el-button @click="clearResult">清空</el-button>

        <el-divider />
        <div>2. 图像处理</div>
        <canvas ref="canvas" />

        <el-divider />
        <el-alert title="service worker使用示例" type="success" />
    </div>
</template>

<script setup lang="ts">
import cat from '@/assets/image/cat.jpeg'

const result1 = ref<number | null>(null)
const result2 = ref<number | null>(null)
const time1 = ref<number | null>(null)
const time2 = ref<number | null>(null)
const improvement = ref<number | null>(null)
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
    handleImage()
})

// 1. 耗时计算任务
const numbers = Array.from({length: 10000000}, (_, i) => i + 1)

const startWorker = () => {
    const worker = new Worker(
        new URL('@/utils/worker/math.ts', import.meta.url),
        {
            type: 'module'
        }
    )
    const dataArray = new Float64Array(numbers)
    const startTime = performance.now()
    worker.postMessage(dataArray.buffer, [dataArray.buffer])
    worker.onmessage = (event) => {
        time1.value = performance.now() - startTime
        result1.value = event.data
    }
    worker.onerror = (error) => {
        console.error('Worker error:', error)
    }
}

const startMainTread = () => {
    const startTime = performance.now()
    result2.value = numbers.reduce((acc, cur) => acc + cur * cur * cur, 0)
    time2.value = performance.now() - startTime
    improvement.value = Math.round(
        ((time1.value - time2.value) / time1.value) * 100
    )
}

const clearResult = () => {
    result1.value = null
    result2.value = null
    time1.value = null
    time2.value = null
    improvement.value = null
}

// 2. 图像处理
const handleImage = () => {
    const ctx = canvas.value.getContext('2d')
    const image = new Image()
    image.src = cat
    image.onload = () => {
        ctx.drawImage(image, 0, 0)
        const imageData = ctx.getImageData(
            0,
            0,
            canvas.value.width,
            canvas.value.height
        )
        const worker = new Worker(
            new URL('@/utils/worker/image.ts', import.meta.url),
            {
                type: 'module'
            }
        )
        worker.postMessage(imageData)
        worker.onmessage = function (e) {
            ctx.putImageData(e.data, 0, 0)
        }
        worker.onerror = function (e) {
            console.error('Worker 处理图像出错:', e.message)
        }
    }
}


</script>

<style scoped lang="scss"></style>
