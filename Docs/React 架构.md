React 架构



## Model & View

在开始正式讲解之前，先举一个例子，如图1所示。这是一个很简单的计数器，单击“减”按钮，数字就会减 1；单击“加”按钮，数字就会加 1。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-025046.jpg" style="zoom:50%;" />

在 MV 系列框架中，M 和 V 指 Model 层和 View 层，但是其功能会因为框架的不同而变化：

- Model 层很好理解，就是存储数据；
- View 层则是展示数据，读者能看见这个例子，完全就是因为存在 View 层。

虽然在不同的框架中， View 层和 Model 层的内容可能会有所差别，但是其基础功能不变，变的只是数据的传输方式。

后面的架构里的 M 和 V , 都是以 Model 和 View 为基础衍生的



## MVC

20 世纪 70 年代，施乐公司发明了 Smalltalk 语言，用来编写图形界面的应用程序，脱离了 DOS 系统，让系统可视化

在 Smalltalk 发展到 80 版本的时候，MVC 框架被一位工程师提出来，之后被广泛应用于构架桌面和服务器应用程序。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-025237.jpg" style="zoom:67%;" />

> （实线表示调用，虚线表示通知）。

Controller 是 MVC 中的 C，指控制层，在 Controller 层会接收用户所有的操作，并根据写好的代码进行相应的操作——触发 Model 层，或者触发 View 层，抑或是两者都触发。

需要注意：Controller 层触发 View 层时，并不会更新 View 层中的数据，View 层中的数据是通过监听 Model 层数据变化而自动更新的，与 Controller 层无关。

----

MVC 框架流程 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-025508.jpg" style="zoom:67%;" />


从图 3 中可以看出，MVC 框架主要有两个缺点：

- MVC 框架的大部分逻辑都集中在 Controller 层，代码量也都集中在 Controller 层，这带给 Controller 层很大的压力，而已经有独立处理事件能力的 View 层却没有用到。
- 还有一个问题，就是 Controller 层和 View 层之间是一一对应的，断绝了 View 层复用的可能，因而产生了很多冗余代码。



例 : 传统的 MVC 结构 , 其 Model 和 View 的双向绑定使得出现 Bug 后很难定位具体问题 ; 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-024407.png" style="zoom:50%;" />



为了解决以上问题，MVP 框架被提出来。



## MVP  (Model-View-Presenter)

在 MVC 框架中，View 层可以通过访问 Model 层来更新

但在 MVP 框架中，View 层不能再直接访问 Model 层，必须通过 Presenter 表示层提供的接口，然后 Presenter 层再去访问 Model 层。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-025605.jpg" style="zoom:67%;" />

这看起来有点多此一举，但用处着实不小，主要有两点：

- 首先是因为 Model 层和 View 层都必须通过 Presenter 层来传递信息，所以完全分离了 View 层和 Model 层，也就是说，View 层与 Model 层一点关系也没有，双方是不知道彼此存在的，在它们眼里，只有 Presenter 层。
- 其次，因为 View 层与 Model 层没有关系，所以 View 层可以抽离出来做成组件，在复用性上比 MVC 模型好很多。


MVP 框架流程如图5所示：

<img src="https://cdn.nlark.com/yuque/0/2021/gif/22354276/1634179922473-e4e32b33-fa47-41a0-b364-2d17b522d48d.gif" alt="img" style="zoom:67%;" />



从图5中可以看出，View 层与 Model 层确实互不干涉，View 层也自由了很多。但还是有问题，因为 View 层和 Model 层都需经过 Presenter 层，致使 Presenter 层比较复杂，维护起来会有一定的问题。而且因为没有绑定数据，所有数据都需要 Presenter 层进行“手动同步”，代码量比较大，虽然比 MVC 模型好很多，但也是有比较多的冗余部分。

为了让 View 层和 Model 的数据始终保持一致，避免同步，MVVM 框架出现了。



## MVVM

MVVM 最早是由微软在使用 Windows Presentation Foundation 和 SilverLight 时定义的，2005 年微软正式宣布 MVVM 的存在。VM 是 ViewModel 层，ViewModel 层把 Model 层和 View 层的数据同步自动化了，解决了 MVP 框架中数据同步比较麻烦的问题，不仅减轻了 ViewModel 层的压力，同时使得数据处理更加方便——只需告诉 View 层展示的数据是 Model 层中的哪一部分即可。

MVVM 框架如图 6 所示：

