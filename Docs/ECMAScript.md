## 



JavaScript

与大多数编程语言不同，JavaScript 语言没有输入或输出的概念。它被设计为在宿主环境中作为脚本语言运行，并且由宿主环境提供与外界通信的机制。

ES6 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。

JavaScript 是大家所了解的语言名称，但是这个语言名称是商标（ Oracle 公司注册的商标）。因此，JavaScript 的正式名称是 ECMAScript 。





# DOM

**事件监听程序 Listener**

```
Listener(event, function)
```

1. 第一个参数是事件的类型（比如 "click" 或 "mousedown"）。

2. 第二个参数是当事件发生时我们需要调用的函数。





# 类型: 

- [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type)
- [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
- [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type) (new in ES2015)
- Object
  - [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  - [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  - [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#null_type)
- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#undefined_type)

还有一些内置的错误类型。(some built-in [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) types)

---



**Number**

```js
console.log(3 / 2);             // 1.5, not 1
console.log(Math.floor(3 / 2)); // 1
```

watch out for stuff like:

```js
0.1 + 0.2 == 0.30000000000000004;
```



```js
Math.sin(3.5);
const circumference = 2 * Math.PI * r;

//parseInt 将字符串转换为整数:
parseInt('123', 10); // 123
parseInt('010', 10); // 10

//转为 2 进制：
parseInt('11', 2); // 3

```



**NaN** (short for "Not a Number") 

```js
parseInt('hello', 10); // NaN


Number.isNaN(NaN);    // true
Number.isNaN(undefined); // false
Number.isNaN({});        // false
Number.isNaN([1,2])      // false

//但是不要使用全局 isNaN() 函数测试 NaN，它具有不直观的行为
isNaN('hello'); // true
isNaN('1');     // false
```



 **`Infinity` and `-Infinity`:**

```js
 1 / 0;   //  Infinity
-1 / 0;   // -Infinity

//You can test for Infinity, -Infinity and NaN values using the built-in isFinite() :
// isFinite Means 是不是有限数字
isFinite(123);       // true
isFinite(1 / 0);     // false
isFinite(-Infinity); // false
isFinite(NaN);       // false
isFinite('Hello');       // false
```



----



**Strings**

JavaScript 中的字符串是 Unicode 字符序列。

更准确地说，它们是 UTF-16 代码单元的序列；每个代码单元由一个 16 位数字表示，每个 Unicode 字符由 1 个或 2 个代码单元表示。

```js
'hello'.length; // 5

'hello'.charAt(0);  // "h"
'hello, world'.replace('world', 'Mars');   // "hello, Mars"
'hello'.toUpperCase(); // "HELLO"


// Split 
let companiesString = 'Facebook, Google, Microsoft, Apple'
const companies = companiesString.split(',')
console.log(companies)  // ["Facebook", " Google", " Microsoft", " Apple"]
```



-----

**区分 null 和 undefined** 

```js
typeof(null)      // object (因为遗留原因类型不是 null)
typeof(undefined) // undefined

console.log(Number(undefined));     //NaN
console.log(Number(11+ undefined)); //NaN

console.log(Number(null));     //0
console.log(Number(11+ null)); //10
```



**null何时使用：**

> 当需要释放一个对象的时候可以将该对象赋值为null，进而来释放对象

```js
var a = {
  a:1,  b:2
};
a = null;
```

**null、undefined是怎么产生的**

```js
// 1. 当访问一个不存的DOM节点时 -> null
console.log(document.getElementById(“#aaaaaaa”));  // null

// 2. Object的原型链终点： -> null
console.log(Object.prototype.__proto__)；  //null

// 3. 声明了变量但未赋值、对象的属性没有赋值  -> undefined
var a;
console.log(a);  //undefined

var obj = {a:1}; 
console.log(obj.age) //undefined

// 4. 函数的参数未提供：   -> undefined
function add(num){ 
  console.log(num)
}; 
add();  //undefined

// 5. 当函数没有返回值的情况下：：   -> undefined
var a = function(){  };
console.log(a)  //undefined
```





# Variables

let 、const、var

let 允许你声明块级变量。声明的变量可从它所包含的块中获得。

```js
for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
  // myLetVariable is only visible in here
  // 仅块内可见
}
```

**`const`** allows you to declare variables whose values are never intended to change. 

```js
const Pi = 3.14; // variable Pi is set
Pi = 1; // will throw an error because you cannot change a constant variable.
```

```
// var 即是声明变量的一般方法
var a;
var name = 'Simon';
```

从 ECMAScript 2015 开始，let 和 const 声明允许您创建块范围的变量



# Operations

## **&& 和 ||  —— 短路运算符**

这 2 个符号，不论哪个，只要短路，不会继续执行后面的表达式

* &&： 只要碰到了假值(false)，就会短路，并返回该假值

* ||： 只要碰到了真值(true)，就会短路，并返回该真值。(一般用作默认值)

注意：假值有以下6个：

```js
null undefined NaN false  0  ''
```

```js
||: 真值短路返真值    
  console.log(true || false); // true
  console.log(NaN || 1); // 1
  console.log('abc' || 123); // ‘abc’
  console.log(0 || '');   // '', 没有遇到真值，返回最后一个

&&: 假值短路返假值
  console.log('abc' && null); // null
  console.log(null && 'abc'); // null
  console.log(null && undefined); // null
  console.log(undefined && null); // undefined
```

||: 真值短路返真值    

&&: 假值短路返假值

 This is useful for checking for **null objects** before accessing their attributes:

```js
const name = o && o.getName();
```

或用于缓存值（当虚假值无效时）：Or for caching values (when falsy values are invalid):

```js
// 如果 cachedName 为假则去获取。
const name = cachedName || (cachedName = getName());
```



## ternary operator、switch

```js
// 三元运算符
const allowed = (age > 18) ? 'yes' : 'no';
```



```js
switch (action) {
  case 'draw':
    drawIt();
    break;
  case 'eat':
    eatIt();
    break;
  default:
    doNothing();
}
```



# Objects

JavaScript objects can be thought of as simple collections of name-value pairs

类似 Dictionaries in Python.

```js
// create an empty object:
const obj = {};  // 首选  
or const obj = new Object();

const obj = {
  name: 'Carrot',
  _for: 'Max',   // 'for' is a reserved word
  details: {
    color: 'orange',
    size: 12
  }
};

```

Attribute access（属性获取） can be chained ：

```js
obj.details.color; // orange
obj['details']['size']; // 12
```

**creates an object** prototype(Person) and an instance of it .

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}


const you = new Person('You', 24);

obj.name    = 'Simon';
obj['name'] = 'Simon';

// prompt()方法用于显示可提示用户进行输入的对话框。方法返回用户输入的字符串。
const user = prompt('what is your key?')  // 创建 key
obj[user] = prompt('what is its value?')  // 写入 创建 key 的 value 。
```



**Object.methods**（ Object 方法） ：

> Object.assign, Object.keys, Object.values, Object.entries.....

复制一个对象而不修改原始对象

```js
const person = {
  firstName: 'Asabeneh',
  age: 250,
  country: 'Finland',
  city: 'Helsinki',
  skills: ['HTML', 'CSS', 'JS'],
  title: 'teacher',
  address: {
    street: 'Heitamienkatu 16',
    pobox: 2002,
    city: 'Helsinki',
  },
  getPersonInfo: function () {
    return `I am ${this.firstName} and I live in ${this.city}, ${this.country}. I am ${this.age}.`
  },
}

// 复制一个对象
const copyPerson = Object.assign({}, person)
console.log(copyPerson)

//Getting object keys
const keys = Object.keys(copyPerson)
console.log(keys)      // ['name', 'age', 'country', 'skills', 'address', 'getPersonInfo']
const address = Object.keys(copyPerson.address)
console.log(address)   // ['street', 'pobox', 'city']


//Getting object values 
const values = Object.values(copyPerson)
console.log(values)  //Asabeneh,250,Finland,Helsinki,HTML,CSS,JS,teacher,[object Object],function () { return `I am ${this.firstName} and I live in ${this.city}, ${this.country}. I am ${this.age}.` }

//Object.entries: 
//To get the keys and values in an array
const entries = Object.entries(copyPerson)
console.log(entries)  // [firstName,Asabeneh,age,250,country,Finland,city,Helsinki,skills,HTML,CSS,JS,title,teacher,address,[object Object],getPersonInfo,function () { return `I am ${this.firstName} and I live in ${this.city}, ${this.country}. I am ${this.age}.` }]


//hasOwnProperty: To check if a specific key or property exist in an object
console.log(copyPerson.hasOwnProperty('name'))
console.log(copyPerson.hasOwnProperty('score'))

```



# (Loops) Control structures

```js
for (let i = 0; i < 5; i++) {
  // Will execute 5 times
}

// for of
// > 如果我们对数组的索引不感兴趣，for of 循环比常规 for 循环或 forEach 循环更可取。
for (let value of array) {
  // do something with value
}

// forEach
// > 如果我们对数组的索引感兴趣，forEach 比 for of 循环更可取
// forEach 接受一个 callback 函数，callback 函数接受三个参数：item、index 和 数组本身
const countries = ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']
countries.forEach((country, i, arr) => {
  // 在 forEach loop中， arr 就代表 countries 
  console.log(i, country.toUpperCase())
})

// for in
// for in 循环可以与 object 字面量一起使用来获取对象的 key。
for (let property in object) {
  // do something with object property
}

const user = {
  firstName: 'Asabeneh',
  lastName: 'Yetayeh',
  age: 250,
  country: 'Finland',
  skills: ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'D3.js'],
}

for (const key in user) {
  console.log(key, user[key])   // 打印 key 和 value
}
/* 
firstNameAsabeneh
lastNameYetayeh
age250
countryFinland
skillsHTML,CSS,JS,React,Node,Python,D3.js
*/
```



```js
let name = 'kittens';
if (name === 'puppies') {
  name += ' woof';
} else if (name === 'kittens') {
  name += ' meow';
} else {
  name += '!';
}
name === 'kittens meow';
```



```js
while (true) {
  // an infinite loop!
}

let input;
do {
  input = get_input();
} while (inputIsNotValid(input));
```







# Array

```js
// 遍历数组：
var arr = [1,2,3,4]
for (const val of arr) {
    document.write(val + '<br>');
}
```



```js
// forEach 
['dog', 'cat', 'hen'].forEach(function(currentValue, index, array) {
  // Do something with currentValue or array[index]
});
```



```js
const a = new Array();   
// 推荐 var array = [] 这种方式
a[0] = 'dog';
a[1] = 'cat';
a[2] = 'hen';
a.length; // 3

const a = ['dog', 'cat', 'hen'];
a.length; // 3


const a = ['dog', 'cat', 'hen'];
a[100] = 'fox';
a.length; // 101 ， 说明被拉长了。


typeof a[90]; // undefined
```



```js
// indexOf
const fruits = ['banana', 'orange', 'mango', 'lemon']
let index = fruits.indexOf('banana')   // 0
let index = fruits.indexOf('Bullshit') // -1


// lastIndexOf: 
// > It gives the position of the last item in the array. If it exist, it returns the index else it returns -1.

const numbers = [1, 2, 3, 4, 5, 3, 1, 2]

console.log(numbers.lastIndexOf(2)) // 7
console.log(numbers.lastIndexOf(1)) //  6
console.log(numbers.lastIndexOf(4)) //  3
console.log(numbers.lastIndexOf(6)) // -1

// includes
const numbers = [1, 2, 3, 4, 5]

console.log(numbers.includes(5)) // true
console.log(numbers.includes(0)) // false
console.log(numbers.includes(1)) // true
console.log(numbers.includes(6)) // false

// Array.isArray - Checking array
const numbers = [1, 2, 3, 4, 5]
console.log(Array.isArray(numbers)) // true

const number = 100
console.log(Array.isArray(number)) // false

// toString - Converting array to string
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.toString())    // 1,2,3,4,5

const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
console.log(names.toString())     // Asabeneh,Mathias,Elias,Brook
```



join :

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.join()) // 1,2,3,4,5

const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']

console.log(names.join()) // Asabeneh,Mathias,Elias,Brook 
console.log(names.join(', ')) //Asabeneh, Mathias, Elias, Brook
console.log(names.join('')) //AsabenehMathiasEliasBrook
console.log(names.join(' ')) //Asabeneh Mathias Elias Brook
console.log(names.join(' # ')) //Asabeneh # Mathias # Elias # Brook
```



```js
//拉长数组 ：
var array = []
array[0] = '1'
for(var i = 0; i < 5;i ++){
  array[array.length] = '我在增长'
}

> 1,我在增长,我在增长,我在增长,我在增长,我在增长
```



**Array.concat / join**

```js
// concat
var arr  = [1,2,3,4];
var arr2 = [5,6,7,8];
var arr3 = arr.concat(arr2);
console.log(arr3);   // [1, 2, 3, 4, 5, 6, 7, 8]

// join
var arr = ['xiao','lin','qiqi','mingtian'];
var arr2 = arr.join('-');
document.write(arr2);  // xiao-lin-qiqi-mingtian
```



**Array.shift()、pop()、push()、unshift()**

```js
// shift() 删除数组的第一个元素
// pop() 删除数组的最后一个元素
// push() 向数组的末尾添加一个或更多元素。
arr.shift();   arr.pop(); 
arr.push(6)
arr.unshift('lang');

// 即刻生效
var arr = [2,3,4,5];
arr.reverse();
console.log(arr);   //  [5, 4, 3, 2]

```



**Array.slice()、toString()**

```js
// slice() 从已有的数组中返回选定的元素，包含头不包含尾。

var arr = [2,3,4,5];
var arr2 = arr.slice(1,3);
console.log(arr2);  // 截取区间返回的数组为：[3, 4]


var arr = ['xiao','ming','qiqi','aiming'];
arr.toString();
console.log(arr);  // ["xiao", "ming", "qiqi", "aiming"]
```



**Array.splice()**

```js
array.splice(index,howmany,item1,.....,itemX)
```

| 参数                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| *index*               | 必需。规定从何处添加/删除元素。 该参数是开始插入和（或）删除的数组元素的下标，必须是数字。 |
| *howmany*             | 可选。规定应该删除多少元素。必须是数字，但可以是 "0"。 如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。 |
| *item1*, ..., *itemX* | 可选。要添加到数组的新元素                                   |

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2,1,"Lemon","Kiwi");
// 从 idx==2 开始，移除 1 个元素。 向 idx==2 添加 "Lemon","Kiwi"

