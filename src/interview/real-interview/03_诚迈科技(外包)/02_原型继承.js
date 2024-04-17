// 父类
function Animal(name) {
    this.name = name;
}
Animal.prototype.eat = function () {
    console.log(`${this.name} is eating.`);
}

// 子类
function Dog(name, breed) {
    Animal.call(this, name)  //调用父类构造方法，继承父类属性
    this.breed = breed;
}

// 子类原型继承父类实例
Dog.prototype = new Animal('Parent');
Dog.prototype.constructor = Dog;

// 添加子类特有方法
Dog.prototype.bark = function () {
    console.log(`${this.name} is barking.`);
}

let dog = new Dog('Buddy', 'Labrador');
dog.eat(); // Parent is eating.
dog.bark(); // Buddy is barking.
