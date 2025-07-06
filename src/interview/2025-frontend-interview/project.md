## 1. 项目经历

### 1. oem-pc

##### 1.1 项目描述

该项目是C端教师小程序的PC版本，用于教师发布、预览、查阅作业。

##### 1.2 要点总结

###### 1.2.1 hooks

useMedia:  管理音频/视频播放状态的自定义hook，实现了媒体播放控制，进度条模拟，元数据管理等功能

useCountdown: 实现倒计时功能的自定义hook，支持倒计时控制，时间间隔控制，动态重置

1.2.2 音频处理

### 2. 教师小程序 bingo-teacher

2.2 音视频相关

initAudio, playAudio, pauseAudio, destroyAudio; handleVideoPlay, destroyVideo

initAudio：初始化音频时，创建音频上下文，设置src，autoplay，


## 2. 情景问题

#### 2.1 无感刷新，防止重复请求

```js
axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken && !isTokenExpired(accessToken)) { // 检查 Token 是否过期‌
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
```

```js
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) { // 捕获 Token 失效状态码‌data="citationList"}
      return handleTokenRefresh(error); // 进入刷新流程
    }
    return Promise.reject(error);
  }
);
```

```js
let isRefreshing = false; // 标记是否正在刷新
let requestQueue = [];     // 待重试请求队列
 
const handleTokenRefresh = async (error) => {
  const { config } = error;
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const newToken = await axios.post('/refresh', {
        refreshToken: localStorage.getItem('refresh_token')
      }); // 使用 Refresh Token 获取新 Access Token‌ data="citationList"}
  
      localStorage.setItem('access_token', newToken);
      // 重试队列中的请求
      requestQueue.forEach(cb => cb(newToken));
      requestQueue = [];
      return axios(config); // 重试原请求‌
    } catch (e) {
      // 刷新失败则跳转登录页‌
      window.location.href = '/login';
    } finally {
      isRefreshing = false;
    }
  } else {
    // 将待重试请求加入队列
    return new Promise(resolve => {
      requestQueue.push(token => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(axios(config));
      });
    });
  }
};
```

#### 2.2 大文件上传与断点续传

#### 2.3 浏览器缓存与service worker

#### 2.4 requestAnimationFrame使用场景