<img src="https://cdn.nlark.com/yuque/0/2021/gif/22354276/1634179922935-da67d00b-9337-42b8-816f-2d21485066aa.gif" alt="img" style="zoom:77%;" />




读者可能感觉 MVVM 的框架图与 MVP 的框架图相似，确实如此，两者都是从 View 层开始触发用户的操作，之后经过第三层，最后到达 Model 层。但是关键问题是这第三层的内容， ViewModel 层双向绑定了 View 层和 Model 层，因此，随着 View 层的数据变化，系统会自动修改 Model 层的数据，反之同理。而 Presenter 层是采用手动写方法来调用或者修改 View 层和 Model 层，两者孰优孰劣不言而喻。

MVVM 框架流程图如图7所示：

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-031334.jpg" style="zoom: 80%;" />

可以看出，View 层和 Model 层之间数据的传递也经过了 ViewModel 层， ViewModel 层并没有对其进行“手动绑定”，不仅使速度有了一定的提高，代码量也减少很多，相比于 MVC 和 MVP，MVVM 有了长足的进步。

至于双向数据绑定，可以这样理解：双向数据绑定是一个模板引擎，它会根据数据的变化实时渲染。这种说法可能不是很恰当，但是很好理解，如图 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-031504.jpg" style="zoom:80%;" />

如图8所示，View 层和 Model 层之间的修改都会同步到对方。

MVVM 模型中数据绑定方法一般有以下3种：

- 数据劫持
- 发布-订阅模式
- 脏值检查



## MVC、MVP 和 MVVM三者的区别和优劣

详细了解 MV 系列框架之后，相信读者已经了解 MVC、MVP、MVVM 这三者的优劣了。其实从 MVC 到 MVP 再到 MVVM，是一个不断进步的过程，后两者都是在 MVC 的基础上做的变化，使 MVC 更进一步，使用起来也更加方便。

MVC、MVP、MVVM 三者的主要区别就在于除 View 层和 Model 层之外的第三层，这一层的不同使得 MV 系列框架区分开来。

其实很难说出 MVC、MVP、MVVM 哪一个更好，从表面上看，显然是 MVVM 最好，使用起来更方便，代码相对也较少。但问题是 MVVM 的框架体积较大，相比于 MVC 的不用框架、MVP 的 4KB 框架，MVVM 遥遥领先。虽然 MVVM 框架可以单独引用，但现在更多使用前端脚手架工具进行开发，并且使用打包工具，这样一来，它跟 MVC 相比，体积是天差地别。

虽然机能过剩更令人放心，但是轻巧一些的框架会令项目锦上添花。所以要根据实际项目的需求来选择 MVC、MVP、MVVM，只有最适合的模式才是最好的框架。

每项新技术都要经历一个从一开始不被大众认可到后来人尽皆知的过程，其实就是一个改变的过程。只要这个框架能跟上时代的潮流，满足人们开发的需求，这就是一个合适的框架。

因此，如果你想真正从事开发这一行业（尤其是前端），需要拥有一颗不惧变化的心。



## Flux 架构

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-030629.jpg)

先看最下面的 `React Views` :

- 用户访向 View 产生交互
- View发出用户的Action
- Dispatcher 派遣器收到 Action, 要求 Store 进行相应的更新
- Store 更新后，发出一个 "change" 事件
- View收到"change"事件后，更新页面



下图可能更加直观 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-20-031204.png" style="zoom:50%;" />



### Flex 衍生 - Redux  Mob-X

Redux /ri'dʌks/ 



纯函数更新 Store : 

- Output 完全取决于 Input, 整个函数非常容易预测和测试 ; 



Store : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-22-014901.png" style="zoom:50%;" />

```js
const store = createStore(reducer)

Store 的 3 哥重要方法: 
* getState() : 得到当前数据
* dispatch(action) : UI 上的用户变化会被 dispatch 给 reducer
* subscribe(listener) : 当 store 数据有任何变化时, 都会调用它的 callback listener
```



action : 

描述了"行为" 的数据结构

```js
{
  type: ADD_TODO_ITEM,
  text: 'build my 1st Redux app'
}
```



异步 action : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-22-021207.png" alt="image-20220722101205302" style="zoom:30%;" />

比如点击按钮发 Ajax 异步网络请求 , 此时  Actions不会直接 dispatch 给 Reducer,  而是被一个 Middlewares 截获 , 去实现异步 action 的流程 , 返回状态 { 请求成功 , 请求失败} 给 Reducer 进行处理

