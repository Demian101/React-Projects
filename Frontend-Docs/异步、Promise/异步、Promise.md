# JS 异步

Javascript 语言的执行环境是"单线程"（single thread）。

所谓"单线程"，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。

> JS 主要的用途就是操作 DOM，以及与用户的交互，这就决定了他只能是单线程，
>
> 比如 A 线程创建了一个DOM，B 线程给删除了，浏览器应该以哪个为准呢 ? 
>
> 所以就算前端能造火箭了，JS 肯定也是单线程的。

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 JS 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

为了解决这个问题，Javascript 语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。

"同步模式" 就是上一段的模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；

**"异步模式" 则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就会执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。**

"异步模式" 非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应。

在服务器端，"异步模式" 甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有 http 请求，服务器性能会急剧下降，很快就会失去响应。



下面了解几个概念 :  执行栈 / 任务队列 / 事件循环 / 事件轮询

## 1. 执行栈（execution context stack）

```js
function second() {
    console.log('second')
}
function first(){
    console.log('first')
    second()
    console.log('Last')
}
first()

/*
执行顺序: "first"、"second"、"last"

1. first() 被推入栈顶 , 
2. console.log('first') 入栈, 执行, 弹走
3. second() 入栈, 执行, 弹走
4. ..
5. 浏览器会问: "first() 你还有事吗? " , first() 说: "好, 我走"
*/
```



## 2. Task Queue 任务队列  

下面讲` Task Queue` 任务队列和   `event loop` 事件循环 : 

1. JS 分为**同步任务**和**异步任务**
2. 所有**同步任务**都在主线程上执行，形成一个执行栈（execution context stack）。
3. 主线程之外，还存在一个"任务队列"（task queue）。
   - 只要**异步任务**有了运行结果，就在"任务队列"之中放置一个事件。
4. 一但 "执行栈(主线程)" 中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取 "Task Queue 任务队列"，将可运行的异步任务添加到可执行栈中，开始执行。
5. 主线程不断重复第 4 步。这就是 JavaScript 的运行机制 : 被称为事件循环（event loop）机制。



## 3. 宏任务/微任务

宏任务 (macro task)，可以理解是每次执行栈执行的代码就是一个宏任务

浏览器为了能够使得 JS 内部 (macro task) 与 DOM 任务能够有序的执行，会在一个 (macro task) 执行结束后，在下一个 (macro task) 执行开始前，**对页面进行重新渲染**，流程如下：

```bash
macrotask -> 渲染 -> macrotask -> 渲染 ...
```

微任务 (micro task)  可以理解是在当前 task 执行结束后立即执行的任务。

> 在执行宏任务时遇到 Promise 等，会创建微任务（ `.then()`  里面的回调），并加入到微任务队列队尾。

也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）。 

```bash
macrotask_A
  -> A.microtask1, A.microtask2 ;   
    -> 渲染 
      -> macrotask_B
        -> B.microtask1, B.microtask2.... ; 
          -> 渲染 
```



常见宏任务包含：

```bash
script (整体代码)
setTimeout
setInterval
I/O
UI 交互事件 / UI rendering
postMessage
MessageChannel
setImmediate(Node.js 环境)
```



常见微任务包含：

```bash
Promise.then
Object.observe
MutationObserver
process.nextTick(Node.js 环境)
```



```flow
flow

// Define 节点
st=>start: Start
op1=>operation: 宏任务 & 执行结束
cond=>condition: 有微任务 ?
sub=>subroutine: 下一个宏任务
op2=>operation: 执行所有微任务
op3=>operation: 浏览器渲染
e=>end

// 主流程:
st->op1->cond->op2->op3
cond(no)->op3
cond(yes)->op2->op3
op3(left)->sub(top)->op1
```

### **3.1 主线程上添加宏任务和微任务**

分析如下代码执行 : 

```js
console.log('----开始----');

setTimeout(() => {
  console.log('setTimeout...');  
}, 0);

new Promise((resolve, reject) => {
  for (let i = 0; i < 3; i++) {
    console.log(i);
  }
  resolve()
}).then(()=>{
  console.log('Promise'); 
})
console.log('----结束----');

/*  执行 `node test.js`  结果: 
----开始----
0
1
2
----结束----
Promise
setTimeout...  */
```

**第一轮 `event loop` 事件循环：**

1. 整体 script 作为第一个宏任务进入主线程, 输出 `---- 开始 -----`
2. 遇到 setTimeout，其回调函数 clg 被分发到宏任务 Event Queue中。记为 `setTimeout1`。
3. 遇到 Promise，new Promise 直接执行，循环依次输出 0、1、2 。then 被分发到微任务 Event Queue 中。记为 `then1`。
4. 继续往下，遇到 clg , 直接输出 `----结束----`，到此第一轮事件循环即将结束，会先看有没有产生出微任务，有依次按产生顺序执行
   - 发现有 `then1`，输出 `Promise`，当前微任务执行完毕，到此，第一轮事件循环结束。

**发现  `setTimeout1` 宏任务，开始第二轮事件循环：**

- 遇到 clg, 直接输出 `setTimeout...`，没有微任务，第二轮事件循环结束。

**所有宏任务执行完毕，整个程序执行完毕**



