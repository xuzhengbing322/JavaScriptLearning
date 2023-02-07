import { Tab } from '../classes/tab';
import '../css/tab.css';
import { Student } from '../classes/student';

// 实例化类，执行程序
const tab = new Tab('fade');

const xiaoming = new Student('xiaoming', 175, 70, 1001, 'Math');
xiaoming.study();
xiaoming.intro();
xiaoming.sleep();
