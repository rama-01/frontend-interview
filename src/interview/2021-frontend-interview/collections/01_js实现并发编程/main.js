const { fork } = require('child_process');

const start = Date.now();

const worker1 = fork('worker.js');
const worker2 = fork('worker.js');

worker1.send('Python从入门到住院.pdf');
worker2.send('Peking Hot.avi');

let count = 0;
worker1.on('message', (message) => {
    count++;
    if (count === 2) {
        const end = Date.now();
        console.log('总共耗费了' + (end - start) / 1000 + '秒.');
    }
});

worker2.on('message', (message) => {
    count++;
    if (count === 2) {
        const end = Date.now();
        console.log('总共耗费了' + (end - start) / 1000 + '秒.');
    }
});

// 以上程序子线程执行完毕后，主线程并没有退出