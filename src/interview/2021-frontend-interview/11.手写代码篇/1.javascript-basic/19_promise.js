const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        const that = this
        that.state = PENDING
        that.value = null
        that.reason = null
        that.onResolvedCallbacks = []
        that.onRejectedCallbacks = []

        function resolve(value) {
            if (that.state === PENDING) {
                that.state = RESOLVED
                that.value = value
                that.onResolvedCallbacks.forEach(cb => cb(that.value))
            }
        }

        function reject(reason) {
            if (that.state === PENDING) {
                that.state = REJECTED
                that.reason = reason
                that.onRejectedCallbacks.forEach(cb => cb(that.reason))
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    resolvePromise(promise, x, resolve, reject) {
        if (promise === x) {
            throw new TypeError("The promise and the return value are the same")
        }

        if (x instanceof MyPromise) {
            x.then(this.resolvePromise(promise, y, resolve, reject), reject)
        }

        if (typeof x === 'object' || typeof x === 'function') {
            if (x === null) {
                return resolve(x)
            }
            try {
                const then = x.then
            } catch (error) {
                reject(error)
            }
            if (typeof then === 'function') {
                let called = false
                try {
                    then.call(x,
                        function (y) {
                            if (called) return
                            called = true
                            resolvePromise(promise, y, resolve, reject)
                        },
                        function (r) {
                            if (called) return
                            called = true
                            reject(r)
                        })
                } catch (error) {
                    if (called) return
                    reject(error)
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x)
        }
    }

    then(onResolved, onRejected) {
        const that = this
        let realOnResolved = onResolved
        if (typeof realOnResolved !== 'function') {
            realOnResolved = function (value) {
                return value
            }
        }
        let realOnRejected = onRejected
        if (typeof realOnRejected !== 'function') {
            realOnRejected = function (reason) {
                // return reason
                throw reason
            }
        }

        if (that.state === RESOLVED) {
            const promise = new MyPromise(function (resolve, reject) {
                try {
                    if (typeof onResolved === 'function') {
                        onResolved(that.value)
                    } else {
                        const x = realOnResolved(that.value)
                        that.resolvePromise(promise, x, resolve, reject)
                    }
                } catch (error) {
                    reject(error)
                }
            })
            return promise
        }
        if (that.state === REJECTED) {
            const promise = new MyPromise(function (resolve, reject) {
                try {
                    if (typeof onRejected === 'function') {
                        onRejected(that.reason)
                    } else {
                        const x = realOnRejected(that.reason)
                        that.resolvePromise(promise, x, resolve, reject)
                    }
                } catch (error) {
                    reject(error)
                }
            })
            return promise
        }
        // 解决执行器函数中异步执行回调，状态不确定的问题
        if (that.state === PENDING) {
            const promise = new MyPromise(function (resolve, reject) {
                that.onResolvedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            if (typeof onResolved === 'function') {
                                onResolved(that.value)
                            } else {
                                const x = realOnResolved(that.value)
                                that.resolvePromise(promise, x, resolve, reject)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                }
                )
                that.onRejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            if (typeof onRejected === 'function') {
                                onRejected(that.reason)
                            } else {
                                const x = realOnRejected(that.reason)
                                that.resolvePromise(promise, x, resolve, reject)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                }
                )
            })
            return promise
        }
    }
}

const promise2 = new MyPromise((resolve, reject) => {
    // 传入一个异步操作
    setTimeout(() => {
        resolve('成功');
    }, 1000);
}).then().then().then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)