下面代码和上面是一样的, 试着分析下 :

```js
console.log(1)

let promise = new Promise(function(resolve,reject){    
  console.log(2)    
  resolve(3)
}).then(function(data){    
  console.log(data)
})

setTimeout(function(){    
  console.log(4);
})
console.log(5)
// 上面代码的运行结果是 1 2 5 3 4
```

1. 首先: `setTimeout` 是[宏任务](https://www.zhihu.com/search?q=宏任务&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"277664818"})，而 `Promise.then`  是微任务。

```
output : 1
```

2. ` new Promise() ` 是同步的，所以立即执行  ;  `.then` 被分发到微任务 Event Queue 中 , 记为 `then1`

3. 往下同步代码输出 5 ; 

```
output : 1 2 5
```

4. 第一轮事件循环**即将**结束。
   - 观察有无微任务 : 执行 `then1` ; 至此 , 第一轮事件循环结束。

```bash
output : 1 2 5 3
```

5. 发现  `setTimeout1` 宏任务，开始第二轮事件循环：
   - 遇到 clg, 直接输出 `setTimeout...`，没有微任务，第二轮事件循环结束。







### 3.2 在微任务中创建微任务

感觉搞的有点复杂 , 不管了.

https://zhuanlan.zhihu.com/p/139967525









# **Promises 对象**

`Promises` 对象是 `CommonJS` 工作组提出的一种规范，目的是为异步编程提供统一接口。

promise 是表示异步操作完成或失败的对象 , 代表一种中间状态。 本质上，这是浏览器说“我**保证**尽快给您答复”的方式，因此得名 “promise”。

A promise that is either `resolved` or `rejected` is called “settled”,  as opposed to an initially `pending  promise.

简单说，它的思想是，每一个异步任务返回一个 Promise 对象，该对象有一个 then 方法，允许指定回调函数。promise 是表示异步操作 [完成] 或 [失败] 的对象。



下面我们阅读几段代码找找感觉: 

阅读下面 `抽奖小任务 ` 例子 : 

- `resolve(n)` 改变 PromiseState , 触发 `.then` 的回调函数 console.log ..

```js
function rand(m, n) { return Math.ceil(Math.random() * (n-m+1)) + m-1;  }

// 抽奖小任务:
const p = new Promise( (resolve, reject) => {
  setTimeout(()=>{
    let n = rand(1,100);
    if ( n >= 90 ){  
      resolve(n)  // 中奖，将 promise 对象的状态设置为【成功】
    } else {
      reject(n)  // 没中奖，将 promise 对象的状态设置为【失败】
    }

  }, 500);
})

// p.then( ()=>{}, ()=>{} )
// p.then( value => {}, reason => {} )  <- value、reason 是形参，尽量遵守此规则
p.then( (value)=>{
  console.log("恭喜中奖，号码为" + value)  
}, (reason)=>{
  console.log("再接再厉，号码为" + reason)
})
```



读取文件例子 : 

```js
/**
 * 封装一个函数 mineReadFile 读取文件内容
 * 参数:  path  文件路径
 * 返回:  promise 对象
 */
const fs = require('fs')
function mineReadFile(path){
  return new Promise((resolve, reject) => {
    // 读取文件
    fs.readFile(path, (err, data) =>{
      if(err) reject(err);  // 失败，回传 reason
      resolve(data);     // 读取成功，回传 data
    });
  });
}

// 调用 .then 方法;
mineReadFile('./resource/content.txt').then( value=>{
  console.log(value.toString());
}, reason => {
  console.log(reason);
});
```



### Promise 的状态

Promise 实例对象中的属性 『PromiseState』保存着 `promise` 的状态改变  , 改变形式有 2 种 : 
1. 由 `pending` 变为 `resolved` 
2. 由 `pending` 变为 `rejected` 
  - 只有这 2 种变化, 且一个 promise 对象只能改变一次
  - 成功/失败 都会有一个结果数据:   成功的 res 一般约定为 `value`, 失败的结果数据一般称为 `reason` 



> `pending`  未决定的
>
> `resolved`   /  或称为 `fulfilled`  成功
>
> `rejected`  失败 



### Promise 对象的值

Promise 实例对象中的另一个属性 『PromiseResult』

保存着异步任务『成功/失败』的结果
* resolve
* reject 



### Promise 工作流程

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-08-15-012157.png)



### Promise 构造函数

在前面的热身中, 我们已经有了一些感觉, 下面来看 Promise 源码的构造函数 : 

可以通过 new Promise 来实例化对象， 在 new 的时候，构造器需要接收 1 个函数类型参数 `executor` 

1. `executor`  函数: 包含执行器` (resolve, reject) => {}` 
  - resolve 函数: 内部定义成功时我们调用的函数 `value => {}` 
  - reject 函数: 内部定义失败时我们调用的函数 `reason => {}` 

>  executor 会在 Promise 内部**立即同步调用**



来看例子 : 如下 html 中使用的 Promise 已经被我们的自定义文件代替 , 我们将自己手动实现一个 Promise ; 

```html
<script src="./promise.js"></script>
    <script>
        let p = new Promise((resolve, reject) => {
            resolve('OK');
        });

        p.then(value => {
            console.log(value);
        }, reason=>{
            console.warn(reason);
        })
    </script>
```



```js
// Promise.js
function Promise(executor){  // 传入 (resolve, reject)

}

//添加 then 方法
//  上面的 html 调用 Promise, 给 then 方法呗传入了 2 个 console.log 的回调函数
Promise.prototype.then = function(onResolved, onRejected){

}
```

> 上面的源码只是一部分 , 更多的在后面 "Promise 源码解析" Part .



----

`Promise.prototype.then` 方法 :  (onResolved, onRejected) => {}

then 接收 2 个参数 : 
1. `onResolved`  函数:  成功的回调函数  .` (value) => {}`
2. `onRejected`  函数:  失败的回调函数 . ` (reason) => {}`

说明:  指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调

`then`  会返回一个新的 promise 对象



```js
// 给原型 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
    // 要返回实例中的 PromiseState 属性 ( this 指向实例对象 p
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult);  // this.PromiseResult 为 'OK'
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult);
    }
}