// Output:
// Banana,Orange,Lemon,Kiwi,Mango


var fruits = ["Banana", "Orange", "Apple", "Mango", "some"];
fruits.splice(2,2);

// 从 idx==2 (第三个位置) 开始删除数组的 idx 后的 2 个元素：
// Output:
// Banana,Orange,xx
```



**Array of arrays**

```js
const frontEnd = ['HTML', 'CSS', 'JS', 'React']
const backEnd = ['Node', 'Express', 'MongoDB']
const fullStack = [frontEnd, backEnd]
console.log(fullStack)  // [["HTML", "CSS", "JS", "React"], ["Node", "Express", "MongoDB"]]
console.log(fullStack.length) // 2
console.log(fullStack[0])  // ["HTML", "CSS", "JS", "React"]
console.log(fullStack[1])  // ["Node", "Express", "MongoDB"]
```



# Functions

```js
function add(x, y) {
  const total = x + y;
  return total;
}
// 如果没有使用 return 语句（或没有值的空返回），函数返回 undefined。
```



```js
// 不固定参数个数
function avg(...args) {
  let sum = 0;
  for (const item of args) {
    sum += item;
  }
  return sum / args.length;
}

avg(2, 3, 4, 5); // 3.5


// Arrow Func 无限参数
// 为了实现一个在箭头函数中接受无限数量参数的函数
// 在函数中作为参数传递的任何东西都可以在箭头函数中作为数组访问

