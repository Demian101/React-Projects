## **高效 TS 代码**

1. **尽量减少重复代码**

对于刚接触 TypeScript 的小伙伴来说，在定义接口时，可能一不小心会出现以下类似的重复代码。比如：

```ts
interface Person {  
  firstName: string; 
  lastName: string;
}

interface PersonWithBirthDate { 
  firstName: string;  
  lastName: string; 
  birth: Date;
}
```

很明显，相对于 `Person` 接口来说，`PersonWithBirthDate` 接口只是多了一个 `birth` 属性，其他的属性跟 `Person` 接口是一样的。那么如何避免出现例子中的重复代码呢？要解决这个问题，可以利用 `extends` 关键字：

```ts
interface Person {  
  firstName: string;  
  lastName: string;
}

interface PersonWithBirthDate extends Person { 
  birth: Date;
}
```

当然除了使用 `extends` 关键字之外，也可以使用交叉运算符（&）：

```ts
type PersonWithBirthDate = Person & { birth: Date };
```





另外，有时候你可能还会发现自己想要定义一个类型来匹配一个初始配置对象的「形状」，比如：

```ts
const INIT_OPTIONS = { 
  width: 640, 
  height: 480,
  color: "#00FF00", 
  label: "VGA",
};

interface Options {
  width: number; 
  height: number;
  color: string; 
  label: string;
}
```

其实，对于 Options 接口来说，你也可以使用 typeof 操作符来快速获取配置对象的「形状」：

```ts
const INIT_OPTIONS = { 
  width: 640, 
  height: 480,
  color: "#00FF00", 
  label: "VGA",
};


type Options = typeof INIT_OPTIONS  // 获取其「形状」
const obj: Options = { 
  width:100,height:50,color: 'blue', label: 'OA'
}
console.log(obj)
/* 
[LOG]: {
  "width": 333,
  "height": 333,
  "color": "aa",
  "label": "ddd"
} 
*/
```



----

在实际的开发过程中，重复的类型并不总是那么容易被发现。有时它们会被语法所掩盖。比如有多个函数拥有相同的类型签名：

```ts
function get(url: string, opts: Options): Promise<Response> { /* ... */ } 
function post(url: string, opts: Options): Promise<Response> { /* ... */ }
```

对于上面的 get 和 post 方法，为了避免重复的代码，你可以提取统一的类型签名：

```ts
type HTTPFunction = (url: string, opts: Options) => Promise<Response>; 
const get: HTTPFunction = (url, opts) => { /* ... */ };
const post: HTTPFunction = (url, opts) => { /* ... */ };
```



**2. 使用更精确的类型替代字符串类型**

假设你正在构建一个音乐集，并希望为专辑定义一个类型。这时你可以使用 `interface` 关键字来定义一个 `Album` 类型：

```ts
interface Album { 
  artist: string; // 艺术家 
  title: string; // 专辑标题 
  releaseDate: string; // 发行日期：YYYY-MM-DD  
  recordingType: string; // 录制类型："live" 或 "studio"
}
```

你会发现, 其实没有办法控制 releaseDate 和 recordingType 被滥用 , 所以应该

为 `releaseDate` 和 `recordingType` 属性定义**更精确的类型**，比如这样：

```ts
interface Album {
  ..
  releaseDate: Date;   // Date 类型
  recordingType: "studio" | "live";   // 录制类型："live" 或 "studio"
}

// 正确调用: 
const dangerous: Album = { 
  artist: "Michael Jackson", 
  title: "Dangerous", 
  releaseDate: new Date("1991-11-31"), 
  recordingType: "studio",
};
```





3. **定义的类型总是表示有效的状态**

```ts
interface State { 
  pageContent: string;  
  isLoading: boolean; 
  errorMsg?: string;
}
```

接着你会定义一个 `renderPage` 函数，用来渲染页面：

```ts
function renderPage(state: State) { 
  if (state.errorMsg) {  
    return `呜呜呜，加载页面出现异常了...${state.errorMsg}`; 
  } else if (state.isLoading) { 
    return `页面加载中~~~`; 
  }  
  return `<div>${state.pageContent}</div>`;
}

// 输出结果：页面加载中~~~
console.log(renderPage({isLoading: true, pageContent: ""}));
// 输出结果：<div>大家好</div>
console.log(renderPage({isLoading: false, pageContent: "大家好呀"}));
```



创建好 `renderPage` 函数，你可以继续定义一个 `changePage` 函数，用于根据页码获取对应的页面数据：

```ts
async function changePage(state: State, newPage: string) {  
  state.isLoading = true;  
  try {  
    const response = await fetch(getUrlForPage(newPage));  
    if (!response.ok) {   
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);   
    }   
    const text = await response.text(); 
    state.isLoading = false; 
    state.pageContent = text; 
  } catch (e) {   
    state.errorMsg = "" + e; 
  }
}
```

对于以上的 `changePage` 函数 (写得很烂) ，它存在以下问题：

- 在 catch 语句中，未把 `state.isLoading` 的状态设置为 `false`；
- 未及时清理 `state.errorMsg` 的值，因此如果之前的请求失败，那么你将继续看到错误消息，而不是加载消息。

出现上述问题的原因是:  前面定义的 `State` 类型允许同时设置 `isLoading` 和 `errorMsg` 的值，尽管这是一种无效的状态。针对这个问题，你可以考虑引入**可辨识联合类型**来定义不同的页面请求状态：

```ts
interface RequestPending { 
  state: "pending";   // 请求中
}

interface RequestError {  
  state: "error";    // 请求错误
  errorMsg: string;
}

interface RequestSuccess {  
  state: "ok";    // 请求成功
  pageContent: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State { 
  currentPage: string;
  requests: { [page: string]: RequestState };
}
```

在以上代码中，通过使用可辨识联合类型分别定义了 3 种不同的请求状态，这样就可以很容易的区分出不同的请求状态，从而让业务逻辑处理更加清晰。接下来，需要基于更新后的 `State` 类型，来分别更新一下前面创建的 `renderPage` 和 `changePage` 函数：



**更新后的 renderPage 函数**

```ts
function renderPage(state: State) { 
  const { currentPage } = state; 
  const requestState = state.requests[currentPage]; 
  switch (requestState.state) {  
    case "pending":     
      return `页面加载中~~~`;  
    case "error":    
      return `呜呜呜，加载第 ${currentPage}页出现异常了...${requestState.errorMsg}`;  
    case "ok":     
      `<div>第 ${currentPage}页的内容：${requestState.pageContent}</div>`;  
   }
}
```