// html 中的调用: 
  p.then(
    value  => { console.log(value);  }, 
    reason => { console.warn(reason);  }
  )
```

- 如上代码 : 
  - `p.then` 接收 2 个函数作为参数  , `onResolved`  和 `onRejected`   , 分别作为 resolve 和 reject 的回调函数 ;
  - 当 `PromiseState === 'fulfilled'`  时 , `onResolved`  所要执行的就是传进来的函数体 ; 
  - 当 `PromiseState === 'rejected'`  时 , `onRejected`  所要执行的就是传进来的函数体 ; 



----

`Promise.prototype.catch`  方法: (onRejected) => {}

-  onRejected 函数: 失败的回调函数 (reason) => {}
  - 只能用来指定失败的回调 ;



----

`Promise.resolve` 方法:` (value) => {}` 

- 比较特殊, 他不是一个实例方法, 而是一个函数方法 ;
- 比较少用到 ; 用到再说吧 ; 



----

`Promise.reject` 方法:` (value) => {}` 

- 比较特殊, 他不是一个实例方法, 而是一个函数方法 ;
- 比较少用到 ; 用到再说吧 ; 



-----

`Promise.all ` 方法: (promises) => {}

- `promises` :  包含 n 个 promise 的数组
- 该函数方法返回一个新的 promise, **只有所有的 promise 都成功才成功**, 只要有一个失败了就 直接失败



如下例 : p1, p2, p3 都是成功的 Promise , `Promise.all` 返回的 Promise 对象包含了其 3 的 Promise 返回数据 ; 

```js
let p1 = new Promise((resolve, reject) => {
    resolve('OK');
})
let p2 = Promise.resolve('Success');
// let p2 = Promise.reject('Error');
let p3 = Promise.resolve('Oh Yeah');

const result = Promise.all([p1, p2, p3]);
console.log(result);

/*
Promise
  [[Prototype]]: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: Array(3)
    0: "OK"
    1: "Success"
    2: "Oh Yeah"     */
```



----

`Promise.race `方法: (promises) => {}

- race : 赛跑

- `promises`:  包含 n 个 promise 的数组
- 返回一个新的 promise, **第一个完成的** promise 的结果状态就是最终的结果状态

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('OK'); }, 1000);
})
let p2 = Promise.resolve('Oh Yeah！');
let p3 = Promise.resolve('Success');

//调用
const result = Promise.race([p1, p2, p3]);
console.log(result);

/*  返回 { 状态为成功 ; 结果为 "Oh Yeah！" }: 
Promise {<pending>}
  [[Prototype]]: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: "Oh Yeah！
*/
```



## Promise 源码解析

### 1. Base

```js
/*
  异步处理失败后应该调用的函数
  reason: 将交给 onRejected()的失败数据
*/
function Promise(excutor) {
  const self = this;  // 避免作用域问题；

  self.PromiseState = 'Pending';
  self.PromiseResult = null;
  self.callbacks = []  // 用来保存所有待调用的包含 onResolved 和 onRejected 回调函数的对象的数组
  
  function resolve(value) {
    if(self.PromiseState !== 'pending') {  // 如果状态不是 pending, 说明状态被改过了, 直接结束 
      return 
    } 
    self.PromiseState = 'fulfilled'
    self.PromiseResult = value;
  }

  function reject(reason) {
    if(self.PromiseState !== 'pending') {   // if 状态不是 pending, 说明状态被改过了, 直接结束 
      return
    } 
    self.PromiseState = 'rejected' // 立即更新状态, 保存数据
    self.PromiseResult = data;
  }

  try {
    excutor(resolve, reject)    // 立即同步调用 excutor() 构造函数
  } catch (error) {  // 如果捕获到异常, 修改 promise 对象状态为『失败』
    reject(error)
  } 
}
```

Promise对象状态只能修改一次 : 

- 在改变 Promise 状态之前 , 要判断一下 Promise 对象状态是不是已经被改变过了 ,如果已经被改过了, 就不要再改了 ,直接 return ; 





### 2. 异步任务 then 方法执行回调

如下代码 : 