const sumAllNums = (...args) => {
 console.log(args)
}

sumAllNums(1, 2, 3, 4))   //  1,2,3,4 变成了数组 [1,2,3,4]


const sumAllNums = (...args) => {
  let sum = 0
  for (const element of args) {
    sum += element
  }
  return sum
}

console.log(sumAllNums(1, 2, 3, 4)) // 10
console.log(sumAllNums(10, 20, 13, 40, 10))  // 93
console.log(sumAllNums(15, 20, 30, 25, 10, 33, 40))  // 173
```



## 箭头函数(Arrow Func)

```js
function square(n) {
  return n * n
}
console.log(square(2)) // 4

const square = (n) => {
  return n * n
}
console.log(square(2)) // 4

// 如果函数体只有一行，也可以写成这样：
const square = (n) => n * n    // -> 4
console.log(square(2))   // 4
```



```js
const changeToUpperCase = (arr) => {
  const newArr = []
  for (const element of arr) {
    newArr.push(element.toUpperCase())
  }
  return newArr
}

const countries = ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']
console.log(changeToUpperCase(countries))

// ["FINLAND", "SWEDEN", "NORWAY", "DENMARK", "ICELAND"]
```





```react
*   1.箭头函数中没有arguments
*   2.箭头函数中没有自己的this
*       - 它的this总是外层作用域的this
*   3.箭头函数中的this无法通过call()、apply()、bind()修改
*   4.箭头函数无法作为构造函数使用

react
```









## 自调用函数(Self Invoking )

自执行函数就是当它被定义出来，就会自动执行的函数。

当一个页面两个人写定义的相同的变量名就会发生冲突 污染全局。

自执行函数的作用即： 自执行函数里面是一个单独的作用域，不会影响其他的变量，也不会污染全局

定义写完即结束，与外界再无瓜葛。

```js
let squaredNum = (function (n) {
  return n * n
})(10)

console.log(squaredNum)  // 100
```





## Recursive functions

```js
// 递归调用，这对于处理树结构（DOM）特别有用，
function countChars(elm) {
  if (elm.nodeType == 3) { // TEXT_NODE
    return elm.nodeValue.length;
  }
  let count = 0;
  for (let i = 0, child; child = elm.childNodes[i]; i++) {
    count += countChars(child);
  }
  return count;
}
```







# 高阶函数 Higher Order Function

**高阶函数 are functions which take other function as a parameter or return a function as a value.** 

The function passed as a parameter is called callback.

## callback

```js
// a callback function, the function could be any name
const callback = (n) => {
  return n ** 2
}

// function take other function as a callback
function cube(callback, n) {
  return callback(n) * n
}

console.log(cube(callback, 3))
```



**Returning function**

> return function as a value

```js
// Sometimes Higher order function returning an other function
const higherOrder = n => {
  const doSomething = m => {
    const doWhatEver = t => {
      return 2 * n + 3 * m + t
    }
    return doWhatEver
  }

  return doSomething
}
console.log(higherOrder(2)(3)(10))
```



### **forEach() 中的  callback** 

> （ forEach 接受    一个 callback 函数）

```js
const numbers = [1, 2, 3, 4]
const sumArray = arr => {     //  是不是写成 = (arr) =>  更好些？  加个括号看着安全
  let sum = 0
  const callback = function(element) {
    sum += element
  }
  arr.forEach(callback)
  return sum

}
console.log(sumArray(numbers))  //10

// 进一步简化：
const numbers = [1, 2, 3, 4]

const sumArray = arr => {
  let sum = 0
  arr.forEach(function(element) {
    sum += element
  })
  return sum

}
console.log(sumArray(numbers))
```



### setting time 中的 callback

**setInterval**

> setInterval()  : 在时间间隔内连续执行某些活动。(do some activity continuously)
>
> The setInterval global method take a **callback** function and a **duration** as a parameter:
>
> - ```js
>   setInterval(callback, duration)
>   ```
>
> duration 以毫秒为单位，callback 将始终在该时间间隔内调用。

```js
function sayHello() {
  console.log('Hello')
}
setInterval(sayHello, 2000) // it prints hello in every 2 seconds
```



**setTimeout**

> setTimeout() to execute some action at some time in the future. 
>
> The setTimeout() global method take a **callback** function and a **duration** as a parameter:

```js
function sayHello() {
  console.log('Hello')
}
setTimeout(sayHello, 2000) // it prints 'hello' after it waits for 2 seconds.
```





## apply()

JS 允许使用**任何函数对象**的 apply() 方法调用**具有任意参数数组**的函数。

```js
// 不错，考虑参数是数组的情况：
function avgArray(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  return sum / arr.length;
}
avgArray([2, 3, 4, 5]); // 3.5

