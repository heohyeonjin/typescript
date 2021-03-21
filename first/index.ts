class Human{
    public name : String;
    public age: number;
    public gender : string;
    constructor(name:string,age:number,gender?:string)
    {this.name = name;
     this.age = age;
     this.gender = gender;
    }
}
const lynn = new Human("Lynn",18,"female");

const sayhi = (person:Human):String =>{
    return`hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
};//String -> 함수의 리턴값
console.log(sayhi(lynn));
 //TS는 JS 와 다르게 인자 2개만 받으면 오류뜸

export {}; //이거 안하면 이름 선언할 수 없다고 에러뜸(TS언어)
