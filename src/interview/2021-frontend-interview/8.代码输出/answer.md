### 1.异步，事件循环
1. 1 2 4
2. promise1 1 Promise{<resolved>:resolved1} 2 Promise{pending} resolve1  
   promise2 的状态取决于 promise1.then() 返回的新 Promise 对象。在这种情况下，promise2 会继承 promise1 的状态和值。由于 promise1 在创建后立即被 resolve 为 'resolve1'，所以 promise2 也会变为 resolved 状态，并且会输出 'resolve1'。

   仍然显示为 pending 状态是因为 JavaScript 引擎在当前事件循环中还没有完成执行所有代码。这意味着在打印它们时，它们尚未完全解决（resolved）。一旦 JavaScript 引擎完成当前事件循环并且所有微任务（microtasks）被处理，这两个 Promise 对象的状态将会更新为 resolved，并输出相应的值。

   尽管 promise2 最终会变为 resolved 状态并输出 'resolve1'，但在打印时显示为 pending 是因为 JavaScript 的事件循环机制导致了这种行为。
3. 1 2 4 timerStart timerEnd success
4. start promise1 timer1 promise2 timer2
5. then success1
6. 1
   根据promise规范，promise.then链式调用中，期望接收一个函数作为参数，如果不是函数，那么它会忽略这个值，并继续传递上一个promise的值
7. promise1 Promise{<pending>} promise Promise{<pending>}
   程序之后会抛出错误，并异常中止，不打印任何内容。 注： 答案错误
8. 1 2
   由于.then .catch方法会返回一个新的promise，所以第一个then返回的2会包装成resolve(2)
9.  then: Error: error!!!
    返回任意一个非promise值都会被包装成promise对象，return newError('error!!!') 包装成了 return Promise.resolve(new Error('error!!!'))
10. [TypeError: Chaining cycle detected for promise #<Promise>]
11. 1
12. error err!!!
13. 1 finally2 finally then callback after finally 2
    finally方法不管promise最后状态如何都会执行，它不接收任何参数，也就是说finally中无法知道promise的最终状态，它返回的默认是上一次promise对象的值
14. 1 2 3 [1,2,3]
15. 1 3 2 Error: 2 4
16. 1 result: 1 2 3 
    Promise.race() 方法会在传入的多个 Promise 中，只要有一个 Promise 被解决（fulfilled）或拒绝（rejected），就会返回一个新的 Promise，并采用第一个完成的 Promise 的状态和值
17. 0 Error: 0 1 2 3
18. async1 start async2 start async1 end
19. async1 start async2 start async1 end timer2 timer3 timer1
20. script start async1 start promise1 script end
21. script start async1 start promise1 script end promise1 resolve async1 success async1 end
22. script start async1 start async2 promise1 script end async1 end promise2 setTimeout
23. async2 Uncaught in promise error
24. 3 7 4 1 2 5  Promise {<resolved>: 1}
25. script start async1 promise1 script end 1 timer2 timer1
26. resolve1 finally undefined timer1 Promise {<resolved>: undefined}
27. 1 7 6 8 2 4 3 5 9 11 10 12
28. 1 3 8 4 2 5 6 7 
29. 1 4 7 5 2 3 6
30. 1 3 5 6 
31. 2 3 7 8 4 5 6 1

### 2.this
1. 2
2. 10 10  
   箭头函数this在定义时就被确定，指向父级所处上下文，并且无法通过call,apply,bind改变其指向。
3. Window  
   如果第⼀个参数传⼊的对象调⽤者是null或者undefined，call⽅法将把全局对象（浏览器上是window对象）作为this的值。
4. cuggz undefined
5. 
6. 1111 Window 1111 obj Window  
   getPro处于pro中，⽽对象不构成单独的作⽤域，所以箭头的函数的this就指向了全局作⽤域window。
7. bar bar undefined bar
8. 15 40
9. 10 2
10. 2 1 1 
11. 3 6 
12. 20 10 20
13. undefined 6
14. 2 3 2 4
15. 2 2 3
    this绑定优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定。

### 3.作用域，变量提升和闭包
1. 1  undefined Uncaught ReferenceError: x is not defined
2. undefined undefined 3 3  undefined 3
3. Goodbye Jack
   function,var声明的变量都会提升hoist
4. fn1 Uncaught TypeError fn2
5. 10 Uncaught ReferenceError
6. 3
7. undefined 0 0 0 
   undefined 0 1 2 
   undefined 0 1 1
8. false
   对象的非空引用会被视为true，空引用则被视为false；当一个对象参与条件比较时，它会被求值，求值的结果是数组成为一个字符串，[]为'',[1,2]为'1,2'
   
### 4. 原型和原型链
1.  
2. 2 4 1 1 2 3 3 
3. a Uncaught TypeError a b
   f不是Function实例，而F是Function和Object的实例
4. 4 2 1
5. true
6. 9999 4400
7. 1 undefined 2
8. 1 [1,2,1] 5  
   11 [1,2,1] 5  
   12 [1,2,1] 5  
   1 [1,2,1] 5  
   5 [1,2,1,11,12] 5  
   6 [1,2,1,11,12] 5
9. true