// 可使用 apply 重用函数。
avg.apply(null, [2, 3, 4, 5]); // 3.5
```



**call() 和 apply() 之间的区别**

>  不同之处是：
>
> `call()` 方法分别接受参数。
>
> `apply()` 方法接受数组形式的参数。
>
> 如果要使用数组而不是参数列表，则 `apply()` 方法非常方便。



# 解构和传播 Destructuring and Spreading

## Destructuring Array

解构——如果数组大小很短，可以手动访问项目：

```js
const constants = [2.72, 3.14, 9.81,37, 100]
const [e, pi, gravity, bodyTemp, boilingTemp] = constants
console.log(e, pi, gravity, bodyTemp, boilingTemp]
// 2.72, 3.14, 9.81, 37,100

const countries = ['Finland', 'Sweden', 'Norway']
const [fin, swe, nor] = countries
console.log(fin, swe, nor) // Finland, Sweden, Norway

//也可以中途添加： 
const cs = ['Finland', undefined, 'Norway']
const      [fin,  ice = 'Iceland', nor, den = 'Denmark'] = cs
console.log(fin, ice, nor, den) // Finland, Iceland, Norway, Denmark

// 在解构期间，每个变量都应与数组中所需项的索引匹配。
//例如，变量 fin 与索引 0 匹配，变量 nor 与索引 2 匹配。
// 如果接下来有一个变量 den，那么 den 的值是多少？ 很显然，是 undefined
const [fin, swe, nor, den] = countries
console.log(den)    // undefined



// 解构嵌套数组 (Destructuring Nested arrays)
const fullStack = [
  ['HTML', 'CSS', 'JS', 'React'],
  ['Node', 'Express', 'MongoDB']
]

const [frontEnd, backEnd] = fullstack
console.log(frontEnd, backEnd)
//["HTML", "CSS", "JS", "React"] , ["Node", "Express", "MongoDB"]

//在解构期间 Skipping items 跳过某些不感兴趣的项。
//可以在在该索引处放置一个逗号来省略某个项目
const countries = ['Finland', 'Sweden', 'Iceland', 'Norway', 'Denmark']
const [fin, , ice, , den] = countries
console.log(fin, ice, den) // Finland, Iceland, Denmark


//使用扩展运算符获取数组的其余部分我们使用三个点（...）在解构期间扩展或获取数组的其余部分
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [num1, num2, num3, ...rest] = nums
console.log(num1, num2, num3, rest) //1, 2, 3, [4, 5, 6, 7, 8, 9, 10]

const countries = [
  'Germany',
  'France',
  'Belgium',
  'Finland',
  'Sweden',
  'Norway',
  'Denmark',
  'Iceland',
]

let [gem, fra, , ...nordicCountries] = countries
console.log(gem, fra, nordicCountries)
// Germany, France,  ["Finland", "Sweden", "Norway", "Denmark", "Iceland"]
```



我们使用数组解构的情况很多，我们看下面的例子：

当我们遍历数组时解构：

```js
const countries = [
  ['Finland', 'Helsinki'],
  ['Sweden', 'Stockholm'],
  ['Norway', 'Oslo'],
]

for (const [country, city] of countries) {
  console.log(country, city) // Finland, Helsinki ....
}

const fullStack = [
  ['HTML', 'CSS', 'JS', 'React'],
  ['Node', 'Express', 'MongoDB'],
]

for (const [first, second, third, fourth] of fullStack) {
  console.log(first, second, third, fourth)  // HTML, CSS, JS, React
}
```



一段类似的 React 代码：

```js
const [x, y] = [2, (value) => value ** 2]

const [count, setCount] = useState(0)  // 对 useState(0) 解包
```





## Destructuring objects

对象字面量(An object literal)  is made of key and value pairs. A very simple example of an object:

```js
const rectangle = {
  width: 20,
  height: 10,
}

// 一般我们这么访问：
let width = rectangle.width   or  = rectangle[width]
let height = recangle.height   or = rectangle[height]

// 解包方法：
let { width, height } = rectangle
console.log(width, height) // 20, 10

//Renaming variable names
let { width: w, height: h } = rectangle
console.log(w, h)    // 20, 10


// 解构嵌套对象
const props = {
  user:{
    firstName:'Asabeneh',
    lastName:'Yetayeh',
    age:250
  },
  post:{
    title:'Destructuring and Spread',
    subtitle:'ES6',
    year:2020
  },
  skills:['JS', 'React', 'Redux', 'Node', 'Python']
  }
}

const {user, post, skills} = props       // 第一次解包
const {firstName, lastName, age} = user  // 二次解包
const {title, subtitle, year} = post     // 三次解包
const [skillOne, skillTwo, skillThree, skillFour, skillFive] = skills


// 一步到位：
// We can destructure it one step
const {
  user:{firstName, lastName, age}, 
  post:{title, subtitle, year}, 
  skills:[skillOne, skillTwo, skillThree, skillFour, skillFive]
} = props
```



Destructuring during loop through an array

```js
const languages = [
  { lang: 'English', count: 91 },
  { lang: 'French', count: 45 },
  { lang: 'Arabic', count: 25 },
  { lang: 'Spanish', count: 24 },
  { lang: 'Russian', count: 9 },
  { lang: 'Portuguese', count: 9 },
  { lang: 'Dutch', count: 8 },
  { lang: 'German', count: 7 },
  { lang: 'Chinese', count: 5 },
  { lang: 'Swahili', count: 4 },
  { lang: 'Serbian', count: 4 },
]

for (const { lang, count } of languages) {
  console.log(`The ${lang} is spoken in ${count} countries.`)
}
```



## Spread Operator

Spread Operator 以获取 rest 数组元素

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let [num1, num2, num3, ...rest] = nums

console.log(num1, num2, num3)  //1 2 3
console.log(rest)   //[4, 5, 6, 7, 8, 9, 10]
```



Spread operator to **copy array**

```js
const evens = [0, 2, 4, 6, 8, 10]
const evenNumbers = [...evens]

const odds = [1, 3, 5, 7, 9]
const oddNumbers = [...odds]

const wholeNumbers = [...evens, ...odds]

console.log(evenNumbers)
console.log(oddNumbers)
console.log(wholeNumbers)

/*
[0, 2, 4, 6, 8, 10]
[1, 3, 5, 7, 9]
[0, 2, 4, 6, 8, 10, 1, 3, 5, 7, 9]
*/
```



Spread operator to **copy object**

```js
const user = {
  name: 'Asabeneh',
  title: 'Programmer',
  country: 'Finland',
  city: 'Helsinki',
}

const copiedUser = { ...user }
console.log(copiedUser)
// {name: "Asabeneh", title: "Programmer", country: "Finland", city: "Helsinki"}


// Modifying the object while copying
const user = {
  name: 'Asabeneh',
  title: 'Programmer',
  country: 'Finland',
  city: 'Helsinki',
}

const copiedUser = { ...user, title: 'instructor' }
console.log(copiedUser)
// {name: "Asabeneh", title: "instructor", country: "Finland", city: "Helsinki"}
```



