async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {  // 状态为pending，所以之后代码不会执行
        console.log('promise1')
    })
    console.log('async1 success');
    return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')