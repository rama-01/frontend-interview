function runAsync(x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000 * x))
    return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
    .then(res => console.log('result: ', res))
    .catch(err => console.log(err))