**Spread operator with arrow function**

> 每当我们想编写一个带有无限参数的箭头函数时，我们都会使用扩展运算符。
>
> 此时调用函数时传递的参数将变为**数组**。

```js
const sumAllNums = (...args) => {
  console.log(args)
}

sumAllNums(1, 2, 3, 4, 5)     // [1, 2, 3, 4, 5]
```



# Scope —— var、let、const

>  所以，我强烈建议您使用 let 和 const，您将编写干净的代码并避免难以调试的错误。
>
> * 可以将 let 用于任何变量
> * 将 const 用于任何常量值，以及用于数组、对象、箭头函数和函数表达式。





Variables scopes can be:

- Window （没有 let、var 或 const 声明的内容都是  window 级别作用域。）
- Global
- Local



window scope ：

```js
//scope.js
a = 'JavaScript'    // this is a window scope this found anywhere
b = 10              // this is a window scope variable
function letsLearnScope() {
  console.log(a, b)
  if (true) {
    console.log(a, b)
  }
}
console.log(a, b) // accessible
```



----

Global scope

全局声明的变量可以在**同一个文件中的每个位置访问**。但是 global 这个词是相对的。它可以是文件的全局变量，也可以是相对于某些代码块的全局变量。

```
//scope.js
let a = 'JavaScript' // is a global scope it will be found anywhere in this file
let b = 10 // is a global scope it will be found anywhere in this file
function letsLearnScope() {
  console.log(a, b) // JavaScript 10, accessible
  if (true) {
    let a = 'Python'
    let b = 100
    console.log(a, b) // Python 100
  }
  console.log(a, b)
}
letsLearnScope()
console.log(a, b) // JavaScript 10, accessible
```



----

Local scope

声明为本地的变量只能在某些块代码中访问。

```js
//scope.js
let a = 'JavaScript' //  global scope 
let b = 10 //  global scope 
function letsLearnScope() {
  console.log(a, b) // accessible
  let c = 30
  if (true) {
    // if 内声明的变量不能在 if 块外被访问
    let a = 'Python'
    let b = 20
    console.log(a, b, c) // Python 20
  }
}
letsLearnScope()
console.log(a, b) // JavaScript 10, accessible
```



现在，您 scope 对有所了解。用 var 声明的变量仅作用于函数，但用 let 或 const 声明的变量是块作用域（函数块、if 块、循环等）。

```js
function letsLearnScope() {
  var gravity = 9.81
  console.log(gravity)
}
// console.log(gravity), Uncaught ReferenceError: gravity is not defined

if (true) {
  var gravity = 9.81
  console.log(gravity) // 9.81
}
console.log(gravity)   // 9.81  <- 注意 📢

for (var i = 0; i < 3; i++) {
  console.log(i) // 1, 2, 3
}
document.write(i);   // 3  <- 注意 📢
```



在 ES6 及更高版本中:  可以用 const 和 let 。

```js
//scope.js
function letsLearnScope() {
  // you can use let or const, but gravity is constant I prefer to use const
  const gravity = 9.81
  console.log(gravity)
}
// console.log(gravity), Uncaught ReferenceError: gravity is not defined

if (true) {
  const gravity = 9.81
  console.log(gravity) // 9.81
}
// console.log(gravity), Uncaught ReferenceError: gravity is not defined

for (let i = 0; i < 3; i++) {
  console.log(i) // 1, 2, 3
}
// console.log(i), Uncaught ReferenceError: gravity is not defined
```



所以，我强烈建议您使用 let 和 const，您将编写干净的代码并避免难以调试的错误。

- 可以将 let 用于任何变量
- 将 const 用于任何常量值，以及用于数组、对象、箭头函数和函数表达式。





## Anonymous functions 匿名函数

```js
// Note that there's no function name before the parentheses
let avg = function() {
  let sum = 0;
  for (const item of arguments) {
    sum += item;
  }
  return sum / arguments.length;
};
```

JS 另外提供了一种使用单个表达式同时声明和调用函数的机制：

```js
(function() {
  // …
})();
```



```js
// 递归调用匿名函数
const charsInBody = (function counter(elm) {
  if (elm.nodeType == 3) {   // TEXT_NODE
    return elm.nodeValue.length;
  }
  let count = 0;
  for (let i = 0, child; child = elm.childNodes[i]; i++) {
    count += counter(child);  // 递归调用
  }
  return count;
})(document.body);
```



# 函数式编程 Functional Programming

In this article we will cover all JS functional programming methods:

- forEach
- map
- filter
- reduce
- find
- findIndex
- some
- every





## **forEach** 

```js
const countries = ['Finland', 'Estonia', 'Sweden', 'Norway']
countries.forEach(function (country, index, arr) {
  console.log(i, country.toUpperCase())
})


const numbers = [1, 2, 3, 4, 5]
let sum = 0
numbers.forEach((n) => (sum += n))

console.log(sum) // 15
```



## map filter reduce find

map 总是返回一个数组

```js
const countries = ['Finland', 'Estonia', 'Sweden', 'Norway']

const newCountries = countries.map(function (country) {
  return country.toUpperCase()
})

console.log(newCountries)

// map using an arrow function call back

const countries = ['Finland', 'Estonia', 'Sweden', 'Norway']
const newCountries = countries.map((country) => country.toUpperCase())

console.log(newCountries) // ["FINLAND", "ESTONIA", "SWEDEN", "NORWAY"]


const countries = ['Finland', 'Estonia', 'Sweden', 'Norway']
const countriesLength = countries.map((country) => country.length)

console.log(countriesLength) // [7, 7, 6, 6]
```



**filter 过滤特殊属性的 item ：**

```js
const countries = ['Finland', 'Estonia', 'Sweden', 'Norway', 'Iceland']

const countriesWithLand = countries.filter((country) =>
  country.includes('land')    // 要包含 ’land‘ 这 4 个字母
)
console.log(countriesWithLand) // ["Finland", "Iceland"]

// 选出不包含 'land' 的国家
const countries = ['Finland', 'Estonia', 'Sweden', 'Norway', 'Iceland']
const countriesWithLand = countries.filter((country) => 
  !country.includes('land')
)
console.log(countriesWithLand) // ["Estonia", "Sweden", "Norway"]


// 奇数、偶数
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const evens = numbers.filter((n) => n % 2 === 0)
const odds = numbers.filter((n) => n % 2 !== 0)
console.log(evens) // [0, 2, 4, 6, 8, 10]
console.log(odds) // [1, 3, 5, 7, 9]
```



**reduce**

reduce 返回单个值，类似搅拌机（mixer）把不同的水果混合在一起，你就得到了果汁的混合物。

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始计算操作，最终计算为一个值。

reduce(callback,initiaValue) 会传入两个变量，回调函数(callback) 和 初始值(initiaValue)。

