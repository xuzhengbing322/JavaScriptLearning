import { People } from "./people";

// extends继承
class Student extends People{
    constructor (name, height, weight, number, subject) {
        /*super：将指定的子类成员属性传递到父类的对应地方处理，处理的结果返回给子类的实例对象。
        相当于是将指定的父类代码复制到子类中来，非指定的父类代码不会复制到子类中。
        */ 
        super(name, height, weight);
        this.number = number;
        this.subject = subject
    }

    // extends：子类会自动继承父类所有的方法，子类可以重定义这些方法。
    study () {
        console.log(`My Student No. is ${this.number}. I am Studying ${this.subject}`)
    }
}

export {Student}