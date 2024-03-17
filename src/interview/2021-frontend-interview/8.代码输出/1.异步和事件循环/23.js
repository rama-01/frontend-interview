async function async1() {
    await async2();  //如果async函数中抛出了错误，就会终⽌错误结果，不会继续向下执⾏。

    console.log('async1');
    return 'async1 success'
}
async function async2() {
    return new Promise((resolve, reject) => {
        console.log('async2')
        reject('error')
    })
}
async1().then(res => console.log(res))

// 改进
async function async1() {
    await Promise.reject('error!!!').catch(e => console.log(e))  //捕获async函数中的错误
    console.log('async1');
    return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