初始值如果不写，默认是 0 

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 如果没写初始值，就默认是 0 
const accum = (acc, cur) => acc + cur
const sum = numbers.reduce(accum,  0 )
console.log(sum) // 55


--------- 
// 如下例:
// 初始值是 5 ，也就是说
// 第一步执行 0+5 = 5
// 第二步执行 1+5 = 6
// 第三步执行 2+6 = 8
// ...
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const sum = numbers.reduce((acc, cur) => acc + cur, 5)
console.log(sum) // 60
```



**find**

> 如果我们对数组中某个项目或元素的第一次出现感兴趣，我们可以使用 find 方法。与 map 和 filter 不同，find 只返回第一次出现的 item 而不是数组。

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 寻找第一次出现的奇数、偶数
const firstEvenNum = numbers.find((n) => n % 2 === 0)
const firstOddNum = numbers.find((n) => n % 2 !== 0)
console.log(firstEvenNum) // 0
console.log(firstOddNum) // 1
```

**findIndex**

>  findIndex 方法的工作方式与 find 类似，findIndex 返回项目的索引。
>
> 如果我们对数组中某个 item  的 index 感兴趣，我们可以使用 findIndex。

```js
const countries = ['Finland', 'Estonia', 'Sweden', 'Norway', 'Iceland']
const index = countries.findIndex((country) => country.length === 6)
console.log(index)   //2
```



## **some** 、every

> some 方法与数组一起使用并返回一个布尔值。如果有一项满足标准，就结果为真，否则为假。

```js
// 定义一个全是偶数的数组
const evens = [0, 2, 4, 6, 8, 10]

const someAreEvens = evens.some((n) => n % 2 === 0)
const someAreOdds = evens.some((n) => n % 2 !== 0)
console.log(someAreEvens) // true ，有偶数
console.log(someAreOdds) // false， 没有一个奇数
```



每个项目都必须满足标准。every 也返回一个布尔值

```js
const evens = [0, 2, 4, 6, 8, 10]
const someAreEvens = evens.some((n) => n % 2 === 0)
const someAreOdds = evens.some((n) => n % 2 !== 0)

console.log(someAreEvens) // true， 确实数组里每一个都是偶数
console.log(someAreOdds)  // false， 有元素不是偶数
```



# class

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    console.log(this) // Check the output from here
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.country = country
    this.city = city
  }
  getFullName() {
    const fullName = this.firstName + ' ' + this.lastName
    return fullName
  }
}

const person1 = new Person('Asabeneh', 'Yetayeh', 250, 'Finland', 'Helsinki')

console.log(person1) //Person {firstName: "Asabeneh", lastName: "Yetayeh", age...
```



## setter/getter

通过 getter、setter 来获取、修改属性值，而不是直接从对象访问属性。

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.country = country
    this.city = city
    this.score = 0
    this.skills = []
  }
  getFullName() {
    const fullName = this.firstName + ' ' + this.lastName
    return fullName
  }
  get getScore() {
    return this.score
  }
  get getSkills() {
    return this.skills
  }
  set setScore(score) {
    this.score += score
  }
  set setSkill(skill) {
    this.skills.push(skill)
  }
}

const person1 = new Person('Asabeneh', 'Yetayeh', 250, 'Finland', 'Helsinki')
const person2 = new Person('Lidiya', 'Tekle', 28, 'Finland', 'Espoo')

person1.setScore = 1
person1.setSkill = 'HTML'
person1.setSkill = 'CSS'
person1.setSkill = 'JavaScript'

person2.setScore = 1
person2.setSkill = 'Planning'
person2.setSkill = 'Managing'
person2.setSkill = 'Organizing'

console.log(person1.score)
console.log(person2.score)

console.log(person1.skills)
console.log(person2.skills)
```











**static 类方法是在类本身上定义的。**

**您不能在对象上调用 `static` 方法，只能在对象类上调用。**

```js
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}

let myCar = new Car("Ford");

// 您可以在 Car 类上调用 'hello()' ：
console.log( Car.hello())
```



## Inheritance 、Overriding

使用继承，我们可以访问父类的所有属性和方法。这减少了代码的重复。

上面有一个 Person 父类，我们将从它创建子类——学生，教师等。

```js
class Student extends Person {
  saySomething() {
    console.log('I am a child of the person class')
  }
}

const s1 = new Student('Asabeneh', 'Yetayeh', 'Finland', 250, 'Helsinki')
console.log(s1)
console.log(s1.saySomething())
console.log(s1.getFullName())
console.log(s1.getPersonInfo())
```



Overriding 可以覆盖父类：

> 在构造函数中，我们调用 super() 函数来访问父类的所有属性。 Person 类没有性别，但现在让我们为子类 Student 赋予性别属性。如果在子类中使用相同的方法名，父方法将被覆盖。 

```js
class Student extends Person {
  constructor(firstName, lastName, age, country, city, gender) {
    super(firstName, lastName, age, country, city)
    this.gender = gender
  }

  saySomething() {
    console.log('I am a child of the person class')
  }
}
```







# Custom objects

```js
function Person(first, last) {
  this.first = first;
  this.last = last;
  this.fullName = function() {
    return this.first + ' ' + this.last;
  };
  this.fullNameReversed = function() {
    return this.last + ', ' + this.first;
  };
}
const s = new Person('Simon', 'Willison');
s.fullNameReversed(); // "Willison, Simon"
```

注意 this 关键字。在函数内部使用，this 指的是当前对象。

`new` 创建一个全新的空对象，然后调用指定的函数，并将 this 设置为该新对象。



这个代码看起来不错，但是仍然有一些丑陋：每次我们定义一个 Person object 时，都会在其中创建两个全新的函数对象——如果共享这段函数定义的代码不是更好吗？

```js
function personFullName() {
  return this.first + ' ' + this.last;
}
function personFullNameReversed() {
  return this.last + ', ' + this.first;
}

function Person(first, last) {
  this.first = first;
  this.last = last;
  this.fullName = personFullName;
  this.fullNameReversed = personFullNameReversed;
}
```

还可以更好：

```js
function Person(first, last) {
  this.first = first;
  this.last = last;
}
Person.prototype.fullName = function() {
  return this.first + ' ' + this.last;
};
Person.prototype.fullNameReversed = function() {
  return this.last + ', ' + this.first;
};
```

`Person.prototype` 是所有 Person 实例共享的对象。













# JS prototype（原型对象）

```js
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
 
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");

// Error:  `已存在构造器` 的对象中 不能添加新的属性：
// 添加一个新属性，必须从构造器函数中开始修改 ：
Person.nationality = "English";
```



**prototype 继承**

所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法：

- `Date` 对象从 `Date.prototype` 继承。
- `Array` 对象从 `Array.prototype` 继承。
- `Person` 对象从 `Person.prototype` 继承。

所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。



so， 使用 **prototype** 属性就可以给对象的构造函数添加新的属性 / 方法：