1. html 中 `p.then`  是同步代码 ;
2. html 中`setTimeout` 中的是异步任务 ;
3. 当 p.then 执行时 , `reject("error");`  还没执行 , Promise 对象的 State 还是 `pending` 
4. Promise 对象的 State 还是 `pending`  , 故 then 源码中无法匹配 



```js
// Promise.then 源码 :

/* 添加 then 方法 */
Promise.prototype.then = function(onResolved, onRejected){
    //调用回调函数  PromiseState
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult);
    }
}
```



```html
<!-- html -->
<script>
let p = new Promise((resolve, reject) => {
      setTimeout(() => {
          // resolve('OK');
          reject("error");
      }, 1000);
  });

  p.then(value => {
      console.log(value);
  }, reason=>{
      console.warn(reason);
  });
</script>
```



如何解决这种异步问题呢 ? 

1. 在原型中设置保存回调函数的机制 ;

2. 在 Promise 中 , 当状态改变后 , 接着才执行回调函数 ; 

   1. 对应到 html : 

      ① 先执行 同步代码 : console.log("同步： ", p);

      ② 等 1s , 再执行  `reject('error')` 

      ③ Promise 状态改变 , 触发 `p.then` 中的回调函数 ; 

```js
/* 原型部分 */
Promise.prototype.then = function(onResolved, onRejected){
  ...
  //判断 pending 状态
  if(this.PromiseState === 'pending'){
      //保存回调函数
      this.callbacks.push({
          onResolved: onResolved,
          onRejected: onRejected
      });  }}


function Promise(executor){
  ..
  this.callbacks = {};
  
  function resolve(data){
    ...
    self.PromiseState = 'fulfilled';// resolved
    self.PromiseResult = data;
    // 调用成功的回调函数 ( onResolved 是 p.then 传递进来的
    if(self.callback.onResolved){
      self.callback.onResolved(data);
    }};

  function reject(data){
    ...
    self.PromiseState = 'rejected'; 
    self.PromiseResult = data;
    if(self.callback.onRejected){    // 执行回调 
        console.log("reject 回调执行")
        self.callback.onRejected(data);
    }};
```



```bash
html: 
<script>
      let p = new Promise((resolve, reject) => {
          setTimeout(() => {
              console.log("")
              reject("error....");
              // resolve("good")
          }, 1000);
      });

      p.then(value => {
          console.log("p.then", value);
      }, reason=>{
          console.warn("Error reason :", reason);
      });

      console.log("同步： ", p);
</script>

# 控制台输出 : 
同步：  Promise {PromiseState: 'pending', PromiseResult: null, callback: {…}}
reject 函数执行
reject 回调执行
Error reason : error....
```



### 3. 多个回调

```js
// Promise.js
Promise.prototype.then = function(onResolved, onRejected){
  ...
  if(this.PromiseState === 'pending'){  //判断 pending 状态
    this.callbacks.push({       //保存回调函数
      onResolved: onResolved,
      onRejected: onRejected
    });
  }

function Promise(executor){
  ...
  this.callbacks = [];
  function resolve(data){
    ...
    console.log(self.callbacks)
    self.callbacks.forEach(item => {
      item.onResolved(data);
    });
  }
```



```html
<!-- Html -->
<script>
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('OK');
            reject('No');
        }, 1000);
    });
    // 多个 then 都会被调用
    p.then(value => {  console.log(value); }, reason=>{   console.warn(reason);  });
    p.then(value => {  alert(value); }, reason=>{  alert(reason);   });
    console.log(p);
</script>

<!--  Output: 
  console.log(self.callbacks) :
    Array(2)
      0: {onResolved: ƒ, onRejected: ƒ}
      1: {onResolved: ƒ, onRejected: ƒ}
      length: 2

  ① 首先 Alert("No")
  ② 关闭 Alert 后 warning "No"
-->
```



### 4. 同步修改状态then方法返回结果

`.then 方法的特点` : 

- `.then` 的返回结果是由它指定的回调函数的执行结果来决定的 : 
- 在回调函数中如果
  - 返回了一个 `非 Promise` 类型的数据 ,那么 result 这个结果就是一个成功的 Promise ;
  - 返回了一个 `Promise` , 那么 `.then` 的返回结果由这个 `Promise` 决定 ; 



```js
// Promise.js
Promise.prototype.then = function(onResolved, onRejected){
  return new Promise((resolve, reject) => {
    //调用回调函数  PromiseState
    if(this.PromiseState === 'fulfilled'){
      /* 执行回调函数，根据 callback 的执行结果来确定 then 的返回值
        1. 返回了一个 `非 Promise` , 故 .then 是一个成功的 Promise， return result;
        2. 返回了 Promise 对象，则 .then 的返回结果由这个 `Promise` 的结果决定 ; 
      */
      let result = onResolved(this.PromiseResult);
      // 判断是不是 Promise 实例：
      if(result instanceof Promise){
        result.then(val => {   // 如果是 Promise 类型的对象，
          resolve(val);
        }, rea => {
          reject(rea);
        })
      } else {
        // result 非Promise，执行状态为『成功』，直接 return result 。
        resolve(result);
      }
    }
    if(this.PromiseState === 'rejected'){
      onRejected(this.PromiseResult);
    }
    // 判断 pending 状态
    if(this.PromiseState === 'pending'){
      // 保存回调函数
      this.callbacks.push({
        onResolved: onResolved,
        onRejected: onRejected
      });
    }
  })
}
```

