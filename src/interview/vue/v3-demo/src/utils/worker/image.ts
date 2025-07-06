// image.ts - 浅红色滤镜实现
self.onmessage = function (e) {
    const imageData = e.data
    const data = imageData.data

    // 定义浅红色参数
    const RED_INTENSITY = 1.1 // 红色增强系数
    const GREEN_ATTENUATION = 0.6 // 绿色衰减系数
    const BLUE_ATTENUATION = 0.7 // 蓝色衰减系数
    const LIGHTNESS_ADJUST = 20 // 亮度调整值

    for (let i = 0; i < data.length; i += 4) {
        // 增强红色通道
        data[i] = Math.min(255, data[i] * RED_INTENSITY + LIGHTNESS_ADJUST)

        // 减弱绿色通道
        data[i + 1] = Math.max(0, data[i + 1] * GREEN_ATTENUATION)

        // 减弱蓝色通道
        data[i + 2] = Math.max(0, data[i + 2] * BLUE_ATTENUATION)

        // 保持alpha通道不变
        // data[i+3] = data[i+3]
    }

    self.postMessage(imageData)
}
