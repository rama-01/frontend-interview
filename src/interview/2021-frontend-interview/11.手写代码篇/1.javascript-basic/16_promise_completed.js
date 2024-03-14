const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
function MyPromise(fn) {
    // 保存初始化状态
    var self = this;
    // 初始化状态
    this.state = PENDING;
    // ⽤于保存 resolve 或者 rejected 传⼊的值
    this.value = null;
    // ⽤于保存 resolve 的回调函数
    this.resolvedCallbacks = [];
    // ⽤于保存 reject 的回调函数
    this.rejectedCallbacks = [];
    // 状态转变为 resolved ⽅法
    function resolve(value) {
        // 判断传⼊元素是否为 Promise 值，如果是，则状态改变必须等待前⼀个状态改变后再进⾏改变
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }
        // 保证代码的执⾏顺序为本轮事件循环的末尾
        setTimeout(() => {
            // 只有状态为 pending 时才能转变，
            if (self.state === PENDING) {
                // 修改状态
                self.state = RESOLVED;
                // 设置传⼊的值
                self.value = value;
                // 执⾏回调函数
                self.resolvedCallbacks.forEach(callback => {
                    callback(value);
                });
            }
        }, 0);
    }
    // 状态转变为 rejected ⽅法
    function reject(value) {
        // 保证代码的执⾏顺序为本轮事件循环的末尾
        setTimeout(() => {
            // 只有状态为 pending 时才能转变
            if (self.state === PENDING) {
                // 修改状态
                self.state = REJECTED;
                // 设置传⼊的值
                self.value = value;
                // 执⾏回调函数
                self.rejectedCallbacks.forEach(callback => {
                    callback(value);
                });
            }
        }, 0);
    }
    // 将两个⽅法传⼊函数执⾏
    try {
        fn(resolve, reject);
    } catch (e) {
        // 遇到错误时，捕获错误，执⾏ reject 函数
        reject(e);
    }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
    // ⾸先判断两个参数是否为函数类型，因为这两个参数是可选参数
    onResolved =
        typeof onResolved === "function"
            ? onResolved
            : function (value) {
                return value;
            };
    onRejected =
        typeof onRejected === "function"
            ? onRejected
            : function (error) {
                throw error;
            };
    // 如果是等待状态，则将函数加⼊对应列表中
    if (this.state === PENDING) {
        this.resolvedCallbacks.push(onResolved);
        this.rejectedCallbacks.push(onRejected);
    }
    // 如果状态已经凝固，则直接执⾏对应状态的函数
    if (this.state === RESOLVED) {
        onResolved(this.value);
    }
    if (this.state === REJECTED) {
        onRejected(this.value);
    }
};


const promise2 = new MyPromise((resolve, reject) => {
    // 传入一个异步操作
    setTimeout(() => {
        resolve('成功');
    }, 1000);
}).then().then(  //测试不通过
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)