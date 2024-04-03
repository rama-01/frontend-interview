//#region 
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2')
// }
// console.log('script start');
// async1();
// console.log('script end')
//#endregion

// 使用promise改造以上代码
function async1() {
    console.log('async1 start')
    return async2().then(() => console.log('async1 end'))
}

function async2() {
    console.log('async2')
    return Promise.resolve()
}

console.log('script start')
async1()
console.log('script end')