```js
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
 
Person.prototype.nationality = "English";  // 加新的属性 attribute

Person.prototype.name = function() {       // 添加新的方法 method
  return this.firstName + " " + this.lastName;
};
```



有趣的是：也可以向内置 JavaScript 对象的原型中添加东西。让我们向 String 添加一个方法，以反向返回该字符串：

```js
const s = 'Simon';

String.prototype.reversed = function() {
  let r = '';
  for (let i = this.length - 1; i >= 0; i--) {
    r += this[i];
  }
  return r;
};

s.reversed(); // nomiS
```



如前所述，**prototype** 是 **chain** 的一部分。该链的根是 `Object.prototype`，其方法包括 `toString() ` 

对于调试 `Person` 对象来说，将对象表示为字符串，有时候很有用：

```js
const s = new Person('Simon', 'Willison');

Person.prototype.toString = function() {
  return '<Person: ' + this.fullName() + '>';
}

s.toString(); // "<Person: Simon Willison>"
```



# ES6 高级用法

## **可选链**操作符 ( **`?.`** )

当访问多层对象属性 ( 比如 `res.data.list` )  时，如果属性 `res.data` 为空，则会报引用错误 , 

为此我们不得不这么处理 ( 不美观  )：

```haskell
let dataList = res && res.data && res.data.list
```



可选链 :  对一个可能为 null 或者 undefined 属性进行安全引用：

```haskell
let dataList = res?.data?.list
```

