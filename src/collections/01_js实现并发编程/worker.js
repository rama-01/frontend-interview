process.on('message', (message) => {
    const filename = message;
    console.log('开始下载' + filename + '...');
    const time_to_download = Math.floor(Math.random() * 6) + 5; // 模拟下载时间 5-10 秒
    setTimeout(() => {
        console.log(filename + '下载完成! 耗费了' + time_to_download + '秒');
        process.send(time_to_download); // 将下载完成的时间发送回主进程
    }, time_to_download * 1000);
});
