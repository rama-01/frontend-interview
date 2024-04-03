// async/await => promise




/* 2. 错误处理 */
// async/await使用try/catch捕获错误，而promise使用catch捕获错误

/* 3. 多个异步操作 */
const { performance } = require('perf_hooks');

function methodFactory(mode, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(mode + ' completed');
            resolve(mode);
        }, delay);
    });
}

const start = performance.now()

async function getResult() {
    const resultA = await methodFactory('methodA', 1000); // 1 秒
    const resultB = await methodFactory('methodB', 2000); // 2 秒
    const resultC = await methodFactory('methodC', 3000); // 3 秒
    console.log('Results:', resultA, resultB, resultC);
}

getResult().then(() => console.log(performance.now() - start))  // 总共需要 6 秒

function getResult2() {
    return Promise.all([
        methodFactory('methodA', 1000), // 1 秒
        methodFactory('methodB', 2000), // 2 秒
        methodFactory('methodC', 3000)  // 3 秒
    ])
}

const start1 = performance.now()
getResult2().then((res) => console.log(res, performance.now() - start1)); // 总共需要 3 秒


/* 4. 只需要完成最快的异步操作 */
// 使用async/await,仍然需要使用promise API
async function getResult4() {
    let result;
    try {
        result = await Promise.race([methodFactory('methodA', 1000),
        methodFactory('methodB', 2000),
        methodFactory('methodC', 3000)])
    } catch (error) {
        console.error('Error:', error);
    }
    console.log('Result:', result);
}