- `this.PromiseResult`  里面存储的是 ` new Promise( ..  reject("Oh, No! ...")` 中的  `"Oh, No! ..."` 

```html
<!-- html -->
<script>
let p = new Promise((resolve, reject) => {
  resolve("OK");
})

const res = p.then( value => {
  return new Promise((resolve, reject) => {
    reject("Oh, No! ...")
  })}, reason => {
    console.log(res)
})
console.log("res", res)
</script>

<!-- console.log("res :", res) : 
  Promise {
     PromiseResult: "Oh, No! ..."
     PromiseState: "rejected"
  }
-->
```

如上 html : 

- `p.then` return 一个 Promise , 此时 `p.then` 的返回情况由该 Promise 决定 ; 
- `resolve("OK");` 将 Promise 实例的 `PromiseState` 设置为`fulfilled`  ; `PromiseResult` 设置为 `"Oh, No! ..."`
- 属性变化触发回调 , 我们 check `Promise.prototype.then`  中的代码 : 
  - 进入 `if(this.PromiseState === 'fulfilled')`  分支 ;



 

### 5. 异步修改状态then方法返回结果

如下异步 html 代码 : 

```html
<!-- html -->
<script>
  let p = new Promise((resolve, reject) => {
    setTimeout({
      //resolve("OK !");
      reject("Error .... ");
    }, 1000)
  });
  
  const res = p.then(value => {
    console.log("value: ", value);
    return 'oh Yeah';
    // throw 'error';
  }, reason=>{
    console.warn("reason: ", reason);
    return 'oh NO!';
    // throw 'error';
  });
  console.log(res);
</script>
```

如上, 因为 `setTimeout ` 的存在 ,  `reject("Error .... ");`  是异步代码 , 

`console.log(res);` 是同步代码 , 所以输出会一直是如下的 `pending` 

```js
/*  clg : 
Promise{
  PromiseResult: null
  PromiseState: "pending"
}  */ 
```

这和我们代码的初衷不符 , 所以要进行异步状态的修改 .



-----

异步代码的修改主要在下文的 Pending  部分 : 

- 因为上文 html 的 `const res = p.then( value =>{ throw("error.") }`  执行时 ,  Promise 的状态还没发生改变 , 还是 Pending 
- 所以

```js
// Promis.js
Promise.prototype.then = function(onResolved, onRejected){
  const self = this; // 避免作用域问题；
  return new Promise((resolve, reject) => {
    if(this.PromiseState === 'fulfilled'){  
      ...   
    }
    if(this.PromiseState === 'rejected'){
      ...
    }

    // 判断 pending 状态 （ 异步在这里执行；）
    if(this.PromiseState === 'pending'){
      //保存回调函数
      this.callbacks.push({
        'onResolved': function(){
          try{
            //执行成功回调函数
            let result = onResolved(self.PromiseResult);  // self 指向调用对象
            if(result instanceof Promise){  // 判断返回值是否是 Promise
              result.then( v => { resolve(v); }, r=>{  reject(r); } )
            }else{ 
              resolve(result); 
            }
          }catch(e){
            reject(e);
          }
        },
        'onRejected': function(){
          try{
            let result = onRejected(self.PromiseResult);
            if(result instanceof Promise){
              result.then( v => { resolve(v); }, r=>{  reject(r); } )
            }else{ resolve(result); }
          }catch(e){ reject(e);  }
        }
      });
    }
```



① 下面 resolve 代码的执行情况 (动图)  :

```html
<!-- html --> 
<script>
  let p = new Promise((resolve, reject) => {
    setTimeout({
      resolve("OK !");    // <- 注意这里
    }, 1000)
  });
  
  const res = p.then(value => {
    console.log("value: ", value);
    return 'oh Yeah';
  }, reason=>{
    console.warn("reason: ", reason);
    return 'oh NO!';
  });
  console.log(res);
</script>
```

 

1. 首先执行 html 中 同步代码 : `console.log(res);` (此时是 ` Pending`) 

2. 1s 后, 执行 html 中  `console.log("value: ", value);` 

3. 点开 Promise , 因为回调中 return 了 `'oh Yeah';` , 此时 Promise 状态 已由 `Pending ` 状态改为 `fulfilled`

   - > return 的是 非 Promise ,则状态为 `fulfilled` ; 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-08-16-1.gif)



② 下面 reject 代码的执行情况 (动图)  :

```html
<!-- html --> 
<script>
  let p = new Promise((resolve, reject) => {
    setTimeout({
      reject("Error !");    // <- 注意这里
    }, 1000)
  });
  
  const res = p.then(value => {
    console.log("value: ", value);
    return 'oh Yeah';
  }, reason=>{
    console.warn("reason: ", reason);
    return 'oh NO!';
  });
  console.log(res);
</script>
```

1. 首先执行 html 中 同步代码 : `console.log(res);` (此时是 ` Pending`) 

2. 1s 后, 执行 html 中  `console.log("reason: ", reason);` 

