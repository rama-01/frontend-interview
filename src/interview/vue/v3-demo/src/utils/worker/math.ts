// worker.js
self.onmessage = function (e) {
    const numbers = new Float64Array(e.data)
    const results = numbers.reduce((acc, num) => acc + num * num * num, 0)
    postMessage(results)
}