**更新后的 changePage 函数**

1. 一开始的状态被设置为 Pending 
2. 后面开始请求 , 状态要么失败,  要么成功

```ts
async function changePage(state: State, newPage: string) {
  state.requests[newPage] = { state: "pending" };
  state.currentPage = newPage;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`无法正常加载页面 ${newPage}: ${response.statusText}`);
    }
    const pageContent = await response.text();
    state.requests[newPage] = { state: "ok", pageContent };
  } catch (e) {
    state.requests[newPage] = { state: "error", errorMsg: "" + e };
  }
}
```

在 `changePage` 函数中，会根据不同的情形设置不同的请求状态，而不同的请求状态会包含不同的信息。

这样 `renderPage` 函数就可以根据统一的  `state` 属性值来进行相应的处理。

因此，通过使用可辨识联合类型，让请求的每种状态都是有效的状态，不会出现无效状态的问题。



## **为什么需要TypeScript?**

简单来说就是因为
- JavaScript 是弱类型, 很多错误只有在运行时才会被发现
- TypeScript 提供了一套静态检测机制, 可以帮助我们在编译时就发现错误



**TypeScript特点**

- 支持最新的 JavaScript 新特特性
- 支持代码静态检查
- 支持诸如 C, C++, Java, Go 等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)



## **搭建 Typescript 学习环境**

安装**最新版 typescript**

```
npm i -g typescript
```



**安装ts-node**

```text
npm i -g ts-node
```



**创建一个 tsconfig.json 文件**

```text
tsc --init
```



**然后新建index.ts,输入相关练习代码，然后执行 **

```
ts-node index.ts
```



官方也提供了一个在线开发 TypeScript 的云环境——**Playground**: 

https://www.typescriptlang.org/play



## **基础数据类型**

**JS的八种内置类型**

```text
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
```



*默认情况下 `null` 和 `undefined` 是所有类型的子类型。就是说你可以把 `null` 和 `undefined` 赋值给其他类型。*



-----

**bigInt VS number**

建议仅在合理预期大于 $2^53$  的值时才使用 BigInt，而不是在这两种类型之间进行强制转换





### **Array**

对数组类型的定义有两种方式：

```typescript
let arr:string[] = ["1","2"];
let arr2:Array<string> = ["1","2"]；
```



**联合类型数组 :**

```tsx
let arr:(number | string)[];
// 表示定义了一个名称叫做arr的数组,
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr3 = [1, 'b', 2, 'c'];
```



**定义指定对象成员的数组：**

```tsx
// interface是接口,后面会讲到
interface Arrobj{   
    name:string, 
    age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]
```





## Function

**Declaration **声明

```tsx
function sum(x: number, y: number): number {  
    return x + y;
}

const sum = function (x: number, y: number): number {
    return x + y;
}
```



**函数表达式**

```tsx
// JS :
const mySum = (x,y) => {
  //
}

// TS :
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {   
    return x + y;
};
```



**=> 箭头函数**

```tsx
// 或者 (这样写看起来多好!!!) 
const sum =  (x: number, y: number) => {
    return x + y;
}
console.log(sum(9,7))

const sum = (x: number, y: number) => x + y;   // OK
```





**用接口定义函数类型**

```tsx
interface SearchFunc{ 
  (source: string, subString: string): boolean;
}
```

采用函数表达式接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

### 参数声明

**可选参数** 

如下例 :  lastName 可以传 , 也可以不传 

```tsx
function buildName(firstName: string, lastName?: string) { 
    if (lastName) {      
        return firstName + ' ' + lastName;   
    } else {     
        return firstName;   
    }
}
let tom1 = buildName('Tom', 'Cat');
let tom2 = buildName('Tom');   // OK
```

*可选参数 后 不允许再出现必需参数*



**参数默认值**

当调用者没有传该参数或者传入了`undefined`时，默认值生效。

```tsx
function buildName(firstName: string, lastName: string = 'Cat') {   
    return firstName + ' ' + lastName;
}
let tom1 = buildName('Tom', 'Cat');  // 'Tom Cat'
let tom2 = buildName('Tom');   // 'Tom Cat'
```



**剩余参数**

```tsx
function push(array: any[], ...items: any[]) {   
    items.forEach(function(item) {     
        array.push(item);  
    });
}
let arr = ['ho', 'lo'];  // 数组
push(arr, 1, 2, 3);  // 剩余参数
console.log(arr)     // [LOG]: ["ho", "lo", 1, 2, 3] 

```



### **函数重载**

JS 中可以这样 : 

```js
function add(x, y) { 
 return x + y;
}
add(1, 2); // 3
add("1", "2"); //"12"
```

由于 TypeScript 是 JavaScript 的超集，因此以上的代码可以直接在 TypeScript 中使用，但当 TypeScript 编译器开启 `noImplicitAny` 的配置项时，以上代码就会提示以下错误信息：

```red
Parameter 'x' implicitly has an 'any' type.
Parameter 'y' implicitly has an 'any' type.
```

该信息告诉我们参数 x 和参数 y 隐式具有 `any` 类型。为了解决这个问题，我们可以为参数设置一个类型。

因为我们希望 `add` 函数同时支持 string 和 number 类型，因此我们可以定义一个 `string | number` 联合类型，同时我们为该联合类型取个别名：`Combinable` :

```tsx
type Combinable = string | number;
```

在定义完 `Combinable` 联合类型后，我们来更新一下 `add` 函数： 

```tsx
function add(a: Combinable, b: Combinable) {  
    if (typeof a === 'string' || typeof b === 'string') {    
     return a.toString() + b.toString();   
    }  
    return a + b;
}
```

为 `add` 函数的参数显式设置类型之后，之前错误的提示消息就消失了。那么此时的 `add` 函数就完美了么，我们来实际测试一下：

