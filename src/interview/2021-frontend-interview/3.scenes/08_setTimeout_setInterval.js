/* setInterval可能的缺陷：
setInterval 的作⽤是每隔⼀段指定时间执⾏⼀个函数，但是这个执⾏不是真的到了时间⽴即执⾏，它真
正的作⽤是每隔⼀段时间将事件加⼊事件队列中去，只有当当前的执⾏栈为空的时候，才能去从事件队
列中取出事件执⾏。所以可能会出现这样的情况，就是当前执⾏栈执⾏的时间很⻓，导致事件队列⾥边
积累多个定时器加⼊的事件，当执⾏栈结束的时候，这些事件会依次执⾏，因此就不能到间隔⼀段时间
执⾏的效果。 */

// 使用setTimeout来模拟setInterval可以确保只有当一个事件结束了，才会开启另一个定时器事件，从而解决了上述问题
function mySetInterval(fn, timeout) {
    // 控制器，控制定时器是否执行
    const timer = {
        flag: true
    }
    const interval = () => {
        if (timer.flag) {
            fn()
            setTimeout(interval, timeout);
        }
    }
    // 开启定时器
    setTimeout(interval, timeout)
    // return timer
}

mySetInterval(() => console.log('hello'), 1000)