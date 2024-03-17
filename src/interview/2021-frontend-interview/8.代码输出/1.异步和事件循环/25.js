const async1 = async () => {
    console.log('async1');
    setTimeout(() => {
        console.log('timer1')
    }, 2000)
    await new Promise(resolve => {  //后面代码不会执行
        console.log('promise1')
    })
    console.log('async1 end')
    return 'async1 success'
}
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .catch(4)
    .then(res => console.log(res))
setTimeout(() => {
    console.log('timer2')
}, 1000)
