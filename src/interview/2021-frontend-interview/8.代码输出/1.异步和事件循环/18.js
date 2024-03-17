async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log("async2");
}
async1();
console.log('start')

// 这⾥可以理解为await后⾯的语句相当于放到了new Promise中，下⼀⾏及之后的语句相当于放在
// Promise.then中。