```tsx
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

在上面代码中，我们调 add() 返回 `result` ，这时 , 我们本以为 result 为 string 类型，所以可以调 `split` 方法。

但是 ! 这时 TypeScript 编译器报错 :

```
Property 'split' does not exist on type 'number'.
```

result 变成 number 类型了..... 可能是 return a + b 导致编译器认为返回值是个 number 吧...



那如何解决呢？这时我们就可以利用 TypeScript 提供的函数重载特性。

> 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
>
>  要解决前面遇到的问题，方法就是为同一个函数**提供多个函数类型定义来进行函数重载**，
>
> 编译器会根据这个列表去处理函数的调用。

```tsx
type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {  
  if (typeof a === 'string' || typeof b === 'string') {  
    return a.toString() + b.toString(); 
  }  
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

在以上代码中，我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。

之后，可恶的错误消息又消失了，因为这时 result 变量的类型是 `string` 类型。



## **Tuple(元组)**

JS 中没有元组，Tuple 是 TypeScript 中特有的类型，其工作方式类似于数组。

元组最重要的特性是可以限制 `数组元素的个数和类型`，它特别适合用来实现多值返回。



例子 : 用于保存定长定数据类型的数据

```tsx
let x: [string, number]; 
// 类型必须匹配且个数必须为2

x = ['hello', 10];    // OK  √ 
x = ['hello', 10,10]; // Error  ×
x = [10, 'hello'];    // Error  ×
```

注意，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接`any[]`



### **Tuple 解构赋值**

可以通过下标访问元组中的元素，当元组中的元素较多时，这种方式并不是那么便捷。

元组也是支持解构赋值的：

```tsx
let employee: [number, string] = [1, "Semlinker"];
let [id, username] = employee;   // 解构赋值 
console.log(`id: ${id}`);
console.log(`username: ${username}`);
```



### **可选元素**

定义元组类型时，可以通过  `?` 来声明 Tuple 的可选元素 ：

```tsx
let optionalTuple: [string, boolean?];

// 这 2 种赋值都是被允许的:
optionalTuple = ["Semlinker", true];
optionalTuple = ["Kakuqo"];
```



实例 : 在三维坐标轴中，一个坐标可以使用 `(x, y, z)` 的形式来表示，也可以使用 `(x, y)` 的形式来表示，而对于一维坐标轴来说，只要使用 `(x)` 的形式来表示即可。

```tsx
type Point = [number, number?, number?];

const x: Point = [10];           // 表示一维坐标点
const xy: Point = [10, 20];      // 二维 Point
const xyz: Point = [10, 20, 10]; // 三维
```



### **剩余元素**

元组类型里最后一个元素可以是剩余元素，形式为 `...X`，这里 `X` 是数组类型。

**剩余元素代表元组类型是开放的，可以有零个或多个额外的元素。** 

例如，`[number, ...string[]]` 表示 1  `number` 元素 和 任意数量`string` 类型元素的元组类型。

```tsx
type RType = [number, ...string[]];
const restTuple: RType = [1, '赵信'];     // OK
const restTuple: RType = [1, '赵信', '吕布', '亚索']; // ok

换种写法:

let arr: [number, ...string[]];
arr = [1, '赵信'];   // ok
arr = [1, '赵信', '吕布', '亚索'];   // ok
```



### readonly Tuple 只读

可以为任何元组类型加上`readonly`关键字前缀，使其成为只读元组：

```tsx
const arr: readonly [string, number] = ['断剑', 666];
```



在使用`readonly`关键字修饰元组类型后，任何企图改变元组中元素的操作都会报错：

```tsx
// Cannot assign to '0' because it is a read-only property
arr[0] = '归来';

// Property 'push' does not exist on type 'readonly [number, string]'
arr.push(6);
```



## Type

### any / unknown 

`any` 类型是类型系统的**顶级类型** , 任何类型都可以被归为 `any` 类型 

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

```tsx
let a: string = 'a string';
a = 100 ;    // Error Type 'number' is not assignable to type 'string'
```

但如果是`any`类型，则允许被赋值为任意类型：

```tsx
let a: any = 666;
a = '哈哈哈';
a = false;
a = null;
a = undfined;
a = [];
a = {};
```



如果变量在声明的时候，未指定其类型，那么它会被识别为`any`类型：

```tsx
let something;   // 等价于： let something: any;
something = '啦啦啦';
something = 888;
something = false;
```

使用 `any` 类型就失去了使用 `TS` 的意义，长此以往会放松我们对自己的要求，尽量不要使用`any`。

为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。



----

`unknown`与`any`十分相似，所有类型都可以分配给`unknown`类型：

```tsx
let a: unknown = 250;
a = '面对疾风吧!';
a = true;
```

`unknown`与`any`最大的区别是：**任何类型的值都可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型 。**

**任何类型的值都可以赋值给`unknown`，但`unknown`类型的值只能赋值给`unknown`和`any`**：

```tsx
let n_num: any = 100
let s_str:string = "i am str"
s_str = n_num
console.log(typeof(s_str), s_str)  // "number", 100 
// 上例说明 , any 可以改变元素类型

let notSure: unknown = 4;
let uncertain: any = notSure;   // unknown 赋值给 any , OK

let notSure: any = 4;
let uncertain: unknown = notSure; // any 赋值给 unknown , OK

let notSure: unknown = 4;
let uncertain: number = notSure; // Error , unknown 赋值给 number : unknown 只能赋值给 unknown & any
```



如果不缩小类型，就无法对`unknown`类型执行任何操作

我们可以使用`typeof`或者`类型断言`等方式来缩小未知范围：

> 这种机制起到了很强的预防性，更安全。

```tsx
const a: unknown = '超神!';
a.split('');  // error

if (typeof a === 'string') {
    console.log( a.split('') )  // ["超", "神", "!"]
}  // ok


// 类型断言，后面会讲到
(a as string).split('');   // ok
```





### void / never

`void`表示没有任何类型，和其它类型是平等关系，不能直接赋值：

```tsx
let a: void;
let b: number = a; // Type 'void' is not assignable to type 'number'
```

声明一个`void`类型的变量没有什么意义，一般只有在函数没有返回值时才会使用到它。



值得注意的是，方法没有返回值将得到 `undefined`，但是我们需要定义成`void`类型，而不是`undefined`类型。否则将报错:

```tsx
function fun(): undefined {  
  console.log("this is TypeScript");
};
fun(); // Error : A function whose declared type is neither 'void' nor 'any' must return a value.
       // 声明类型既不是“void”也不是“any”的函数必须返回一个值 !

// 需要改成: 
function fun(): any   // 或
function fun(): void
```



-----

**never**

`never` 类型表示的是那些永不存在的值的类型。

值会永不存在的两种情况：

1. 如果一个函数执行时**抛出了异常**，那么这个函数就永远不存在返回值；
2. 函数中执行**无限循环**的代码，也就是死循环。



```tsx
// 抛出异常
function error(msg: string): never { // ok
    throw new Error(msg);
}

// 死循环
function loopForever(): never { // ok
    while (true) {}
}
```



在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：

```tsx
type Type = string | number;

function inspectWithNever(param: Type) {
    if (typeof param === 'string') {
        // 在这里收窄为 string 类型
    } else if (typeof param === 'number') {
        // 在这里收窄为 number 类型
    } else {
        // 在这里是 never 类型
        const check: never = param;
    }
}
```

在 else 分支里，我们把不是 `string  / number`类型的 `param` 赋值给了一个显式声明的 `never` 类型的 check ，

如果一切逻辑正确，那么就可以编译通过。假如有一天你的同事修改了`Type`的类型：

```
type Type = string | number | boolean;
```

然而他忘记了同时修改`inspectWithNever`方法中的控制流程，

这时`else`分支的 `param` 类型会被收窄为 `boolean` 类型，导致无法赋值给 `never` 类型，此时就会出现一个错误提示。

**通过这种方法，我们可以确保`inspectWithNever(never 检查)`方法总是穷尽了 `Type`的所有可能类型，使得代码的类型绝对安全。**



### object、Object、{}

- object：以下称 `小 object`
- Object：以下称 `大 Object`
- {}：以下称 `空对象`

`小object`代表的是所有非原始类型，也就是说我们不能把`number` `string`等原始类型赋值给`小object`。在严格模式下，`null`和`undefined`类型也不能赋值给`小object`。

```tsx
以下类型被视为原始类型： string、number、boolean、null、undefined、bigInt、symbol。
```



`小object`代表的是所有非原始类型，也就是说我们不能把`number` `string`等原始类型赋值给`小object`。

>  严格模式下，`null` 和 `undefined` 类型也不能赋给 object。

`大Object`代表所有拥有`toString` `hasOwnProperty`方法的类型，所以，所有原始类型和非原始类型都可以赋值给`大Object`。

> 同样，在严格模式下`null`和 `undefined`类型也不能赋给 `大Object`：

```tsx
let obj: object;

obj = 1;   // error
obj = '人在塔在!'; // error
obj = true;   // error

---------↑ ↓---------------

let obj: Object;

obj = 1;   // ok
obj = '人在塔在!'; // ok
obj = true;  // ok
```



从上面的栗子中可以看出，`大Object`包含原始类型，而`小object`仅包含非原始类型。

你可能会想，那么`大Object`是不是`小object`的父类型？实际上，`大Object`不仅是`小object`的父类型，同时也是 `小object`的子类型。为了证明这一点，我们举个栗子：

```tsx
type FatherType = object extends Object ? true : false; // true
type ChildType  = Object extends object ? true : false; // true
```

**注意：** 尽管官网文档上说可以使用`小object`代替`大Object`，但是我们任需知道它们之间的区别。

`空对象`和`大Object`可以互相代替，它们两的特性一致。



### Number、String、Boolean、Symbol

首字母大写的`Number` `String` `Boolean` `Symbol`很容易与小写的原始类型`number` `string` `boolean` `symbol`混淆，前者是相应原始类型的**包装对象**，我愿称之为**对象类型**。

从类型兼容性上看，对象类型兼容对应的原始类型，而反过来原始类型不兼容对应的对象类型：

```
let a: number = 520;
let b: Number = 250;

a = b; // Type 'Number' is not assignable to type 'number'
b = a; // ok
复制代码
```

**注意：** 不要使用对象类型来注解值的类型，没有任何意义。



### **类型推断**

很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解 : 

```tsx
let str: string = '我的大刀早已饥渴难耐!';  // let str: string
let num: number = 250;   // let num: number
let bool: boolean = false;   // let bool: boolean

const str: string = '我的大刀早已饥渴难耐!';   // const str: string
const num: number = 250;   // const num: number
const bool: boolean = false;   // const bool: boolean
```

在 TS 中，函数返回值、具有初始化值的变量、有默认值的函数参数的类型都可以根据上下文推断出来。

例如根据 return 语句推断函数返回值的类型：

```tsx
{
  /** 根据参数的类型，推断出返回值的类型也是 number */ 
  function add1(a: number, b: number) {   
    return a + b;  
  } 
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number   
  
  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */ 
  function add2(a: number, b = 1) {  
    return a + b; 
  } 
  const x2 = add2(1); 
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
}
```

再次强调 : 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断为`any`类型：

```tsx
let a; // let a: any
a = '你的剑，就是我的剑';
a = 666;
a = true;
```



### 类型断言/ 非空断言 / 确定赋值断言

有时候我们会遇到这样的情况，你会比 TS 更了解某个值的详细信息，你清楚的知道它的类型比现有类型更加确切：

```tsx
const arr: number[] = [1, 2, 3];
const res: number = arr.find(num => num > 2); // Type 'undefined' is not assignable to type 'number'
```

上例中，`arr.find(num => num > 2)` 的值一定是 3，所以 res 的类型应该是 `number`。

但是 TS 的类型检测无法做到绝对智能，在 TS 看来，`res`的类型既可能是`number`也可能是`undefined`，所以报错

此时，`类型断言`就派上用场了。类型断言是一种**笃定**的方式，它只作用于类型层面的强制类型转换（可以理解成一种暂时的善意的谎言，不会影响运行效果），告诉编译器应该按照我们的方式来做类型检查。

```tsx
// as 语法
const arr: number[] = [1, 2, 3]; 
const res: number = arr.find(num => num > 2) as number;


let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;


// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

> **注意：** 以上两种语法虽然没有区别，但是 `尖括号` 格式会与 react 中的 JSX 产生语法冲突，因此更推荐使用`as`语法。



-----

**非空断言**

当类型检查系统无法从上下文中断定类型时，非空断言操作符`!`可以用来断言操作对象是非`null`和`undefined`类型。

简单说就是，`v!`  将从 v 的值域中排除掉  `null` 和 `undefined`： 

```tsx
let a_: null | undefined | string;
a_!.toString(); // ok
a_.toString();  // ts(2531)

// --- 

type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {  
  // Object is possibly 'undefined'.(2532) 
  // Cannot invoke an object which is possibly 'undefined'.(2722) 
  const num1 = numGenerator();  // Error 
  const num2 = numGenerator!(); //OK
}
```



-----

**确定赋值断言**

允许在实例属性和变量声明后面放置一个 `!` 号，从而告诉 TypeScript 该属性会被明确地赋值。

```tsx
let x: number;
initialize();

console.log(x + 1); // Variable 'x' is used before being assigned

function initialize() {
    x = 1;
}
// 很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言：

let x!: number;
initialize();
console.log(x + 1);   // Ok

function initialize() { 
  x = 1;
}
```

> 通过`let x!: number`确定赋值断言，TS 编译器就会知道该属性会被明确地赋值。
>
> **注意：** `!`不要轻易使用，如果值本身就是`null`或者`undefined`，使用`!`仅仅是绕过了检查，程序仍会报错。





### 字面量类型

你可以使用一个字符串字面量作为一个类型：

```ts
let foo: 'Hello';

// 注意写法 ↑
// 不是  let foo = 'Hello'
//也不是 let foo: string
```

在这里，我们创建了一个被称为 `foo` 变量，其类型为 `'Hello'`  , 它仅接收一个字面量值为 `Hello` 的变量：

```ts
let foo: 'Hello';
foo = 'Bar';    // Error: 'bar' 不能赋值给类型 'Hello'
```

上例本身并不是很实用 ,  但是可以在一个联合类型中组合创建一个强大的（实用的）抽象：

```ts
// 4 个基本方向
type CardinalDirection = 'North' | 'East' | 'South' | 'West';

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North'); // ok
move(1, 'Nurth'); // Error
```



TypeScript 同样也提供  `boolean` 和 `number` 的字面量类型：

```tsx
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```





```tsx
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
```



### let 和 const



我们先来看一个 const 示例，如下代码所示：

```ts
{  
  const str = 'this is string'; // str: 'this is string' 
  const num = 1; // num: 1 
  const bool = true; // bool: true
}
```

在上述代码中，我们将 **const 定义为一个不可变更的常量**，在缺省类型注解的情况下，

TypeScript 推断出它的类型直接由**赋值字面量**的类型决定，这也是一种比较合理的设计。

- str 的类型是字面量类型 `'this is string'` 



接下来我们看看如下所示的 let 示例:

```ts
{ 

  let str = 'this is string'; // str: string 
  let num = 1; // num: number 
  let bool = true; // bool: boolean
}
```

在上述代码中，缺省显式类型注解的可变更的变量的类型转换为了赋值字面量类型的父类型，

- str 的类型是 :  ` 'this is string' 类型` （字面量类型）的父类型 string，

- num 类型是:   `1 类型` (字面量类型) 的父类型 number。



----

### **类型拓宽**

所有通过 `let` 和 `var` 定义的**变量、函数形参、对象的非只读属性**，如果满足指定了初始值且**未显式添加类型**注解的条件，

那么它们推断出来的类型就是指定的**初始值字面量类型拓宽后的类型**，这就是字面量类型拓宽。

```tsx
let str = '我用双手成就你的梦想'; // str: string

let fn = (x = '奉均衡之命!') => x; // fn: (x?: string) => string  ,x? 可选类型

const a = '明智之选';   // a: '明智之选' , 是字面量类型, 不是 string .
let b = a; // b: string
let func = (c = a) => c;  // func: (c?: string) => string , 这个是推断出来的.. ?
```

除了字面量类型拓宽之外，TS 对某些特定类型值也有类似类型拓宽的设计。

例如对`null`和`undefined`的类型进行拓宽: 

- `let` `var`定义的变量如果满足**未显式添加类型**注解且被赋予了 `null` 或 `undefined`值，则推断出这些变量的类型为`any`：

```js
let x = null; // x: any
let y = undefined; // y: any

const a = null; // a: null;
const b = undefined; // b: undefined
```



再来个栗子强化下：

```tsx
type ObjType = {
    a: number;
    b: number;
    c: number;
}

type KeyType = 'a' | 'b' | 'c';

function fn(object: ObjType, key: KeyType) {
    return object[key];
}

let object = {a: 123, b: 456, c: 789};
let key = 'a';
fn(object, key); // Argument of type 'string' is not assignable to parameter of type '"a" | "b" | "c"'
```

看起来似乎挺正常，可为啥会提示错误信息呢？这是因为变量key的类型被推断成了string类型（类型拓宽），但是函数期望它的第二个参数是一个更具体的类型，所以报错。

TS 提供了一些控制拓宽过程的方法，其中一种是使用 `const`，如果用 `const` 声明一个变量，那么它的类型会更窄：

```tsx
type ObjType = {
    a: number;
    b: number;
    c: number;
}

type KeyType = 'a' | 'b' | 'c';

function fn(object: ObjType, key: KeyType) {
    return object[key];
}

let object = {a: 123, b: 456, c: 789};
const key = 'a'; // ok
fn(object, key);
```

我们使用`const`成功解决了上面的报错问题。



然而 `const` 有时却不起作用：

```tsx
const obj = {
    x: 250,
}

obj.x = 520; // ok
obj.x = '520'; // Type 'string' is not assignable to type 'number'
obj.y = 1314; // Property 'y' does not exist on type '{ x: number; }'

```

对于对象 obj 而言，TS 的拓宽算法会将其内部属性 { x: 250 } 视为  `let`关键字声明的变量，进而来推断其属性的类型。

因此，`obj `的类型为 `{x: number}` 。`obj.x `的值不被允许是 `string`类型的，同时也不允许给`obj`对象添加其它的属性。



要解决上面的问题，我们可以使用 `const断言` 。它跟 var、let、const 没有任何关系，不要混淆 : 

```tsx
// TS: {x: number; y: number}
const obj1 = {
    x: 1,
    y: 2,
}

// TS: {x: 1;  y: number} , x 是 1 这个字面量类型, 而不是 number .
const obj2 = {
    x: 1 as const,
    y: 2,
}

// TS: {readonly x: 1; readonly y: 2}
const obj3 = {
    x: 1,
    y: 2,
} as const;

const arr1 = [1, 2, 3];    // TS: number[]
const arr2 = [1, 2, 3] as const;  // TS: readonly [1, 2, 3]
```

当在某个值后面使用了`const断言`时，TS 会为这个值推断出最窄的类型，没有拓宽。

对于真正的常量，这通常是你想要的。



有类型拓宽，自然就有类型缩小。



### 类型缩小

由一个较为宽泛的集合缩小为相对较小、较明确的集合，这就是**类型缩小**。

```tsx
let fn = (a: any) => {
    if (typeof a === 'string') {
        return a;
    } else if (typeof a === 'number') {
        return a;
    }
    return null;
}
```

上面的栗子中，我们利用**类型守卫**(后面会讲到) 将函数参数的类型从 `any` 缩小为明确的类型，



还可以利用**类型守卫**将 `联合类型` 缩小为明确的子类型：

```tsx
let fn = (a: string | number) => {
    if (typeof a === 'string') {
        return a; // a: string
    } else {
        return a; // a: number
    }
}
```



**联合类型**是多种类型的集合 , 使用 `|` 分隔每个类型：

```tsx
let a: string | number;
a = 'a str';   // ok
a = 666;   // ok

// 联合类型经常与 null 或 undefined 一起使用：
const fn = (a: string | undefined) => {
    ...
}
fn('哈哈哈');   // ok
fn(undefined); // ok
fn(888);  // Argument of type '888' is not assignable to parameter of type 'string | undefined'
```



**交叉类型**是将多个类型合并为一个类型，这让我们可以把现有的多种类型叠加到一起成为一种类型。使用`&`定义交叉类型：

```tsx
type Value = string & number;
```

很显然，上面定义的交叉类型是没有任何意义的，因为没有任何类型可以既是`string`类型又是`number`类型，两者不能同时满足，Value的类型是`never`。

交叉类型真正的用武之地是将多个接口类型合并成一个类型，从而实现类似于继承的效果：

```tsx
interface Type1 {
    name: string;
    sex: string;
}

interface Type2 {
    age: number;
}

type NewType = Type1 & Type2;
const person: NewType = {
    name: '金克丝',
    sex: '女',
    age: 19,
    address: '诺克萨斯', // error
}
```

上栗中，我们将 `Type1` 和 `Type2` 通过交叉类型合并为 `NewType`，使得 `NewType` 同时拥有了 name、sex、age 属性。



`interface`是定义**接口**的关键字，我们马上就会学习。如果你比较迷惑，试着理解下这个栗子：

```tsx
type PersonType = {name: string, sex: string} & {age: number};
const person: PersonType = {
    name: '凯特琳',
    sex: '女',
    age: 21,
}
```



## **接口（Interfaces）**

接口（Interfaces）是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

Interfaces 非常灵活 , 除了可用于 [对类的一部分行为进行抽象] 以外，也常用于对「对象的形状（Shape）」进行描述。

```tsx
interface Person {     // 接口一般首字母大写。
    name: string;   
    age: number;
}

let tom: Person = {  
    name: 'Tom',  
    age: 25
};
```

interface 约束了 `tom` 的形状必须和  `Person` 一致。多一些 / 少一些属性是不允许的 



### 可选 | 只读属性

```tsx
interface Person { 
  readonly name: string; 
  age?: number;
}
```

readonly 属性限制 : 只能在对象刚创建时 修改其值。

此外 TypeScript 还提供了 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```tsx
let a: number[] = [1, 2, 3, 4];
let readonlyobj: ReadonlyArray<number> = a;
readonlyobj[0] = 12;   // error!
readonlyobj.push(5);   // error!
readonlyobj.length = 100;   // error!
a = readonlyobj;       // error!
```



### **任意属性**

有时候我们希望一个接口允许有任意的属性 : 

```tsx
interface Person {  
    name: string;   
    age?: number;   
    [propName: string]: any;
}

let tom: Person = {   
    name: 'Tom',  
    gender: 'male'
};
```

使用`[propName: string] `定义了任意属性取 `string` 类型的值， propName 不固定 , 知识占位 , 例如`[key: string]`。

注意 : interface 中只能定义一个**任意属性**。且一旦定义了任意属性，那么接口中其它属性的类型都必须是**任意属性**的子集。



```tsx
interface Person {  
    name: string;   
    age?: number;   
    [propName: string]: string;
}

let tom: Person = {  
    name: 'Tom',  
    age: 25,   
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：



```tsx
interface Person {  
    name: string;  
    age?: number; // 这里真实的类型应该为：number | undefined 
    [propName: string]: string | number | undefined;
}

let tom: Person = {  
    name: 'Tom',   
    age: 25,   
    gender: 'male'
};
```



### 类型断言

类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序就不会再进行额外的属性检查了：

```ts
interface Person {
    name: string;
    age?: number;
}

const pete: Person = {
    name: 'Pete',
    age: 25,
    sex: '男',
} as Person; // 不再进行类型检查
```



### **索引签名**

```ts
interface Props { 
  name: string;  
  age: number;  
  money?: number; 
  [key: string]: any;
}

let p: Props = { 
  name: "兔神", 
  age: 25, 
  money: -100000, 
  girl: false
}; // OK
// 没看出来和上门有啥区别
```



### interface 和 类型别名( type ) 的区别

实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

>  TypeScript 的核心原则之一是对值所具有的结构进行类型检查。而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。
>
> type(类型别名)会给一个类型起个新名字。type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。
>
> 起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

#### **Objects / Functions**

两者都可以用来描述对象或函数的类型，但是语法不同。

**Interface** , 写在内部

```text
interface Point { 
  x: number; 
  y: number;
}

interface SetPoint { 
  (x: number, y: number): void;
}
```

**Type alias** 语法( 注意箭头函数)

```text
type Point = { 
  x: number; 
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```



**Other Types**

与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

```ts
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;
```



#### **扩展**

两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。

接口的扩展就是继承，通过 `extends` 来实现。类型别名的扩展就是交叉类型，通过 `&` 来实现。



**接口扩展接口**

```ts
interface PointX {   
    x: number
}

interface Point extends PointX {  
    y: number
}
```



**类型别名扩展类型别名**

```text
type PointX = {   
    x: number
}

type Point = PointX & {  
    y: number
}
```

**接口扩展类型别名**

```ts
type PointX = {  
    x: number
}
interface Point extends PointX {  
    y: number
}
```

**类型别名扩展接口**

```ts
interface PointX { 
    x: number
}
type Point = PointX & {  
    y: number
}
```



## **泛型 **Generics

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```ts
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型  ( `Array<any>` )： 

`Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是其输入的 `value` 的类型。



这时候，泛型就派上用场了：

```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论自动推算出来：

```ts
createArray(3, 'x'); // ['x', 'x', 'x']
```



### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']);    // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。



### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以**不能随意的操作它的属性或方法**：

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}  // Error TS2339: Property 'length' does not exist on type 'T'.
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。



这时，我们可以对泛型进行约束，**只允许这个函数传入那些包含 `length` 属性的变量**。这就是泛型约束：

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

此时如果调用 `loggingIdentity`  函数的时候，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了：

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity(7);
// Error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```



多个类型参数之间也可以互相约束：

```ts
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });  // x 是 T 类型 . {b: 10, d: 20} 是 T
```

上例中，我们使用了两个类型参数，其中要求 `T` 继承 `U`，这样就保证了 `U` 上不会出现 `T` 中不存在的字段。



### 泛型接口

可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

当然也可以使用含有泛型的接口来定义函数的形状：

```ts
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```



进一步，我们可以把泛型参数提前到接口名上：

```ts
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。



### 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```















-----

假如让你实现一个函数 `identity`，函数的参数可以是任何值，返回值就是将参数原样返回，并且其只能接受一个参数，你会怎么做？

你会觉得这很简单，顺手就写出这样的代码：

```js
const identity = (arg) => arg;
```

由于其可以接受任意值，也就是说你的函数的入参和返回值都应该可以是任意类型。现在让我们给代码增加类型声明：

```text
type idBoolean = (arg: boolean) => boolean;
type idNumber = (arg: number) => number;
type idString = (arg: string) => string;
...
```

上面这种笨蛋的方法， JS 提供多少种类型，就需要复制多少份代码，这对 Coder 来说是致命的。





```ts
identity("string").length; // ok
identity("string").toFixed(2); // ok
identity(null).toString(); // ok
...
```

如果你使用 any 的话，怎么写都是 ok 的， 也就丧失了类型检查的效果。实际上我知道我传给你的是 string，返回来的也一定是 string，而 string 上没有 toFixed 方法，因此需要报错才是我想要的。

也就是说我真正想要的效果是：用到 id 的时候，根据参数类型进行推导`。比如传入的是 string，就不应该使用 number 上的方法 。



为了解决上面的这些问题，我们**使用泛型对上面的代码进行重构**。

和我们的定义不同，这里用了一个 类型 T，这个 **T 是一个抽象类型，只有在调用的时候才确定它的值**，这就不用我们复制粘贴无数份代码了。

```ts
function identity<T>(arg: T): T { 
  return arg;
}
```

其中 `T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：



 `T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。

但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。







## 工程

### create-react-app  引入 TS



### 代码检查

代码检查主要是用来发现代码错误、统一代码风格。

在 JavaScript 项目中，我们一般使用 [ESLint](https://eslint.org/) 来进行代码检查，它通过插件化的特性极大的丰富了适用范围，搭配 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 之后，甚至可以用来检查 TypeScript 代码。



-----

2019 年 1 月，[TypeScirpt 官方决定全面采用 ESLint](https://www.oschina.net/news/103818/future-typescript-eslint) 作为代码检查的工具，并创建了一个新项目 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)，提供了 TypeScript 文件的解析器 [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser) 和相关的配置选项 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin) 等。而之前的两个 lint 解决方案都将弃用：

- [typescript-eslint-parser](https://github.com/eslint/typescript-eslint-parser) 已停止维护
- [TSLint](https://palantir.github.io/tslint/) 将提供迁移工具，并在 typescript-eslint 的功能足够完整后停止维护 TSLint（Once we consider ESLint feature-complete w.r.t. TSLint, we will deprecate TSLint and help users migrate to ESLint[1](https://medium.com/palantir/tslint-in-2019-1a144c2317a9)）

综上所述，目前以及将来的 TypeScript 的代码检查方案就是 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)。



-----

有人会觉得，JavaScript 非常灵活，所以需要代码检查。而 TypeScript 已经能够在编译阶段检查出很多问题了，为什么还需要代码检查呢？

因为 TypeScript 关注的重心是类型的检查，而不是代码风格。当团队的人员越来越多时，同样的逻辑不同的人写出来可能会有很大的区别：

- 缩进应该是四个空格还是两个空格？
- 是否应该禁用 `var`？
- 接口名是否应该以 `I` 开头？
- 是否应该强制使用 `===` 而不是 `==`？

这些问题 TypeScript 不会关注，但是却影响到多人协作开发时的效率、代码的可理解性以及可维护性。

下面来看一个具体的例子：

```ts
var myName = 'Tom';

console.log(`My name is ${myNane}`);
console.log(`My name is ${myName.toStrng()}`);
```

以上代码你能看出有什么错误吗？

分别用 tsc 编译和 eslint 检查后，报错信息如下：

```ts
var myName = 'Tom';
// eslint 报错信息：
// Unexpected var, use let or const instead.eslint(no-var)

console.log(`My name is ${myNane}`);
// tsc 报错信息：
// Cannot find name 'myNane'. Did you mean 'myName'?
// eslint 报错信息：
// 'myNane' is not defined.eslint(no-undef)
console.log(`My name is ${myName.toStrng()}`);
// tsc 报错信息：
// Property 'toStrng' does not exist on type 'string'. Did you mean 'toString'?
```

| 存在的问题                             | `tsc` 是否报错 | `eslint` 是否报错 |
| :------------------------------------- | :------------- | :---------------- |
| 应该使用 `let` 或 `const` 而不是 `var` | ❌              | ✅                 |
| `myName` 被误写成了 `myNane`           | ✅              | ✅                 |
| `toString` 被误写成了 `toStrng`        | ✅️              | ❌                 |

1.  `var`  ❌   ,  ES6 中有更先进的语法 `let` 和 `const`，此时就可以通过 `eslint` 检查出来，提示我们应该使用 `let` 或 `const` 

2. 未定义的 `myNane`，`tsc` 和 `eslint` 都可以检查出来。
3. 由于 `eslint` 无法识别 `myName` 存在哪些方法，所以对于拼写错误的 `toString` 没有检查出来。



#### 在 TS 中使用 ESLint

ESLint 可以安装在当前项目中或全局环境下，因为代码检查是项目的重要组成部分，所以我们一般会将它安装在当前项目中。可以运行下面的脚本来安装：

```bash
npm install --save-dev eslint
```

由于 ESLint 默认使用 [Espree](https://github.com/eslint/espree) 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)，替代掉默认的解析器，别忘了同时安装 `typescript`：

```bash
npm install --save-dev typescript @typescript-eslint/parser
```

接下来需要安装对应的插件 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。

```bash
npm install --save-dev @typescript-eslint/eslint-plugin
```



#### **创建配置文件**

ESLint 需要一个配置文件来决定对哪些规则进行检查，配置文件的名称一般是 `.eslintrc.js` 或 `.eslintrc.json`。

当运行 ESLint 的时候检查一个文件的时候，它会首先尝试读取该文件的目录下的配置文件，然后再一级一级往上查找，将所找到的配置合并起来，作为当前被检查文件的配置。

我们在项目的根目录下创建一个 `.eslintrc.js`，内容如下：

```json
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        // 禁止使用 var
        'no-var': "error",
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}
```

以上配置中，我们指定了两个规则，其中 `no-var` 是 ESLint 原生的规则，interface 优先 ( `@typescript-eslint/consistent-type-definitions`)  是 `@typescript-eslint/eslint-plugin` 新增的规则。

规则的取值一般是一个数组（上例中的 `@typescript-eslint/consistent-type-definitions`），其中第一项是 `off`、`warn` 或 `error` 中的一个，表示**关闭、警告和报错**。后面的项都是该规则的其他配置。

如果没有其他配置的话，则可以将规则的取值简写为数组中的第一项（上例中的 `no-var`）。

关闭、警告和报错的含义如下：

- off 关闭：禁用此规则
- warn 警告：代码检查时输出错误信息，但是不会影响到 exit code
- error 报错：发现错误时，不仅会输出错误信息，而且 exit code 将被设为 1（一般 exit code 不为 0 则表示执行出现错误）





#### **检查一个 ts 文件**

创建了配置文件之后，我们来创建一个 ts 文件看看是否能用 ESLint 去检查它。

创建一个新文件 `index.ts`，将以下内容复制进去：

```ts
var myName = 'Tom';

type Foo = {};
```

然后执行以下命令：

```bash
./node_modules/.bin/eslint index.ts
```

则会得到如下报错信息：

```bash
/path/to/index.ts
  1:1  error  Unexpected var, use let or const instead  no-var
  3:6  error  Use an `interface` instead of a `type`    @typescript-eslint/consistent-type-definitions

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

上面的结果显示，刚刚配置的两个规则都生效了：禁止使用 `var`；优先使用 `interface` 而不是 `type`。

需要注意的是，我们使用的是 `./node_modules/.bin/eslint`，而不是全局的 `eslint` 脚本，这是因为代码检查是项目的重要组成部分，所以我们一般会将它安装在当前项目中。

可是每次执行这么长一段脚本颇有不便，我们可以通过在 `package.json` 中添加一个 `script` 来创建一个 npm script 来简化这个步骤：

```json
{
    "scripts": {
        "eslint": "eslint index.ts"
    }
}
```

这时只需执行 `npm run eslint` 即可。

-----

#### **检查整个项目的 ts 文件**

我们的项目源文件一般是放在 `src` 目录下，所以需要将 `package.json` 中的 `eslint` 脚本改为对一个目录进行检查。由于 `eslint` 默认不会检查 `.ts` 后缀的文件，所以需要加上参数 `--ext .ts`：

```json
{
    "scripts": {
        "eslint": "eslint src --ext .ts"
    }
}
```

此时执行 `npm run eslint` 即会检查 `src` 目录下的所有 `.ts` 后缀的文件。





#### 在 VSCode 中集成 ESLint 检查

在编辑器中集成 ESLint 检查，可以在开发过程中就发现错误，甚至可以在保存时自动修复错误，极大的增加了开发效率。

要在 VSCode 中集成 ESLint 检查，我们需要先安装 ESLint 插件，点击「扩展」按钮，搜索 ESLint，然后安装即可。

VSCode 中的 ESLint 插件默认是不会检查 `.ts` 后缀的，需要在「文件 => 首选项 => 设置 => 工作区」中（也可以在项目根目录下创建一个配置文件 `.vscode/settings.json`），添加以下配置：

```json
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

这时再打开一个 `.ts` 文件， 写出 bug , 即可看到报错信息



我们还可以开启保存时自动修复的功能，通过配置：

```json
{
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

就可以在保存文件后，自动修复为：

```ts
let myName = 'Tom';

interface Foo {}
```



#### 使用 Prettier 修复格式错误

ESLint 包含了一些代码格式的检查，比如空格、分号等。但前端社区中有一个更先进的工具可以用来格式化代码，那就是 [Prettier](https://prettier.io/)。

Prettier 聚焦于代码的格式化，通过语法分析，重新整理代码的格式，让所有人的代码都保持同样的风格。

首先需要安装 Prettier：

```bash
npm install --save-dev prettier
```

然后创建一个 `prettier.config.js` 文件，里面包含 Prettier 的配置项。Prettier 的配置项很少，这里我推荐大家一个配置规则，作为参考：

```js
// prettier.config.js or .prettierrc.js
module.exports = {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾不需要逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf'
};
```

接下来安装 VSCode 中的 Prettier 插件，然后修改 `.vscode/settings.json`：

```json
{
    "files.eol": "
",
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

这样就实现了保存文件时自动格式化并且自动修复 ESLint 错误。

需要注意的是，由于 ESLint 也可以检查一些代码格式的问题，所以在和 Prettier 配合使用时，我们一般会把 ESLint 中的代码格式相关的规则禁用掉，否则就会有冲突了。





### JS => TS  & TS => JS



### JS / TS 混用





## TS 优缺点

----

ts 完全可以支持 js 的写法。然而如 1 所说，参数类型纯粹是为了帮你写出更好的代码；



1、TS是强类型，但是运行时，任意值也是能接收的，只是在编写阶段IDE可能会有提示，编译阶段会报错，但是它运行时和JS没啥区别；

2、对于编写阶段能友好提示，算是一个好处，但是也有别的替代方案，比如写好注释，依然能有好的提示效果；

所以TS更适用于多人协助编写的项目，或者一些开源的项目，一两个人就能完成的项目，完全没必要用它，确实是浪费精力，缺点大于优点。







# Q & A

## interface 和 type 到底有什么区别



https://juejin.cn/post/6844903749501059085



一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

其他更多详情参看 [官方规范文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fblob%2Fmaster%2Fdoc%2Fspec.md)