3. 点开 Promise , 因为回调中 return 了 `'oh NO!'`  , 此时 Promise 状态 已由 `Pending ` 状态改为 `fulfilled`

   - > return 的是 非 Promise ,则状态为 `fulfilled` ; 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-08-16-2.gif)

> 这个例子中 , 虽然 `new Promise` 中 reject 了  ,但是由于回调中 return 了 `'oh NO!';`  , 所以异步 Promise  最终的的 PromiseState 仍是  `fulfilled` , 谨记 !!



### 6. 代码整合

因为 Promise.js 中都使用了如下的代码逻辑, 

```js
  try{
      
      let result = type(self.PromiseResult);  //获取回调函数的执行结果
     
      if(result instanceof Promise){   //判断
           
          result.then(v => {  //如果是 Promise 类型的对象
              resolve(v);
          }, r=>{
              reject(r);
          })
      }else{
          
          resolve(result);   //结果的对象状态为『成功』
      }
  }catch(e){
      reject(e);
  }
```

所以完全有必要做一层封装



使用 `callback`  封装后的 `Promise.js 的 Promise.prototype.then`  : 

```js
Promise.prototype.then = function(onResolved, onRejected){
    const self = this;
    return new Promise((resolve, reject) => {
        // 封装函数 wrapping function ;
        function callback(type){  // type 可能是: { onResolved / onRejected } 的函数体
            try{
                let result = type(self.PromiseResult);  // 获取回调函数的执行结果
                if(result instanceof Promise){  // 判断是否是 Promise 类型的对象
                    result.then(  
                        v => { resolve(v); }, 
                        r => { reject(r); }
                    )
                } else {
                    resolve(result);  // 非 Promise，结果的对象状态为『成功』
                }
            }catch(e){
                reject(e);
            }
        }
        if(this.PromiseState === 'fulfilled'){
            callback(onResolved);
        }
        if(this.PromiseState === 'rejected'){
            callback(onRejected);
        }
        //判断 pending 状态 （异步使用）：
        if(this.PromiseState === 'pending'){
            this.callbacks.push({    // 用一个 obj 保存回调函数
                onResolved: function(){
                    callback(onResolved);
                },
                onRejected: function(){
                    callback(onRejected);
                }
            });
        }
    })
}
```



### 7. catch 与异常穿透

前面讲过 : `Promise.prototype.catch`  方法: (onRejected) => {}

-  onRejected 函数: 失败的回调函数 (reason) => {}
   - 只能用来指定失败的回调 ;





它感觉有点像运行中的薛定谔的猫。2种可能都还没有发生，因此 fetch 操作等待浏览器在将来完成该操作的结果。

我们有三个代码块链接到 `fetch()` 的末尾：

- 两个 `then()` 块。两者都包含一个回调函数，如果前一个操作成功，该函数将运行，并且每个回调都接收前一个成功操作的结果作为输入，因此您可以继续对它执行其他操作。每个 `.then()` 块返回另一个promise，这意味着可以将多个 `.then() ` 块链接到另一个块上，这样就可以依次执行多个异步操作。
- 如果其中任何一个 `then()` 块失败，则在末尾运行 `catch()` 块 —— 与同步 `try...catch` 类似，`catch()` 提供了一个错误对象，可用来报告发生的错误类型。但是请注意，同步 `try...catch` 不能与 `promise` 一起工作，尽管它可以与 `async/await` 一起工作，稍后您将了解到这一点。

像 promise 这样的异步操作被放入**事件队列**中，**事件队列**在主线程完成处理后运行，这样它们就不会阻止后续 JavaScript 代码的运行。排队操作将尽快完成，然后将结果返回到 JS 环境。

promises 与旧式 callbacks 有一些相似之处。它们本质上是一个返回的对象，您可以将回调函数附加到该对象上，而不必将回调作为参数传递给另一个函数。

然而，Promise是专门为异步操作而设计的，与旧式回调相比具有许多优点:

1. 您可以使用多个 then() 操作将多个异步操作链接在一起，并将其中一个操作的结果作为输入传递给下一个操作。这种链接方式对回调来说要难得多，会使回调以混乱的“末日金字塔”告终。 (也称为回调地狱)。
2. Promise总是严格按照它们放置在事件队列中的顺序调用。
   错误处理要好得多——所有的错误都由块末尾的一个 `.catch()` 块处理，而不是在“金字塔”的每一层单独处理。





## 异步代码的本质

```javascript
console.log ('Starting');
let image;

fetch('coffee.jpg').then((response) => {
  console.log('It worked :)')
  return response.blob();
}).then((myBlob) => {
  let objectURL = URL.createObjectURL(myBlob);
  image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}).catch((error) => {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

console.log ('All done!');
```

1. 首先创建 `image`  变量。
2. 最后一行代码 `All done`! 被率先打印到控制台 （因为 fetach 是是异步执行的、非阻塞的 ）
3. `It worked :)`  被输出到控制台 console 。( fetch 没有报错，执行第一个 `.then` )
4. 执行第二个 `.then` ，也没有报错，所以 catch 不会被执行。
5. 执行完毕。



# async、await

## 实例热身

async : 

1. 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定
3. 在函数开头添加 async 使其成为异步函数

