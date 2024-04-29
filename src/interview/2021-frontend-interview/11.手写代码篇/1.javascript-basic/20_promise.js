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
                that.onResolvedCallbacks.forEach(cb => cb(that.value))  //这里传递给cb回调中的参数是否可以使用resolve的参数
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
            throw new TypeError('the promise and the return value are the same')
        }
        if (x instanceof MyPromise) {
            x.then(y => resolvePromise(promise, y, resolve, reject))  //在js class中定义的方法是否可以直接访问它自己？
        }
        if (typeof x === 'object' && x !== null || typeof x === 'function') {
            let then

            try {
                then = x.then
            } catch (error) {
                reject(error)
            }

            if (typeof then === 'function') {
                let called = false  //避免then回调被多次调用

                try {
                    then.call(x, y => {
                        if (!called) {
                            called = true
                            resolvePromise(promise, y, resolve, reject)
                        }
                    }, r => {
                        if (!called) {
                            called = true
                            reject(r)
                        }
                    })

                } catch (e) {
                    if (!called) {
                        called = true
                        reject(e)
                    }
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x)
        }
    }

    then(onResolved, onRejected) {
        // 包装onResolved,onRejected,使得它必然是一个函数
        const that = this

        let realOnResolved = onResolved
        if (typeof onResolved !== 'function') {
            realOnResolved = function (value) {
                return value
            }
        }

        let realOnRejected = onRejected
        if (typeof onRejected !== 'function') {
            realOnRejected = function (reason) {
                return reason
            }
        }

        if (that.state === RESOLVED) {
            const promise = new MyPromise(function (resolve, reject) {
                try {
                    if (typeof onResolved === 'function') {
                        onResolved(that.value)
                    } else {
                        const x = realOnResolved(that.value)
                        resolvePromise(promise, x, resolve, reject)
                    }
                } catch (e) {
                    reject(e)
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
                        resolvePromise(promise, x, resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })
            return promise
        }

        if (that.state === 'PENDING') {
            const promise = new MyPromise(function (resolve, reject) {
                that.onResolvedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            if (typeof onResolved === 'function') {
                                onResolved(that.value)
                            } else {
                                const x = realOnResolved(that.value)
                                resolvePromise(promise, x, resolve, reject)
                            }
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })

                that.onRejectedCallbacks.push(function (resolve, reject) {
                    setTimeout(function () {
                        try {
                            if (typeof onRejected === 'function') {
                                onRejected(that.reason)
                            } else {
                                const x = realOnRejected(that.reason)
                                resolvePromise(promise, x, resolve, reject)
                            }
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            })
            return promise
        }
    }

    all(promiseList) {
        const resPromise = new MyPromise(function (resolve, reject) {
            let count = 0
            let res = []
            promiseList.forEach(function (promise, index) {
                MyPromise.resolve(promise).then(function (value) {
                    count++
                    res[index] = resolve(value)
                    if (count === promiseList.length) {
                        return res
                    }
                }, function (reason) {
                    reject(reason)
                })
            })
        })
        return resPromise
    }

    race(promiseList) {
        const resPromise = new MyPromise(function (resolve, reject) {
            if (promiseList.length === 0) return resolve()
            for (let i = 0; i < promiseList.length; i++) {
                MyPromise.resolve(promiseList[i]).then(function (value) {
                    return resolve(value)
                }, function (reason) {
                    return reject(reason)
                })
            }
        })
        return resPromise
    }

    allSettled(promiseList) {
        const resPromise = new MyPromise(function (resolve, reject) {
            if (promiseList.length === 0) return resolve()
            let count = 0
            const res = []
            const n = promiseList.length
            for (let i = 0; i < n; i++) {
                const currentPromise = promiseList[i]
                MyPromise.resolve(currentPromise).then(function (value) {
                    count++
                    res[i] = resolve(value)
                    if (count === n) {
                        return res
                    }
                }, function (reason) {
                    count++
                    res[i] = reject(reason)
                    if (count === n) {
                        return res
                    }
                })
            }
            return resPromise
        })
    }

    finally(callback) {
        return this.then(value => MyPromise.resolve(callback()).then(() => value), error => MyPromise.resolve(callback()).then(() => { throw error }))
    }
}