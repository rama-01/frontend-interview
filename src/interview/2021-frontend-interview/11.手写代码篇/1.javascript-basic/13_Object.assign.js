Object.myAssign = function (target, ...source) {
    if (!target) {
        throw new TypeError('connot convert null or undefined to object')
    }
    let res = Object(target)
    source.forEach((obj) => {
        if (obj) {
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    res[key] = obj[key]
                }
            }
        }
    })
    return res
}