```js
// 如下代码 : 
async function main(){
  //1. 如果返回值是一个非 Promise 类型的数据
  // return 521;
  //2. 如果返回的是一个Promise对象
  // return new Promise((resolve, reject) => {
  //     // resolve('OK');
  //     reject('Error');
  // });
  //3. 抛出异常
  throw "Oh NO";
}

let result = main();
console.log(result);

/*  
return 521 的返回值 : 
  Promise {<fulfilled>: 521}
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: 521
------------------------------------------------

return new Promise 的返回值 : 
  Promise {<rejected>: 'Error'}
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: "Error"
------------------------------------------------

throw "Oh NO"; 的返回值:  (抛出值是 "Oh NO" , 状态是 rejected;)
  Promise {<rejected>: 'Oh NO'}
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: "Oh NO"
*/
```



**await** 表达式

1. await 右侧的表达式一般为 `promise` 对象, 但也可以是其它的值
2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值
3. 如果表达式是其它值, 直接将此值作为 await 的返回值

**注意 Attention :** 

1. await 必须写在 async 函数中, 但 async 函数中可以没有 await
2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

```js
// 1. 返回一个成功的 Promise 对象 : 
async function main(){
    let p = new Promise((resolve, reject) => {
        resolve('OK');
    })
    let res = await p;
}
main();  // 返回 'OK'


// 2. 返回一个失败的 Promise 对象: 
async function main(){
  let p = new Promise((resolve, reject) => {
    reject('Error');
  })
  try { 
    let res3 = await p;
    console.log("res3", res3)
  }
  catch(e) { console.log(e);  }
} 
main();   // 返回 'Error'
/*  
  console.log("res3", res3)  不会执行,  
    因为 try 没成功 ,  reject 的 Error 被 catch 捕获了
*/
```



async 和 await 结合 : 

```js
/**
 * resource  1.html  2.html 3.html 文件内容
 */

const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

// 回调地狱读取文件 :
// fs.readFile('./resource/1.html', (err, data1) => {
//     if(err) throw err;
//     fs.readFile('./resource/2.html', (err, data2) => {
//         if(err) throw err;
//         fs.readFile('./resource/3.html', (err, data3) => {
//             if(err) throw err;
//             console.log(data1 + data2 + data3);
//         });
//     });
// });

//async 与 await 读取文件
async function main(){
    try{
        let data1 = await mineReadFile('./resource/1.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log(data1 + data2 + data3);
    }catch(e){
        console.log(e.code);
    }
}

main();
```





## async / await 本质

是 generator 的语法糖







# /

# /

# /

# 待整理

在 async function 中，可以在调用返回 Promise 的函数之前使用 `await` 关键字。

这使得代码在该点等待直到 `Promise` 被 settled，此时 `Promise`的 fulfilled value 被视为返回值，或者被 rejected 的值被抛出。这使您能用同步代码写异步。

例如，我们可以使用它来重写我们的 fetch 示例：

```javascript
async function fetchProducts() {
  try {
    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {  
      throw new Error(`HTTP error: ${response.status}`);
    }
    // after this line, our function will wait for the `response.json()` call to be settled
    // the `response.json()` call will either return the JSON object or throw an error
    const json = await response.json();
    console.log(json[0].name);
  }
  catch(error) {
    console.error(`Could not get products: ${error}`);
  }
}

fetchProducts();
```

在这里，我们调用了` await fetch()`，而不是得到一个 `Promise`，调用返回一个完整的 Response 对象，就像 `fetch()` 是一个同步函数一样！

我们甚至可以使用 `try...catch` 块进行错误处理，就像代码是同步的一样。

请注意，这个魔法只在 async 函数中起作用。



多个 await 是异步执行的，比如：

```js
function test1() {
	setTimeout( ()=> {
		console.log(111);
	}, 1000);
}
function test2() {
	console.log(222);
}
async function test3() {
	await test1();  // SetTime()
	await test2();
}
test3();
```

结果输出是 222、111



### await 等待 Promis ：

await等待的东西分两种情况，promise 和非 promise，遇到 promise 会阻塞下边的代码，遇到非 promise 的会直接根据情况异步执行。

```js
function test1() {
	return new Promise(resolve => {
        setTimeout(() => {
            console.log(111);
            resolve();
        }, 2000)
    })
}
function test2(res) {
	setTimeout(() => {
	    console.log(222);
	}, 1000);
}
async function test3() {
    await test1();
    await test2();
}
test3();

// Output : 111、222

// 过程：
1. 执行 test1()，因为函数体里有 promise，所以阻塞后面的 await 代码，此时 test2() 不执行 （ 注意！！！ ）
2. 运行 test1() 里的 setTimeout ，等待2s，输出111，运行resolve()
3. 执行 test2()，等待 1s，输出222。
```



### async function 返回 Promise

async function 返回 Promise ！ 所以可以这样：

```js
async function fetchProducts() {
  try {
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const json = await response.json();
    return json;
  }
  catch(error) {
    console.error(`Could not get products: ${error}`);
  }
}

const jsonPromise = fetchProducts();
jsonPromise.then(
  (json) => console.log(json[0].name)
);
```



## Promise.all

Promise.all() 方法将一个可迭代的 Promise 作为输入，并返回一个 Promise

> 注：Array，Map，Set 都属于 ES6 的 iterable 类型