- 中间件检查 Actions 返回的东西 : 
  - 如果是函数直接执行 
  - 如果是 Promise , 则进行截获和中间处理





Reducer : 

处理 action, 更新 Store 

- state 是之前的状态 , 如果没有之前的状态, 则使用 InitialState
- 注意: 所有的 Reducer 会接受到所有的 action , 通过 `action.type` 来判断自己要不要执行 ; 

```js
function todoApp(state = InitialState, action) {
  switch(action.type) {
    case ADD_TODO_ITEM:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
} 
```



不可变数据

不可以直接修改它的值 , 需要复制一份, 添加新数据的方式来实现修改 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-22-024007.png" style="zoom:50%;" />

如上图 , 为实现对黄色节点的修改, 需要新建绿色的 Nodes

 

为何需要不可变数据 ? 

1. 性能优化
2. 易于调试和跟踪 
3. 易于推测



原生写法 :  `{ ... }, Object.assign`  







## 组件的生命周期

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

![image-20220721143009800](/Users/soda/Library/Application Support/typora-user-images/image-20220721143009800.png)





## 虚拟 DOM

原来的 `N^3` 优化到了 `O(N)` ,变成了完全线性的算法  

广度优先分层比较



虚拟 DOM 能用 Diff 算法的两个假设

1. 组件的DOM结构是相对稳定的
2. 类型相同的兄弟节点可以被唯一标识







## 高阶组件 Higher Order Component 



## 函数作为子组件

- function 实例
- 函数作为子组件  context 的实例  , 只是提供数据, 至于数据你怎么使用不是我关心的 . 





## 脚手架工具

ESLint 做语法检查

**create-react-app**  快速开始 React 开发 ;

1. Babel
2. Webpack Config
3. Testing
4. ESLing



**Rekit**

1. Redux
2. React Router
3. Less/Scss
4.   Feature Oriented Architecture
5. Dedicated IDE



**Codesandbox**

Node 运行在浏览器端







## Router

三种路由实现方式

1. URL 路径 
2. Hash 路由 : `HashRouter`  : `/#/home` : 支持低版本的浏览器
3. 内存路由  `MemoryRouter` : URL 不发生变化 , 页面内容发生变化 , 一般用在服务器端渲染中



基于路由配置进行资源组织

1. 实现业务逻辑的松耦合
2. 易于扩展, 重构和维护 
3. 路由层面实现 Lazy Load



API: 

- 





页面状态尽量通过 URL 参数定义 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-22-025802.png" style="zoom:40%;" />

最直接的想法 : 不借助 URL , 而是将月份作为内部状态去传递 ; 

问题 : 如果其他页面也需要考勤信息, 比如具体的员工 8 月薪资页面也需要 8 月考勤,  那么整个参数的传递就会变得复杂, 

所以直接把**月份参数定义在 URL 里面, 始终从 URL 参数中去读月份信息** , 方便重用



## 使用 Next.js 创建 React 同构应用

什么是同构应用 ? 

- 「后端渲染 SSR」指传统的Java 、 PHP 的渲染机制，前端一般只负责出UI样式界面模板和js交互代码。
- 「前端渲染」指使用 JS 来渲染页面大部分内容，代表是现在流行的 SPA 单页面应用，后端只用负责出数据接口，前后端几乎全部使用异步数据请求（如ajax、fetch等）交互。
- 「同构渲染」加入一个中间层的概念，node中间层从后端接过渲染的逻辑，首次渲染时使用 Node.js 来直出 HTML，后续客户端交互包括当前页路由切换直接在客户端完成。一般来说同构渲染是介于前后端中的共有部分。

同构渲染大致意思就是前端后端都要参与渲染，而且首次渲染出的html要一样。现在主流这几个框架都提供了同构渲染的api ,如React的服务端渲染方法 renderToString和对应的前端渲染方法 render

**前后端同构就是 SSR 的一种实现方式**



**优点 :** 

- 内容是服务端渲染的 , 页面开发速度快 , 搜索引擎友好



Next.js 开发约定 : 

1. 页面就是 Pages 目录下的一个组件
2. static 目录映射静态文件
3. page 具有特殊静态方法 getInitialProps



```js
npm install --save next react react-dom
```



