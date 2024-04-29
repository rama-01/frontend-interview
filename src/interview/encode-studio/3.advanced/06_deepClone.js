function deepClone(object) {
    // 只拷贝对象,或者object为null,undefined
    if (!object || typeof object !== 'object') return
    const newObj = Array.isArray(object) ? [] : {}
    for (const key in object) {
        // 只拷贝自身属性
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            newObj[key] = typeof object[key] === 'object' ? deepClone(object[key]) : object[key]
        }
    }
    return newObj
}
