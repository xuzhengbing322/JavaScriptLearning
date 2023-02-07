import  { People } from '../classes/people'

const xiaoming = new People('小明', 175, 70),
      xiaohong = new People('小红', 160, 40);

xiaoming.intro();
xiaoming.drink();
xiaohong.intro();
xiaohong.eat();

console.log(xiaoming)