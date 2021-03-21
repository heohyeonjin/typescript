"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const lynn = new Human("Lynn", 18, "female");
//interface생성해서 object를 전달하기
const sayhi = (person) => {
    return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
}; //void -> 함수의 리턴값
console.log(sayhi(lynn));
//# sourceMappingURL=index.js.map
