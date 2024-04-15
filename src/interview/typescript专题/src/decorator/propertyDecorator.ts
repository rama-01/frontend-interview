function maxLength(length: number) {
    return function (target: any, propertyKey: string) {
      let value: string
      const getter = function () {
        return value
      }
      const setter = function (newVal: string) {
        if (newVal.length > length) {
          console.log(
            `Error: ${propertyKey} should not exceed ${length} characters.`
          )
        } else {
          value = newVal
        }
      }
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
      })
    }
  }
  
  class Person {
  //   @maxLength(10)
    name: string
  
    constructor() {
      this.name = 'John Doe' // 合法
    }
  }
  
  const p = new Person()
  p.name = 'Jane Smith' // 合法
  p.name = 'SuperCalifragilisticExpialidocious' // 错误: Error: name should not exceed 10 characters.
  
  export {}
  