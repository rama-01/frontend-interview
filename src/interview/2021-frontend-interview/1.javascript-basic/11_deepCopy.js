function deepCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== 'object') return
    const newObj = Array.isArray(object) ? [] : {}
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            newObj[key] = typeof object[key] === 'object' ? deepCopy(object[key]) : object[key]
        }
    }
    return newObj
}

const obj = { a: 1, b: { c: { d: 1 } } }
const newObj = deepCopy(obj)

obj.a = 3
obj.b.c.d = 2
console.log(obj);
console.log(newObj);