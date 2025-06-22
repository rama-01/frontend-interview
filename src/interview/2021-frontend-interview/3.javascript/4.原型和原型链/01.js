function Person(name) {
    this.name = name
}
// 修改原型
Person.prototype.getName = function () { }
var p = new Person('hello')
console.log(Person === p.constructor) // true
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // true
// 重写原型
Person.prototype = {  
    getName: function () { }
}
var p = new Person('hello')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // false
// 直接给原型对象赋值，它的构造函数指向了根构造函数Object，可修改如下：
p.constructor = Person
console.log(p.__proto__ === p.constructor.prototype) // true



4