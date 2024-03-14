const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
    // 执行new操作符时，立即执行的代码块
    constructor(executor) {
        this.state = PENDING  //promise实例状态
        this.value = undefined  //成功状态的值
        this.reason = undefined  //失败状态的值

        const resolve = (value) => {
            // 状态为PENDING时才可以更新状态，因为promise状态改变只有两种可能
            if (this.state === PENDING) {
                this.state = RESOLVED
                this.value = value
            }
        }

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
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
    }
}

const promise = new Promise((resolve, reject) => {
    resolve('成功');
}).then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)

const promise2 = new Promise((resolve, reject) => {
    // 传入一个异步操作
    setTimeout(() => {
      resolve('成功');
    },1000);
  }).then(
    (data) => {
      console.log('success', data)
    },
    (err) => {
      console.log('faild', err)
    }
  )
  