function reqData(url) {
  return new Promsie((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

// 生成器
function* gen() {
  const res1 = yield reqData('data1')
  console.log(res1)
}

const res2 = yield reqData('data2')
console.log(res2)