1. 使用 `<next/link>` 定义链接
2. 点击链接时页面不会刷新
3. 使用 prefetch  预加载目标资源. 
4. 使用 replace 属性替换 URL ( 无法后退到前一个 Page )







## 单元测试 - Jest / Enzyme

React 让前端单元测试变得容易

1. React 应用很少需要访问浏览器 Dom API
2. 虚拟 DOM 可以在 Node.JS 环境运行和测试 
3. Redux  隔离了状态管理, 纯数据层单元测试



1. Jest : FB 开源的 JS 单元测试框架 
2. JS DOM : 浏览器环境的 Node.js 模拟
3. Enzyme : React 组件渲染和测试
4. Nock : 模拟 HTTP 请求
5. sinon : 函数模拟和调用跟踪 
6. istanbul:  单元测试覆盖率



## 常用开发调试工具

ESLint

- 使用 `.eslintrc` 进行规则的配置
- 使用 Airbnb 的 JS 代码风格



Prettier

- 代码格式化的神器
- 保证更容易写出风格一致的代码

React Dev Tool

Redux DevTool







## 使用 JSON 定义顶层路由

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220723081628742.png" alt="image-20220723081628742" style="zoom:50%;" />







## 搜索 /数据缓存和分页

1. 如何翻页
   1. 是否要储存所有数据 ?
   2. 每次翻页是否要 fetch sever  ?
2. 如何进行内容搜索 
   1. 搜索在前端 or 后端完成 ? 
3. 如何缓存数据
4. 何时进行页面刷新



保持 Redux 的扁平化





URL 设计和 Store 同步 : 

- URL:  `/list/page?keyword=xxx`





## 拖放 

### 拖动侧边栏宽度 : 

1. 如何使用 React 的鼠标x件系统
2. 如何判断拖放开始和拖放结束
3. 如何实现拖放元素的位置移动
4. 拖放状态在组件中如何维护



https://codesandbox.io/s/drag-p3e1p







比较简单 , 就是 3 个方法 : 

localstorage 存储宽度位置 width 

拖放页面的元素 : 





## React Portals 实现对话框

传送门 Portals .

1. 可以将虚拟 DOM 映射到任何真实 DOM 节点
2. 解决了漂浮层 (遮罩层) 的问题 , 比如 Dialog  , Tooltip 等



Portals can also be applied to building:

- Tooltips  工具提示
- Full-page, top-level sidebars  整页的顶级侧边栏
- Global search overalls  全局搜索工作
- Dropdowns within a hidden overflow parent containers  隐藏的溢出父容器中的下拉菜单



----

### 实例

First , 重要的组件定义：

- `ReactPortal` ：一个 Wrapper (包装组件)，它创建一个 Portal 并在默认层次结构之外的提供的容器中呈现内容
- `Modal`： 模态(情态) 组件，其中包含要使用 ReactPortal 呈现的 JSX 内容
- `App` : 在这里使用 Modal 组件 , 并控制其活动状态（打开或关闭）



#### 1. ReactPortal.js

`src/components/ReactPortal.js` 

```js
import { createPortal } from 'react-dom';

function ReactPortal({ children, wrapperId }) {
  return createPortal(children, document.getElementById(wrapperId));
}
export default ReactPortal;
```



如果在 DOM 中找不到 wrapperId 这样的元素，我们可以自定义 ReactPortal 组件以使用提供的 ID 创建一个元素。

we add a helper function to create an empty `div` with a given ID, append it to the body, and return the element  : 

```React
function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
```

update the `ReactPortal` component  : 

```js
// Also, set a default value for wrapperId prop if none provided
function ReactPortal({ children, wrapperId = "react-portal-wrapper" }) {
  let element = document.getElementById(wrapperId);
  // if element is not found with wrapperId,  create and append to body
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, element);
}
```

这种方法有一个局限性。如果 wrapperId 属性发生变化，ReactPortal 组件将无法处理最新的属性值。为了解决这个问题，我们需要将任何依赖于 wrapperId 的逻辑移动到另一个操作或副作用。



#### 2. html Dom 优先级

当没有为元素设置 z-index 时，DOM 层次结构的默认行为是 : 

- 在层次结构中显示较低 ( appear lower ) 的元素将具有较高的优先级。
- 简单来说，顺序很重要。

因此，附加到 DOM 中的 body（在所有元素之后）将确保门户容器元素在层次结构中具有更高的优先级。

```html
<body>
    <div id="root" />
<div id="portal-root" />
</body>
```

