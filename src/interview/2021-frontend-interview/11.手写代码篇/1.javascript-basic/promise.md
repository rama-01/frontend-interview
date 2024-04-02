### #01
1. Preventing Multiple Calls:  
The then method of a Promise is expected to call only one of the two callbacks (the resolve callback or the reject callback) exactly once. If a callback is called more than once, it would be a violation of the Promise specification.

2. Handling Synchronous and Asynchronous Execution:  
The then method of a thenable object (an object with a then method) may be executed synchronously or asynchronously. This means that the callbacks passed to the then method may be invoked immediately or at a later time, depending on the implementation of the thenable object.
Without the called flag, if the then method is executed synchronously, it's possible for both callbacks to be called, which would be incorrect.

3. Ensuring Proper Resolution/Rejection:  
By keeping track of whether a callback has been called or not, the code can ensure that the Promise is properly resolved or rejected, even in the case of synchronous execution or multiple calls to the callbacks.

### #02
1. The reason for the recursive call to resolvePromise is to handle the case where the resolved value y is itself a Promise or a thenable object. By calling resolvePromise again, the code can properly handle the resolution of the nested Promise or thenable object, ensuring that the original promise is resolved or rejected correctly.

2. This recursive handling of Promises and thenable objects is a key part of the Promise resolution algorithm, as specified in the Promise/A+ specification. It allows Promises to be composed and chained together, with each Promise being resolved or rejected based on the resolution of the previous Promises in the chain.

3. Without the recursive call to resolvePromise, the code would not be able to properly handle nested Promises or thenable objects, which would lead to a violation of the Promise specification and potentially cause issues in the Promise chain.


### #03
```typescript
function resolvePromise(promise: MyPromise, x: any, resolve: (value?: any) => void, reject: (reason?: any) => void) {
  // 1. 如果 promise 和 x 是同一个对象,抛出 TypeError 错误
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  // 2. 如果 x 是一个 MyPromise 实例,递归调用 resolvePromise
  if (x instanceof MyPromise) {
    x.then(
      (y) => resolvePromise(promise, y, resolve, reject),
      reject
    );
  }
  // 3. 如果 x 是一个 thenable 对象(有 then 方法)
  else if (typeof x === 'object' && x !== null || typeof x === 'function') {
    let then: any;
    try {
      // 获取 x 的 then 方法
      then = x.then;
    } catch (e) {
      // 如果获取 then 方法时出错,则以 e 为原因 reject promise
      return reject(e);
    }

    // 如果 then 是一个函数
    if (typeof then === 'function') {
      let called = false;
      try {
        // 调用 then 方法,传入两个回调函数
        then.call(
          x,
          (y) => {
            if (!called) {
              called = true;
              resolvePromise(promise, y, resolve, reject);
            }
          },
          (r) => {
            if (!called) {
              called = true;
              reject(r);
            }
          }
        );
      } catch (e) {
        // 如果调用 then 方法时出错,则以 e 为原因 reject promise
        if (!called) {
          called = true;
          reject(e);
        }
      }
    }
    // 如果 then 不是一个函数,则以 x 为值 resolve promise
    else {
      resolve(x);
    }
  }
  // 4. 如果 x 是一个普通值,则以 x 为值 resolve promise
  else {
    resolve(x);
  }
}
```

这个 `resolvePromise` 函数的实现逻辑如下:

1. 首先检查 `promise` 和 `x` 是否是同一个对象,如果是,则抛出 `TypeError` 错误。
2. 如果 `x` 是一个 `MyPromise` 实例,则递归调用 `resolvePromise` 函数,传入 `x` 的 `then` 方法返回的值。
3. 如果 `x` 是一个 thenable 对象(有 `then` 方法),则尝试获取 `x` 的 `then` 方法,并调用它,传入两个回调函数:
   - 第一个回调函数用于处理 `x` 被 resolve 的情况,在这个回调函数中,递归调用 `resolvePromise`。
   - 第二个回调函数用于处理 `x` 被 reject 的情况,直接调用 `reject` 函数。
4. 如果 `x` 是一个普通值,则直接调用 `resolve` 函数,传入 `x` 作为参数。

这个 `resolvePromise` 函数的主要目的是确保 Promise 的解析过程能够正确地处理各种类型的返回值,包括 Promise 实例、thenable 对象以及普通值。它通过递归调用自身来处理嵌套的 Promise,并且通过捕获异常来确保在任何情况下都能正确地 resolve 或 reject Promise。

这个函数是 Promise 实现的核心部分,它确保了 Promise 的行为符合规范,并提供了良好的可扩展性和可维护性。