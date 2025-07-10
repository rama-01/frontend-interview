const res  = new Promise((resolve, reject) => {
  resolve(1)
})
type a = Awaited<typeof res>
