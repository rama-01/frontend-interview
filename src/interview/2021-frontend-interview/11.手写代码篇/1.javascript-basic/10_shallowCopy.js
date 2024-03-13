function shallowCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== 'object') return
    const newObj = Array.isArray(object) ? [] : {}
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            newObj[key] = object[key]
        }
    }
    return newObj
}

/* 解释：一个新的对象在对原始对象进行拷贝时，如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值；如果是引用数据类型，拷贝的就是内存地址。弱国修改引用数据类型的某个属性，另一个对象也会随之改变 */
const obj = { a: 1, b: { c: { d: 1 } } }
const newObj = shallowCopy(obj)

obj.a = 3
obj.b.c.d = 2
console.log(obj);
console.log(newObj);