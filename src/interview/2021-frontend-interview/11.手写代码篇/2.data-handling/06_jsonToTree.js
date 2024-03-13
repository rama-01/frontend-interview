const jsonToTree = (source) => {
    let res = []
    if (!Array.isArray(source)) {
        return res
    }
    let map = {}
    source.forEach(item => map[item.id] = item)
    source.forEach(item => {
        let parent = map[item.pid]
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            res.push(item)
        }
    })
    return res
}

const source = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1,
    name: 'title'
}, {
    id: 3,
    pid: 2,
    name: 'div'
}]

// console.log(jsonToTree(source));
console.log(JSON.stringify(jsonToTree(source), null, 2));