返回值 Promise 被解析 (resolve) 为输入 Promise 的结果数组。 

当输入的所有 Promise 都已 resolved ，或者 input iterable 不包含任何 promises 时，此返回的 Promise 将被解决(resolved)。 

它会在任何输入的 promise 被拒绝或 non-promise 抛出错误时立即拒绝(reject)，并会在第一个拒绝 Message / Error 中拒绝。

如下代码 , 将会在 2.5s (2.5 秒)  后返回 `Array [3, 42, "foo"]`

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2500, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```



返回值

- 如果传入的参数是一个空的可迭代对象，则返回一个**已完成（already resolved）**状态的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
- 如果传入的参数不包含任何 `promise`，则返回一个**异步完成（asynchronously resolved）**[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。注意：Google Chrome 58 在这种情况下返回一个**已完成（already resolved）**状态的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
- 其它情况下返回一个**处理中（pending）**的[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。这个返回的 `promise` 之后会在所有的 `promise` 都完成或有一个 `promise` 失败时**异步**地变为完成或失败。 见下方关于“Promise.all 的异步或同步”示例。返回值将会按照参数内的 `promise` 顺序排列，而不是由调用 `promise` 的完成顺序决定。



说明 :  此方法在集合多个 `promise` 的返回结果时很有用。



### Mongo 实例: 

MongoDB 的 `Word.findOne({ word: words })`  返回一个 Promise : 

如果我们想搜索一个 list `['word1', 'word2']` 对应的信息 , 就需要等待所有 word 的 `Promise`  执行完毕 : 

```js
arr = [ 'process', 'prevail' ]  // 要求找到这 2 个 word 的 id : 
const mapLoop = async () => {
  console.log("Start");

  const promises = await arr.map(async (word_) => {
    return Word.findOne({ word: word_ });
  });
  const wordIds = await Promise.all(promises);
  // 不能过早地调 ._id !!!
  console.log( "wordIds : ", wordIds.map((item) => item._id));
};

mapLoop();
```





原 example : 

```js
const fruitsToGet = ['apple', 'grape', 'pear']

const mapLoop = async () => {
  console.log('Start')

  const promises = await fruitsToGet.map(async fruit => {
    const numFruit = new Promise((resolve, reject) => {
      setTimeout(() => resolve(fruit), 1000)
    });
    return numFruit
  })
  const numFruits = await Promise.all(promises)
  console.log(numFruits)

  console.log('End')
}

mapLoop();
```

esults

```js
Start
["apple", "grape", "pear"]
End
```

[source](https://zellwk.com/blog/async-await-in-loops/) [demo](https://stackblitz.com/edit/map-loop-await?file=index.ts)



## 异步编程方法

**一、回调函数**

`callback()` 是异步编程最基本的方法。

假定有两个函数 `f1` 和 `f2` ，`f2()` 等待 `f1()` 的执行结果，如果 `f1()` 很耗时，可以把 `f2` 写成 `f1` 的回调函数。

```js
function f1(callback){
  setTimeout(function () {
    // f1的任务代码

    callback();   // f2 被写成了 callback()  , 1 s 后执行 callback，这里可能没有等 f1 执行完就开始执行了。
  }, 1000);
}
```

执行代码就变成下面这样：

```js
　f1(f2);
```

采用这种方式，把同步操作变成了异步操作，`f1` 不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。

回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度[耦合](https://en.wikipedia.org/wiki/Coupling_(computer_programming))（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。



**二、事件监听**

另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

还是以 `f1` 和 `f2` 为例。首先，为 `f1` 绑定一个事件（这里采用的 jQuery 的[写法](https://api.jquery.com/on/)）。

```js
　　f1.on('done', f2);
```

上面这行代码的意思是，当 `f1` 发生 done 事件，就执行 `f2` 。 对 `f1` 进行改写：

```js
function f1(){
  setTimeout(function () {
    // f1的任务代码
    f1.trigger('done');
  }, 1000);           // 等 1 s ，就触发 done 事件。
}
```

`f1.trigger('done')` 表示，执行完成后，立即触发 done 事件，从而开始执行 `f2` 。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以**去耦合**  (Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。



**三、发布/订阅**

上一节的"事件"，完全可以理解成"信号"。

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做["发布/订阅模式"](https://en.wikipedia.org/wiki/Publish-subscribe_pattern)（publish-subscribe pattern），又称["观察者模式"](https://en.wikipedia.org/wiki/Observer_pattern)（observer pattern）。

这个模式有多种[实现](https://msdn.microsoft.com/en-us/magazine/hh201955.aspx)，下面采用的是Ben Alman的[Tiny Pub/Sub](https://gist.github.com/661855)，这是jQuery的一个插件。

首先，f2 向 "信号中心" jQuery 订阅 "done" 信号。

```js
　jQuery.subscribe("done", f2);
```

然后，f1进行如下改写：

```js
　　function f1(){

　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　**jQuery.publish("done");**
　　　　}, 1000);
　　}
```



`jQuery.publish("done") `的意思是，`f1` 执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

此外，`f2` 完成执行后，也可以取消订阅（`unsubscribe`）。

```js
　jQuery.unsubscribe("done", f2);
```



这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。