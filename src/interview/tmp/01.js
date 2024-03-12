let obj = { num1: 111 };

obj.child = obj = { num2: 222 };

console.log(obj.child); // 输出？  //undefined