在上面的代码片段中，ID 为 `portal-root ` 的 div 将具有更高的优先级，因为它出现得较晚。

直接修改 HTML 或以编程方式添加 portal root 完全取决于您；下面我们将以编程方式添加和删除门户容器元素。



#### 3. Handling dynamic `wrapperId` 

使用 `useLayoutEffect` 处理动态的 wrapperId . 

前面提到 : 如果 wrapperId 属性发生变化，ReactPortal 组件将无法处理最新的属性值。为了解决这个问题，我们需要将任何依赖于 wrapperId 的逻辑移动到另一个操作或副作用。



React Hooks 之 :  `useLayoutEffect` 和 `useEffect` 实现了相似的结果，但用法略有不同。

一个快速的经验法则是，如果效果需要同步并且 DOM 上存在任何直接 mutations ，则使用 useLayoutEffect。

由于这种情况非常罕见，因此 useEffect 通常是最佳选择 (useEffect 异步运行)。

在这种情况下，我们直接改变 DOM 并希望在重新绘制 DOM 之前同步运行效果，因此使用 `useLayoutEffect` Hook 更有意义。



```React
import { useState, useLayoutEffect } from 'react';
// ...

function ReactPortal({ children, wrapperId = "react-portal-wrapper" }) {
  
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}
```

- First, let’s move the `find` element and creation logic into the `useLayoutEffect` Hook, 

- Next, we’ll set the `element` to state. 
- When the `wrapperId` changes, the component will update accordingly.



#### 4. Handling effect cleanup

处理 Effect 清理

- 在没有找到元素的情况下，我们直接改变 DOM 并在正文中附加一个空 div。因此，我们需要确保在卸载 ReactPortal 组件时，将动态添加的空 div 从 DOM 中移除。
- 此外，我们必须避免在清理过程中删除任何现有元素。
- 添加一个 systemCreated 标志，并在调用 createWrapperAndAppendToBody 时将其设置为 true。
  - 如果 systemCreated 为真，我们将从 DOM 中删除该元素。
- 更新后的 useLayoutEffect 将如下所示：

```React
// ...
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]);
// ...
```

我们已经创建了 Portal 并对其进行了定制以确保 fail-safe。

接下来，让我们创建一个简单的模态组件并使用 React Portal 渲染它



#### 5. modal component

为了构建模态组件，我们首先在 `src/components` 下创建一个新目录 `Modal`，添加两个新文件

- `Modal.js` 和 
- `modalStyles.css` 



modal 组件接受几个属性：

1. isOpen：一个布尔标志，表示模态的状态（打开或关闭），并在呈现模态的父组件中控制

2. handleClose：通过单击关闭按钮或触发关闭的任何操作调用的方法



只有当 isOpen 为 true 时，模态组件才会呈现内容。 

`modal` 情态组件将在 false 时返回 null，因为我们不想在 DOM 关闭时还将其保留在 DOM 中 : 

```React
// src/components/Modal/Modal.js
import "./modalStyles.css";

function Modal({ children, isOpen, handleClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <button onClick={handleClose} className="close-btn">
        Close
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
}
export default Modal;

/* src/components/Modal/modalStyles.css */
.modal {
  position: fixed;
  inset: 0; /* inset sets all 4 values (top right bottom left) much like how we set padding, margin etc., */
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;
  padding: 40px 20px 20px;
}

.modal-content {
  width: 70%;
  height: 70%;
  background-color: #282c34;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
```

此代码将使 modal 模态框占据整个 viewport 视口，并将 .modal-content 垂直和水平居中对齐。



#### 6. 使用 Escape 键关闭 Modal 

模态框可以通过单击关闭按钮来关闭，触发 `handleClose` 。让我们还添加通过 press  Esc 关闭 Modal 的功能。

为此，我们将附加 `useEffect keydown` 事件侦听器。我们将在效果清理时移除事件监听器。

在 keydown 事件中，如果 Escape 键被按下，我们将调用 handleClose  ( handleClose 是传过来的 )

```React
// src/components/Modal/Modal.js
import { useEffect } from "react";
import "./modalStyles.css";

function Modal({ children, isOpen, handleClose }) {
  
  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <button onClick={handleClose} className="close-btn">
        Close
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
```

我们的模态组件现在已经准备好行动了 !



#### 7. change DOM hierarchy

Let’s render the demo `Modal` component in an app.

we’ll send `isOpen` and `handleClose` as properties to the `Modal` component.

