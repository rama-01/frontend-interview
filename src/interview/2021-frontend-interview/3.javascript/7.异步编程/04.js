function testAsy(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 3000)
    }
    )
}
async function testAwt() {
    let result = await testAsy('hello world');
    console.log(result); // 3秒钟之后出现hello world
}
testAwt();
console.log('cug') //⽴即输出cug

// 因为async函数返回一个promise值，所以async可以用于等待一个async函数，或者promise对象，注意它等待的是前者的返回值，如果是普通函数调用或者直接量，那么也可正常执行；
// async函数调用不会造成阻塞，它内部所有的阻塞都被封装到一个promise对象中异步执行，所以遇到await，会暂停async的执行，而先执行主线程的任务
