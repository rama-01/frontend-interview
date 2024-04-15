"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unknownVal;
unknownVal = 123;
unknownVal = 'hello world';
function foo() {
    //   return undefined
}
function sayHi(msg) {
    return 'say,' + msg;
}
sayHi('hello world');
function sayHi2(msg) {
    return 'say,' + msg;
}
// sayHi2('hello ts')
var Enum;
(function (Enum) {
    Enum[Enum["foo"] = 0] = "foo";
    Enum[Enum["bar"] = 1] = "bar";
    Enum["baz"] = "hello";
    Enum[Enum["fob"] = 5] = "fob";
    Enum[Enum["foa"] = 7] = "foa";
})(Enum || (Enum = {}));
