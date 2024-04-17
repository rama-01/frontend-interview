// 父类
function Animal(name) {
    this.name = name;
}
Animal.prototype.eat = function () {
    console.log(`${this.name} is eating.`);  //this指向实例
}

// 子类
function Dog(name, breed) {
    // 继承父类属性
    Animal.call(this, name);
    this.breed = breed;
}

// 子类原型继承父类原型
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 添加子类特有方法
Dog.prototype.bark = function () {
    console.log(`${this.name} is barking.`); //this指向实例
}

let dog = new Dog('Buddy', 'Labrador');
dog.eat(); // Buddy is eating.
dog.bark(); // Buddy is barking.
