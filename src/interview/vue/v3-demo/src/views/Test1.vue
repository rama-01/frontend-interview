<template>
    <div class="app-main">
        <div class="start_record_control" @click="handleStartRecordProcess">
            <el-button type="primary" data-action="start">录音开启</el-button>
            <el-button type="primary" data-action="pause">暂停</el-button>
            <el-button type="primary" data-action="resume">恢复</el-button>
            <el-button type="primary" data-action="end">录音停止</el-button>
        </div>
        <el-divider />
        <div class="record_data_display">
            <div class="record_data_item">
                <div class="record_time">{{ duration }}</div>
                <div class="record_data_item_title">录音时长(秒)</div>
            </div>
        </div>
        <el-divider />
        <div class="record_wave">
            <div class="start_record_wave">
                <canvas ref="sCanvas" />
            </div>
            <div class="play_record_wave">
                <canvas ref="pCanvas" />
            </div>
        </div>
        <el-divider />
        <div class="play_record_control" @click="handlePlayRecordProcess">
            <el-button type="info" data-action="play">录音播放</el-button>
            <el-button type="info" data-action="pause">暂停播放</el-button>
            <el-button type="info" data-action="resume">恢复播放</el-button>
            <el-button type="info" data-action="stop">停止播放</el-button>
            <el-button type="info" data-action="destroy">销毁实例</el-button>
        </div>
        <el-divider />
    </div>
</template>

<script setup lang="ts">
import Recorder from '@/utils/recorderEnhancer'

const duration = ref(0)
const sCanvas = ref<HTMLCanvasElement>()
const pCanvas = ref<HTMLCanvasElement>()

let recorder = null
let playTimer = null
let drawPlayId = null
let drawRecordId = null
let sCtx = null
let pCtx = null

onMounted(() => {
    sCtx = sCanvas.value.getContext('2d')
    pCtx = pCanvas.value.getContext('2d')
})

onUnmounted(() => {
    drawPlayId && cancelAnimationFrame(drawPlayId)
    drawRecordId && cancelAnimationFrame(drawRecordId)
})
// start record control
const handleStartRecordProcess = (event: Event) => {
    const target = (event.target as Element).closest('button')
    const action = target.dataset.action

    if (!action) return
    switch (action) {
        case 'start':
            startRecord()
            break
        case 'pause':
            pauseRecord()
            break
        case 'resume':
            resumeRecord()
            break
        case 'end':
            endRecord()
            break
        default:
            break
    }
}

const startRecord = () => {
    clearPlay()

    if (!recorder) {
        recorder = new Recorder()
        recorder.onprogress = (payload) => {
            duration.value = payload.duration.toFixed(5)
        }
        recorder.onplayend = () => {
            stopDrawPlay()
        }
    } else {
        recorder.stop()
    }
    console.log(recorder.start)
    recorder
        .start()
        .then(() => {})
        .catch(() => {})

    drawRecord()
}

const clearPlay = () => {
    if (playTimer) {
        clearInterval(playTimer)
        playTimer = null
    }
    if (drawRecordId) {
        cancelAnimationFrame(drawRecordId)
        drawRecordId = null
    }
    stopDrawPlay()
}

const drawRecord = () => {
    // 用requestAnimationFrame稳定60fps绘制
    drawRecordId = requestAnimationFrame(drawRecord)

    // 实时获取音频大小数据
    let dataArray = recorder.getRecordAnalyseData(),
        bufferLength = dataArray.length

    // 填充背景色
    sCtx.fillStyle = 'rgb(200, 200, 200)'
    sCtx.fillRect(0, 0, sCanvas.value.width, sCanvas.value.height)

    // 设定波形绘制颜色
    sCtx.lineWidth = 2
    sCtx.strokeStyle = 'rgb(0, 0, 0)'

    sCtx.beginPath()

    var sliceWidth = (sCanvas.value.width * 1.0) / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
        x = 0 // 绘制点的x轴位置

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = (v * sCanvas.value.height) / 2

        if (i === 0) {
            // 第一个点
            sCtx.moveTo(x, y)
        } else {
            // 剩余的点
            sCtx.lineTo(x, y)
        }
        // 依次平移，绘制所有点
        x += sliceWidth
    }

    sCtx.lineTo(sCanvas.value.width, sCanvas.value.height / 2)
    sCtx.stroke()
}

const stopDrawPlay = () => {
    drawPlayId && cancelAnimationFrame(drawPlayId)
    drawPlayId = null
}

const pauseRecord = () => {
    if (recorder) {
        recorder.pause()
        drawRecordId && cancelAnimationFrame(drawRecordId)
        drawRecordId = null
    }
}

const resumeRecord = () => {
    recorder && recorder.resume()
    drawRecord()
}

const endRecord = () => {
    recorder && recorder.stop()
    drawRecordId && cancelAnimationFrame(drawRecordId)
    drawRecordId = null
}

// play record process
const handlePlayRecordProcess = (event: Event) => {
    const target = (event.target as Element).closest('button')
    const action = target.dataset.action

    if (!action) return
    switch (action) {
        case 'play':
            playRecord()
            break
        case 'pause':
            pausePlay()
            break
        case 'resume':
            resumePlay()
            break
        case 'stop':
            stopPlay()
            break
        case 'destroy':
            destroyRecord()
            break
        default:
            break
    }
}

const playRecord = () => {
    recorder && recorder.play()
    drawRecordId && cancelAnimationFrame(drawRecordId)
    drawRecordId = null
    recorder && drawPlay()
}

const drawPlay = () => {
    // 用requestAnimationFrame稳定60fps绘制
    drawPlayId = requestAnimationFrame(drawPlay)

    // 实时获取音频大小数据
    let dataArray = recorder.getPlayAnalyseData(),
        bufferLength = dataArray.length

    // 填充背景色
    pCtx.fillStyle = 'rgb(200, 200, 200)'
    pCtx.fillRect(0, 0, pCanvas.value.width, pCanvas.value.height)

    // 设定波形绘制颜色
    pCtx.lineWidth = 2
    pCtx.strokeStyle = 'rgb(0, 0, 0)'

    pCtx.beginPath()

    var sliceWidth = (pCanvas.value.width * 1.0) / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
        x = 0 // 绘制点的x轴位置

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = (v * pCanvas.value.height) / 2

        if (i === 0) {
            // 第一个点
            pCtx.moveTo(x, y)
        } else {
            // 剩余的点
            pCtx.lineTo(x, y)
        }
        // 依次平移，绘制所有点
        x += sliceWidth
    }

    pCtx.lineTo(pCanvas.value.width, pCanvas.value.height / 2)
    pCtx.stroke()
}

const pausePlay = () => {
    stopDrawPlay()
    recorder && recorder.pausePlay()
}

const resumePlay = () => {
    recorder && recorder.resumePlay()
    drawPlay()
}

const stopPlay = () => {
    recorder && recorder.stopPlay()
    clearPlay()
    stopDrawPlay()
}

const destroyRecord = () => {
    if (recorder) {
        recorder.destroy().then(() => {
            recorder = null
            drawRecordId && cancelAnimationFrame(drawRecordId)
            stopDrawPlay()
        })
    }
}
</script>

<style scoped lang="scss">
.app-main {
    .start_record_control {
        padding: 24px 20px 0px;
    }

    .record_data_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        height: 100px;
        padding: 20px;
    }

    .play_record_control {
        padding: 0px 20px;
    }

    .record_wave {
        display: flex;
        min-height: 200px;
        .start_record_wave,
        .play_record_wave {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