在引用为空 (nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。





## 双问号 ??

````react
value1 ?? value2
````

`??` 在 `value1`和`value2`之间，只有当 `value1 `为 `null`  /  `undefined` 时取 `value2`，否则取 `value1`

> 📢 : `0`,  `false`,  `""` 被认为是有意义的，所以还是取  `value1`）

```js
const obj = {}
const flag = obj.c ?? 'd'
console.log(flag)  // 'd'
 
console.log(0 ?? 1)   // 0
 
console.log("" ?? "foo")   // ""
```



## **&& 和 ||   短路运算符**

这 2 个符号，不论哪个，只要短路，不会继续执行后面的表达式

* &&： 只要碰到了假值(false)，就会短路，并返回该假值

* ||： 只要碰到了真值(true)，就会短路，并返回该真值。(一般用作默认值)

注意：假值有以下6个：

```js
null undefined NaN false  0  ''
```

```js
||: 真值短路返真值    
  console.log( 1 || 3)    // 1
  console.log(true || false); // true
  console.log(NaN || 1); // 1
  console.log('abc' || 123); // ‘abc’
  console.log(0 || '');   // '', 没有遇到真值，返回最后一个

&&: 假值短路返假值
  console.log( 1 && 3)   // 3
  console.log( 1 && null);   // null
  console.log( null && 1 );  // null
  console.log( null && undefined); // null
  console.log( undefined && null); // undefined
```

||: 真值短路返真值    

&&: 假值短路返假值

 This is useful for checking for **null objects** before accessing their attributes:

```js
const name = o && o.getName();
```

或用于缓存值（当虚假值无效时）：Or for caching values (when falsy values are invalid):

```js
// 如果 cachedName 为假则去获取。
const name = cachedName || (cachedName = getName());
```





**`|| `**  

管道操作 , 遇到不为空的就直接返回该值 

```
console.log( 1 || 3)    // 1


console.log( "" || 3)         // 3
console.log( undefined || 3)  // 3 
console.log( 0 || 3)          // 3
console.log( null || 3)       // 3
console.log( false || 3)      // 3 
```





## ... 三点运算

```js
    function fn(a, b, c) {
        return a + b + c;
    }

    const arr = [4, 5, 6];

    // 计算数组中三个数字的和
    let result = fn(...arr);  // 15


    // const arr2 = [...arr]; // 相当于将arr浅复制给arr2
    const arr2 = [1, 2, 3, ...arr, 7, 8, 9, ];


    const obj = {
        name: '孙悟空',
        age: 18,
        gender: '男'
    };

    // const obj2 = {...obj}; // 将obj在新的对象中展开，相当于浅复制
    const obj2 = {address: '花果山', ...obj, name: '猪八戒',};
    // obj2 : {address: '花果山', name: '猪八戒', age: 18, gender: '男'}
```



# 零零散散

## JSON 

- JSON.parse

- JSON Stringify



First, here's a JSON object:

```json
{
  "name": "Jane Doe",
  "favorite-game": "Stardew Valley",
  "subscriber": false
}
```

 JSON 对象和常规 JavaScript 对象（也称为对象字面量 object literal ）之间的主要区别在于**引号**。

 JSON 对象中的所有键和字符串类型值都必须用**双引号 (")** 括起来。



JavaScript 对象字面量更灵活一些 , 可用单引号 , 或者不使用任何类型的引号作为键。

```js
const profile = {
  name: 'Jane Doe',
  'favorite-game': 'Stardew Valley',
  subscriber: false
}
```



在 fetch 等请求中 , 如果 interface 发回了 JSON 字符串 , 

可以直接使用 ` .json()`  方法，可将 JSON 响应自动解析为可用的 JavaScript 对象文字或数组。  like this  : 

```js
$ interface return : 
{"name":"Jane Doe","favorite-game":"Stardew Valley","subscriber":false}

fetch('https://api.chucknorris.io/jokes/random?category=dev')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => console.log(data));
```



### JSON.stringify

字符串化

`JSON.stringify()` also works with arrays.

```js
const newJoke = {
  categories: ['dev'],
  value: "Chuck Norris's keyboard is made up entirely of Cmd keys because Chuck Norris is always in command."
};

console.log(JSON.stringify(newJoke)); // {"categories":["dev"],"value":"Chuck Norris's keyboard is made up entirely of Cmd keys because Chuck Norris is always in command."}

console.log(typeof JSON.stringify(newJoke)); // string
```





### JSON.parse

`JSON.parse() ` 采用 JSON 字符串并将其解析为 JavaScript 对象文字或数组



```js
const jokesFile1 = readFile('./jokes.json');
const jokes1 = JSON.parse(jokesFile1);

console.log(jokes1[0].value);   // "Chuck..."
```





-----

**字符串转数字 :** 

前面加个 + , 轻松字符串转数字 ; 

```js
let a = +"123"

$ typeof a
$ 'number'
```







# QA



## apply() 与 call()

call，apply 都属于 `Function.prototype` 的一个方法，是 JS 引擎内实现的，因为属于 `Function.prototype`，所以每个 Function 对象实例 (就是每个方法) 都有 `call，apply` 属性。

`call（）`方法和`apply（）` 方法的相同点：

1. 都可以调用函数；
2. 都可以改变 this 的指向。

他们的**区别**在于接收参数的方式不同：

* `call（）`：接受多个参数， 第一个参数是 this 指向的对象，后面的参数均是传入Function的参数，有两个就是传给Function两个参数，有三个就是传了三个，有几个传几个；

* `apply（）`：只有两个参数，第一个参数是 this 指向的对象，第二个参数是传入Funtion的参数组成的数组。



- `B.apply(A, arguments);`  即 A 对象应用 B 对象的方法。
- `B.call(A, args1,args2);` 即 A 对象调用 B 对象的方法

```js
    function A(){
        this.flag = 'A';
        this.tip = function(){
            alert(this.flag);
        };
    }
    function B(){
        this.flag = 'B';
    }
    var a = new A();
    var b = new B();
    //a.tip.call(b);
    a.tip.apply(b);
```

无论是` a.tip.call(b) ;` 和 ` a.tip.apply(b);` 运行的结果都是弹出 B 。

从结果中可以看出 `call` 和 `apply` 都可以让 B 对象调用 A 对象的 tip 方法，并且修改了 this 的当前作用对象。



**apply的一些其他巧妙用法**

1. `Math.max ` 可以实现得到数组中最大的一项：

因为 `Math.max` 不支持 `Math.max([param1,param2])` 也就是数组，但是它支持 `Math.max(param1,param2...)` ，所以可以根据 apply 的特点来解决 :

```js
var max=Math.max.apply(null,array)
```

apply 会将一个数组转换为一个参数接一个参数的方式传递给方法）

这块在调用的时候第一个参数给了 null，这是因为没有对象去调用这个方法，我只需要用这个方法帮我运算，得到返回的结果就行，所以直接传递了一个null过去。

```js
<script type="text/javascript">
    //求数组中的最大项
    var arr = [1,3,5,7,8,9,12,45];
    var max = Math.max.apply(null,arr);
    console.log(max);
    //求数组最小值
    var min = Math.min.apply(null,arr);
    console.log(min);
</script>
```



2. `Array.prototype.push` 可以实现两个数组的合并

同样`push`方法没有提供`push`一个**数组**，但是它提供了 `push(param1,param2...paramN)`，同样也可以用 `apply` 来转换一下这个数组，即：

```js
var arr1=new Array("1","2","3");
var arr2=new Array("4","5","6");
Array.prototype.push.apply(arr1,arr2);    //得到合并后数组的长度，因为push就是返回一个数组的长度
```



## Closures 闭包

This leads us to one of the most **powerful** abstractions that JavaScript has to offer 

— but also the most confusing. What does this do?

```js
function makeAdder(a) {
  return function(b) {
    return a + b;
  };
}
const add5 = makeAdder(5);
const add20 = makeAdder(20);
add5(6); // ?
add20(7); // ?

//makeAdder 是一个加法器

add5(6); // returns 11
add20(7); // returns 27
```









## 箭头函数:

ES6中允许使用箭头`=>`来定义箭头函数，具体语法，我们来看一个简单的例子：

```js
// 箭头函数
let fun = (name) => {
    // 函数体
    return `Hello ${name} !`;
};

// 等同于
let fun = function (name) {
    // 函数体
    return `Hello ${name} !`;
};
```

可以看出，定义箭头函在数语法上要比普通函数简洁得多。箭头函数省去了`function`关键字，采用箭头`=>`来定义函数。函数的参数放在`=>`前面的括号中，函数体跟在`=>`后的花括号中。

**关于箭头函数的参数：**

**①** 如果箭头函数没有参数，直接写一个空括号即可。

**②** 如果箭头函数的参数只有一个，也可以省去包裹参数的括号。

**③** 如果箭头函数有多个参数，将参数依次用逗号(,)分隔，包裹在括号中即可。

```js
// 没有参数
let fun1 = () => {
    console.log(111);
};

// 只有一个参数，可以省去参数括号
let fun2 = name => {
    console.log(`Hello ${name} !`)
};

// 有多个参数
let fun3 = (val1, val2, val3) => {
    return [val1, val2, val3];
};
```





**关于箭头函数的函数体：**

**①**如果箭头函数的函数体只有一句代码，就是简单返回某个变量或者返回一个简单的JS表达式，可以省去函数体的大括号{ }。

```js
let f = val => val;
// 等同于
let f = function (val) { return val };

let sum = (num1, num2) => num1 + num2;
// 等同于
let sum = function(num1, num2) {
  return num1 + num2;
};
```



**②**如果箭头函数的函数体只有一句代码，就是返回一个对象，可以像下面这样写：

```js
// 用小括号包裹要返回的对象，不报错
let getTempItem = id => ({ id: id, name: "Temp" });

// 但绝不能这样写，会报错。
// 因为对象的大括号会被解释为函数体的大括号
let getTempItem = id => { id: id, name: "Temp" };
```



**③**如果箭头函数的函数体只有一条语句并且不需要返回值（最常见是调用一个函数），可以给这条语句前面加一个`void`关键字

```js
let fn = () => void doesNotReturn();
```



箭头函数最常见的用处就是简化回调函数。

```js
// 例子一
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);

// 例子二
// 正常函数写法
var result = [2, 5, 1, 4, 3].sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = [2, 5, 1, 4, 3].sort((a, b) => a - b);
```



## 回调函数 (callback)

```js
unction test(value){   //这就是回调函数
    console.log(value)
}
function main(test,value){ //test作为一个参数传递进来
    console.log(value)   
    test(value)     // 我是回调函数
}
main(test,'我是回调函数')
```

当那一个主函数执行完之后，再执行传进去的作为参数的函数。走这个过程的参数化的函数 就叫做回调函数。

换个说法也就是被作为参数传递到另一个函数（主函数）的那个函数就叫做 **回调函数**。



## this

JavaScript函数中的this不是在函数声明的时候定义的，而是在函数调用（即运行）的时候定义的

**“调用者” 不同会导致 this 的不同**







## Computed property 计算属性







## 阅读 React 的三点

- We define variables with [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) and [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements. For the purposes of the React documentation, you can consider them equivalent to [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) .

- We use the `class` keyword to define [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). There are two things worth remembering about them. Firstly, unlike with objects, you *don't* need to put commas between class method definitions. Secondly, unlike many other languages with classes, in JavaScript the value of `this` in a method [depends on how it is called](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Boxing_with_prototype_and_static_methods).

- We sometimes use `=>` to define ["arrow functions"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). They're like regular functions, but shorter. For example, `x => x * 2` is roughly equivalent to `function(x) { return x * 2; }`. Importantly, arrow functions [don't have their own `this` value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this) so they're handy when you want to preserve the `this` value from an outer method definition.

- 我们使用 class 关键字来定义 JavaScript 类。关于他们，有两件事值得记住。首先，与对象不同，您不需要在类方法定义之间放置逗号。其次，与许多其他具有类的语言不同，在 JavaScript 中，方法中 this 的值取决于它的调用方式。

  我们有时使用 => 来定义“箭头函数”。它们就像常规函数，但更短。例如，x => x * 2 大致等价于 function(x) { return x * 2; }。重要的是，箭头函数没有自己的 this 值，因此当您想从外部方法定义中保留 this 值时，它们很方便。