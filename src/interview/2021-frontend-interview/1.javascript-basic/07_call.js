/* 实现步骤：
1.判断调用对象是否为函数
2.判断传入上下文对象是否存在，如果不存在，则设置为window
3.处理传入的参数
4.将函数作为上下文对象的一个属性
5.使用上下文对象调用这个方法，this指向改变
6.删除新增属性
7.返回结果 */
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('caller is not a function')
    }
    let context = context || window,
        res = null,  // 为了不确定函数执行过程中是否会产生返回值的情况设置为null
        // args = arguments.slice(1)
        args = [...arguments].slice(1)
    context.fn = this
    res = context.fn(...args)
    delete context.fn
    return res
}