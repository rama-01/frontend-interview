const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
    // 执行new操作符时，立即执行的代码块
    constructor(executor) {
        this.state = PENDING  //promise实例状态
        this.value = undefined  //成功状态的值
        this.reason = undefined  //失败状态的值

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            // 状态为PENDING时才可以更新状态，因为promise状态改变只有两种可能
            if (this.state === PENDING) {
                this.state = RESOLVED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    // Promise.then()
    then(onResolved, onRejected) {
        if (this.state === RESOLVED) {
            onResolved(this.value)
        }
        if (this.state === REJECTED) {
            onRejected(this.reason)
        }

        // 如果状态为PENDING，需要保存成功或者失败的回调；等待状态确定后，依次执行对应的函数
        // 即是说将状态改变后的回调放入执行器函数，等待异步任务执行完成后，状态改变，此时就会执行对应的状态的回调
        if (this.state === PENDING) {
            this.onResolvedCallbacks.push(() => onResolved(this.value))
            this.onRejectedCallbacks.push(() => onRejected(this.reason))
        }
    }
}

/* const promise2 = new Promise((resolve, reject) => {
    // 传入一个异步操作
    setTimeout(() => {
        resolve('成功');
    }, 1000);
}).then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
) */

// 测试链式调用及值穿透
const promise = new Promise((resolve, reject) => {
    reject('失败');
}).then().then().then(data => {
    console.log(data);
}, err => {
    console.log('err', err);
})

// TypeError: onRejected is not a function at Promise.then