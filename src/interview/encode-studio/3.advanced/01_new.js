function create() {
    let obj = new Object()
    // 获取构造函数
    let constructor = [].shift.call(arguments)
    // 链接到原型
    obj.__proto = constructor.prototype
    // 绑定this，执行构造函数
    const res = constructor.apply(obj, arguments)
    // 确保new操作符返回的始终是一个对象
    // 如果不是对象，那么返回新创建的对象
    return typeof res === 'object' ? res : obj
}
