function getType(val) {
    // 分3种情况讨论：
    // 1. null
    // 2. 引用数据类型
    // 3. 基本数据类型或者函数
    if (typeof val === null) {
        return val + ''
    } else if (typeof val === 'object') {
        const valClass = Object.prototype.toString.call(val)
        const type = valClass.split(' ')[1].split('')
        type.pop()
        return type.join('').toLowerCase()
    } else {
        return typeof val
    }
}