The `handleClose` property is simply a callback method that sets the `isOpen` state to `false` in order to close the modal.

```React
import Modal from "./components/Modal/Modal";
import "./App.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button onClick={() => setIsOpen(true)}>
          Click to Open Modal
        </button>

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          This is Modal Content!
        </Modal>
      </header>
    </div>
  );
};
```

模态可以通过单击单击打开模态按钮来打开。

可以通过按 Esc 退出键或单击关闭按钮来关闭 - 任一操作都将触发 handleClose 方法并关闭模式。



如果我们看一下 DOM 树，我们会看到模态框根据默认的 DOM 层次结构被渲染为标题的子项。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-25-024455.jpg)

 **↑ Modal built with** `ReactPortal`



让我们用 ReactPortal wrap Modal 的 return  JSX，以便模态在 DOM 层次结构之外和提供的容器元素内呈现。动态容器作为 DOM 中主体的最后一个子项附加。

Modal 组件的更新返回方法应如下所示：

```React
// src/components/Modal/Modal.js
import ReactPortal from "../ReactPortal";
// ...

function Modal({ children, isOpen, handleClose }) {
  // ...

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="modal">
        // ...
      </div>
    </ReactPortal>
  );
}
// ...
```

由于我们还没有添加带有 react-portal-modal-container ID 的容器，因此将使用该 ID 创建一个空 div，然后将其附加到正文中。 Modal 组件将在这个新创建的容器中呈现，在默认 DOM 层次结构之外。只有生成的 HTML 和 DOM 树被更改。

React 组件的 header 和 Modal 组件之间的父子关系保持不变。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-25-025341.jpg)



如下图，我们的 demo modal 渲染正确，但是 UI 的打开和关闭感觉太瞬间了：



#### 8. Applying a transition with CSS Transition

```bash
react-transition-group
```

https://blog.logrocket.com/build-modal-with-react-portals/



----



如下 : 

```React
render() {
  if (!visible) { return renderButton() }
  return 
    ReactDom.createPortal(
      renderDialog(),
      document.getElementById("Dialog-container")
    )
}
```

把一个组件 , render 到 DOM 节点上 , 但是在虚拟 DOM 中 ,仍在原来的组件位置 . 



```html
<!-- index.html -- >

<div id='root' ..>
<div id='dialog-container' ..>
```







## 集成第三方库 - 例 D3.js

集成第三方库 :  对于一些非常依赖 DOM 节点的库, 比如 `D3.js`  ( svg / canvas  / html 节点) 来进行 UI 的控制



集成第三方库技术要点 : 

1. 使用 ref 获取原生 DOM 节点引用
2. 手动将组件状态更新到 DOM 节点 
3. 组件销毁时移除原生节点 DOM 事件



## 性能问题

组件的粒度越细 , 就越可能拆分成纯函数组件



### 网络优化 - 自动化按需加载



### Reselect

Redux - 缓存



### 异步渲染

时间分片 Time Slicing : 

- DOM 操作的优先级低于浏览器原生行为 :  例如键盘和鼠标输入 , 从而保证操作流畅。





渲染挂起 ( Suspense )

- 虚拟 DOM 节点可以等待某个异步操作的完成, 并指定 timeout , 之后才能完成真正的渲染





## 使用 Chrome DevTool 进行性难调优

- 使用 React DevTool 找到多余渲染
- 使用 Chrome DevTool  定位性能瓶颈
  - 看 [Com] 组件 花了 [ T ] 时间 ,做了 [ R ] 渲染



**React DevTool - HighLight Update :** 

HighLight Update 高亮更新部分 , 对于一个计数器来说,   `＋ 3 －`  , 当点击加减时 , 理想状态下只有 3 进行局部刷新 , 其他组件应该是不变的 , 如果其他部分 ( 如 Menu) 也在跟着进行 UI 刷新 , 需要看下是否绑定了 Redux 的数据变化 ; 



**Chrome - Performance :**

> 1. 点击左上圆圈开始记录
> 2. CPU 降速 ( 如 CPU 4x Slowdown)
> 3. 进行组件操作和测试
> 4. 操作完后 , 点击 Stop 停止记录 , Chrome 会自动计算这段操作内的性难耗费

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-26-003626.png" alt="image-20220726083614146" style="zoom:50%;" />



Script - 做 Dom Diff

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-26-004127.png" style="zoom:30%;" />

