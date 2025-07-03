### 1. oem-pc

##### 1.1 项目描述

该项目是C端教师小程序的PC版本，用于教师发布、预览、查阅作业。

##### 1.2 要点总结

###### 1.2.1 hooks

useMedia:  管理音频/视频播放状态的自定义hook，实现了媒体播放控制，进度条模拟，元数据管理等功能

useCountdown: 实现倒计时功能的自定义hook，支持倒计时控制，时间间隔控制，动态重置

1.2.2 音频处理


### 3. 教师小程序 bingo-teacher

3.2 音视频相关

initAudio, playAudio, pauseAudio, destroyAudio; handleVideoPlay, destroyVideo

initAudio：初始化音频时，创建音频上下文，设置src，autoplay，
