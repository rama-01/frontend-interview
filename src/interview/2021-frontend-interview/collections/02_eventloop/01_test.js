console.log('script start')

async function async1() {
    await async2() 
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})

console.log('script end')

// 新版输出(新版的chrome浏览器优化了,await变得更快了,输出为)

// script start => async2 end => Promise => script end => async1 end => promise1 => promise2  => setTimeout
// 注意一个点await async2() 执行完后面的任务才会注册到微任务中
 
 
// 旧版输出如下，但是请继续看完本文下面的注意那里，新版有改动
// script start => async2 end => Promise => script end => promise1 => promise2 => **async1 end** => setTimeout
// script start
// async1 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout