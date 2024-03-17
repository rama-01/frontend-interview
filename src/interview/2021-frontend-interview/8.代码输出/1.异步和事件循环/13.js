Promise.resolve('1')
    .then(res => {
        console.log(res)
    })
    .finally(() => {
        console.log('finally')
    })
Promise.resolve('2')
    .finally(() => {
        console.log('finally2')
        return 'finally2 return value'
    })
    .then(res => {
        console.log('then callback after finally', res)
    })