React 是一个用于构建可重用用户界面 (UI) 的 JavaScript 库

当我们使用 React 时，我们不会直接与 DOM 交互。 React 有自己的方式来处理 DOM（文档对象模型）操作。 React 使用它的虚拟 DOM 进行新的更改，它只更新需要更改的元素。

在构建 React 应用程序时不要直接与 DOM 交互，并将 DOM 操作工作留给 React 虚拟 DOM。

# 开发实例



## create-react-app 

最初的 `create-react-app` 于 2016 年 7 月 22 日发布。在此之前，开发人员过去常常使用 JavaScript 模块捆绑器、`babel` 和所有必要的包手动配置 `webpack`，这过去需要半小时甚至更长时间。现在，`create-react-app` 将处理所有事情。

> create-react-app 来自 npm ( Node Package Manager)  ,  npm 在 安装 Node 时会被自动安装。

```apl
$ cnpm install -g create-react-app     // 全局安装 create-react-app 包。
$ create-react-app my-app
$ cd my-app/
$ npm start
```



----



**安装 VSCode**

下载 VSCODE： https://az764295.vo.msecnd.net/stable/dfd34e8260c270da74b5c2d86d61aee4b6d56977/VSCode-darwin-universal.zip

You may need to install these extensions from Visual Studio Code  （在首选项里搜索安装）

- Prettier
- ESLint
- Bracket Pair Colorizer
- ES7 React/Redux/GraphQL/React-Native snippets





## Module

A Package is a `module`  or  `a collection of modules`. 

举例（For instance） , React, ReactDOM are packages.

export 和 export default 的区别： https://zhuanlan.zhihu.com/p/389813789

```js
// math.js 文件，里面定义了很多可以被其他文件引用的东西
export const addTwo = (a, b) => a + b
export const multiply = (a, b) => a * b
export const subtract = (a, b) => a - b

//self-invoking 函数
export default (function doSomeMath() {
  return {
    addTwo,
    multiply,
    subtract,
  }
})()


// index.js
// > 现在让我们将 math.js 模块导入本文件（index.js） ：
import doSomeMath from './math.js'

// to import the other modules
// 由于这些模块没有默认导出，我们必须解构
import { addTwo, multiply, subtract } from './math.js'

import * as everything from './math.js' // to import everything remaining
console.log(addTwo(5, 5))
console.log(doSomeMath.addTwo(5, 5))
console.log(everything)
```



## 第三方 Package

**NPM or Yarn ？**

> 您可以使用 npm 或 yarn 来安装包。Yarn 需要单独安装。尽量不要在一个应用程序中同时使用两种包管理工具。

npm 注册表上有超过 140 万个 JavaScript 包。到目前为止，几乎所有类型的问题都有一个包。我们不必创建轮子，而是必须知道如何使用轮子。

Sometimes you many need the following packages in your React applications. 

Specially` node-sass, moment and axios` are important for some projects.

- [node-sass](https://www.npmjs.com/package/node-sass)

- > node-Sass 是一个 CSS 预处理程序，编写 CSS 函数、嵌套(nesting) 等

- [moment](https://www.npmjs.com/package/moment)

- [axios](https://www.npmjs.com/package/axios)

- [react-icons](https://react-icons.github.io/react-icons/)

- [styled-components](https://styled-components.com/)

- [reactstrap](https://reactstrap.github.io/)

- [lodash](https://www.npmjs.com/package/lodash)

- [uuid](https://www.npmjs.com/package/uuid)





让我们看看如何将包安装到应用程序中。首先，我们进入项目目录，编写如下命令。

```sh
cd xxx
// syntax, we can use i or install
npm i package-name

// or
yarn add package-name
```



----



 **node-sass**

安装 node-sass 后，可以在 React 中使用 Sass。创建一个样式文件夹，并在此文件夹中创建 test.scss。将此文件导入 组件 或 index.js。（ 无需将 node-sass 导入组件）

```css
/*  Folder：  ./styles/header.scss   */
/* 定义 header 的样式 ？....  */
header {
  background-color: #61dbfb;
  padding: 25;
  padding: 10px;
  margin: 0;
}
```



```js
// Header.js
import React from 'react'
import './styles/header.scss  // 导入样式文件, 可能使用 <header> 的时候就自动调用了吧....
const Header = () = (
   <header>
          <div className='header-wrapper'>
            <h1>30 Days Of React</h1>
            <h2>Getting Started React</h2>
            <h3>JavaScript Library</h3>
            <p>Instructor: Asabeneh Yetayeh</p>
            <small>Oct 15, 2020</small>
          </div>
        </header>
)

export default Header
```



```js
// App.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/header.scss   // 为啥这里仍要导入 scss 呢？  不懂诶

class App extends Component {
  render() {
    return (
      <div className='App'>
       <Header />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



----



**CSS modules**

作为 Sass 的补充：  除了 Sass，了解如何在 React 中使用 CSS 模块也很好。不必为 CSS 模块单独安装的包。CSS 模块可以与纯 CSS 或 Sass 一起使用。

 CSS 模块的命名约定是一个特定的名称，后跟 点 和 模块（test.module.css 或 test.module.scss）

Naming:

```js
// naming for Sass
// naming for CSS
[name].module.scss
[name].module.css
```



```css
/* ./styles/header.module.scss   <=  [name].module.scss  */ 
.header {
  background-color: #61dbfb;
  padding: 25;
  padding: 10px;
  margin: 0;
}
.header-wrapper {
  font-weight:500
  border: 5px solid orange;
}
```



```js
// Header.js
import React from 'react'
import headerStyles from  './styles/header.module.scss  // 导入 css 文件
// 解包 headerStyles
const {header, headerWrapper} = headerStyles
const Header = () = (
   <header className = {headerStyles.header}>
          <div className={headerStyles.headerWrapper}>
            <h1> 30 Days Of React</h1>
            <h2> Getting Started React</h2>
            <h3> JavaScript Library</h3>
            <p> Instructor: Asabeneh Yetayeh</p>
            <small>Oct 15, 2020</small>
          </div>
        </header>
)

export default Header
```



```React
// App.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/header.scss

class App extends Component {
  render() {
    return (
      <div className='App'>
       <Header />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



----



**axios**

axios 可以发出 HTTP 请求 (GET, POST, PUT, PATCH, DELETE) 来获取数据。一会儿搞一个 get 请求。

```sh
npm install axios
yarn add axios
```



```react
import React, { Component } from 'react'
// Import AXIOS 
import axios from 'axios'
import ReactDOM from 'react-dom'

class App extends Component {
  state = { data: [], }
  componentDidMount() {
    const API_URL = 'https://restcountries.eu/rest/v2/all'
    axios
      .get(API_URL)
      .then((response) => {
        this.setState({
          data: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderCountries = () => {
    return this.state.data.map((country) => {
      const languageOrLanguages =
        country.languages.length > 1 ? 'Langauges' : 'Language'
      const formatLanguages = country.languages
        .map(({ name }) => name)
        .join(', ')
      return (
        <div>
          <div>
            {' '}
            <img src={country.flag} alt={country.name} />{' '}
          </div>
          <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>
              {languageOrLanguages}: {formatLanguages}
            </p>
            <p>Population: {country.population}</p>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div className='App'>
        <h1>Fetching Data Using Axios</h1>
        <div>
          <p>There are {this.state.data.length} countries in the api</p>
          <div className='countries-wrapper'>{this.renderCountries()}</div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

我们可以将 axios 与 `await` 和 `async` 函数一起使用。

为了实现 await 和 async (异步)，我们需要在 `componentDidMount` 之外有单独的函数。且必须通过 try 和 catch 来处理错误。

----



**react-icons**

图标是网站不可或缺的一部分。获取不同的 SVG 图标

```sh
npm install react-icons
yarn add react-icons
```



```react
import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import moment from 'moment'
import {
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti'

const Footer = () => (
  <footer>
    <h5>30 Days Of React</h5>
    <div>
      <TiSocialLinkedinCircular />
      <TiSocialGithubCircular />
      <TiSocialTwitterCircular />
    </div>
    <div>
      <small> Copyright &copy; {new Date().getFullYear()} </small>
    </div>
  </footer>
)

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h4>Welcome to the world of Icons</h4>
        <Footer />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-30-102516.png)



----



**moment**

Moment is a small  JS  library which gives us different **time formats.**

- `moment('2020-10-01').fromNow()`
- `moment(new Date()).format()`

```sh
npm install moment
```



```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h4> How to use moment: </h4>
        <p> This challenge was started {moment('2020-10-01').fromNow()}</p>
        <p> The challenge will be over in {moment('2020-10-30').fromNow()}</p>
        <p> Today is {moment(new Date()).format('MMMM DD, YYYY HH:mm')}</p>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-30-102929.png)



----



**styled-components**

它使用 tagged template literals 来设置组件的样式。它删除了`组件`和`样式`之间的 mapping。

这意味着当你定义你的样式时，你实际上是在创建一个普通的 React 组件，它附加了你的样式。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

// 组件 - 样式
const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
`
const Header = styled.header`
  background-color: #61dbfb;
  padding: 25;
  padding: 10px;
  margin: 0;
`

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header>
          <div>
            <Title>30 Days Of React</Title>
            <h4>Getting Started React</h4>
            <h5>JavaScript Library</h5>
            <p>Instructor: Asabeneh Yetayeh</p>
            <small>Oct 15, 2020</small>
          </div>
        </Header>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

![image-20220430183742861](/Users/soda/Library/Application Support/typora-user-images/image-20220430183742861.png)



----

**reactstrap** 

reactstrap 包允许使用 a component with bootstrap. 



---

**lodash**

根据官方 lodash 文档，“提供模块化、性能和附加功能的现代 JavaScript 实用程序库。”

尝试学习如何使用包 *classnames* 和 *validator*（验证器）。





## 目录结构

- node_modules - 存储 React 应用程序的所有必要 node packages。
- Public
  - index.html - 我们在整个应用程序中拥有的唯一 HTML 文件
  - manifest.json - 指定了开始页面 index.html，一切的开始都从这里开始，用于使应用程序成为渐进式 Web 应用程序
  - robots.txt - web information, 如果网站允许网页抓取
- src
  - App.css, index.css - are different CSS files
  - index.js - 一个允许使用 index.html 连接所有组件的文件
  - App.js - 我们通常导入大部分展示组件的文件
  - serviceWorker.js: 用于添加渐进式 Web 应用功能
  - setupTests.js - to write testing cases

- package.json- 应用程序使用的包列表
- yarn.lock or package-lock.json - 一种锁定包版本的方法







尝试修改 src/App.js 文件代码...

src/index.js 是一个入口文件，里面引用了 App.js : 

```js
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```



编写好 index.html 和 index.js 后，到对应目录去

```
npm start
```







# [Components and Props](https://reactjs.org/docs/components-and-props.html) 组件与属性

**Elements 是 React 应用程序的最小构建块** （smallest building blocks）

与浏览器 DOM 元素不同，React 元素是普通对象，并且创建起来很 cheap。 React DOM 负责更新 DOM 以匹配 React 元素。

一个元素描述了您希望在屏幕上看到的内容：

```React
const element = <h1>Hello, world</h1>;

// Button 组件由单个 HTML 按钮元素组成。
const Button = () => <button>action</button>

// 为 button 设置样式
const buttonStyles = {
  padding: '10px 20px',
  background: 'rgb(0, 255, 0',
  border: 'none',
  borderRadius: 5,
}
const Button = () => <button style={buttonStyles}> action </button>
```



假设在您的 HTML 文件中某处有一个  `<div>` ：

```react
<div id="root"></div>
```

我们称其为“根”DOM 节点，因为其中的所有内容都将由 `React DOM` 管理。

> 仅使用 React 构建的应用程序通常只有一个根 DOM 节点。如果您将 React 集成到现有应用程序中，您可以拥有任意数量的隔离根 DOM 节点。



要渲染 React 元素，首先将 DOM 元素传递给 `ReactDOM.createRoot()` ，然后将 React 元素传递给 **`root.render()`：**

```react
const element = <h1>Hello, world</h1>;
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(element);
```



React elements 是不可变（immutable）元素，Once you create an element, you can’t change its children or attributes。

elements 就像电影中的单个帧( frame ) ：它代表某个时间点的 UI。

根据我们目前的知识，更新 UI 的唯一方法是创建一个新元素，并将其传递给 `root.render()`。

```react
// 考虑这个滴答作响的时钟示例：
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);    // here 
}

// setInterval: 每隔一定时间就调用函数，方法或对象。
// 可以使用本动作更新来自数据库的变量或更新时间显示。
setInterval(tick, 1000);
```

> It calls [`root.render()`](https://reactjs.org/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.

> 在实践中，大多数 React 应用程序只调用一次 `root.render()`。
>
> 在接下来的部分中，我们将学习如何将此类代码封装到 [stateful components](https://reactjs.org/docs/state-and-lifecycle.html). 中。

**React Only Updates What’s Necessary** :

React DOM 将元素(子元素) 与 前一个元素进行比较，并且仅更新必要的 DOM 以使 DOM 达到所需状态。

您可以通过使用浏览器工具检查最后一个示例来进行验证：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-24-083449.gif)

即使我们在每个 tick() 上创建一个描述整个 UI 树的元素，也只有内容发生变化的文本节点会被 React DOM 更新。







### Components and Props

Components (组件) 允许您将 UI 拆分为独立的、可重用的部分，并隔离地考虑每个部分。

The simplest way to define a component is to write a JavaScript function:

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这个函数是一个有效的 React 组件，因为它接受  “props”（properties, 属性）对象参数并返回一个 React 元素。我们称此类组件为“函数组件”，因为它们实际上是 JavaScript 函数。

您还可以使用 [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 类来定义组件：

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

从 React 的角度来看，上述两个组件是等价的。  ( The  two components are **equivalent** from React’s point of view. ) 





用户自定义的组件：

```react
const element = <Welcome name="Sara" />;
```

当 React 看到一个表示用户自定义组件的元素时，它会将 JSX 属性和子元素作为单个对象传递给该组件。 We call this object “**props**”.

```react
// For example, this code renders “Hello, Sara” on the page:

function Welcome(props) {   // 组件以大写开头
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;  // name 就是传递过去的 props 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
```

Let’s **recap**(回顾) what happens in this example:

1. We call `root.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates （高效地更新） the DOM to match  `<h1>Hello, Sara</h1>`.

**注意：组件名称始终以大写字母开头。** 

React 将以小写字母开头的组件视为 DOM 标签。例如，

- `<div />、 <img>` 代表 HTML div 标签，
- 但 `<Welcome />` 代表一个组件



### Composing （组成） Components

组件可以在其输出中引用其他组件。

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />      
      <Welcome name="Cahal" />      
      <Welcome name="Edite" />    
    </div>
  );
}
```



### Extracting Components

不要害怕将组件拆分成更小的组件。

例如，考虑这个 Comment （评论）组件：

（它接受 author（object）、text（string）和 date（date）作为 props ，描述社交媒体网站上的评论。

由于层层嵌套，这个组件可能很难更改，而且它的各个部分也很难重用。Let’s extract ！）

```react
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```



首先，我们将提取头像（extract `Avatar`） 

```react
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

//提取一个 UserInfo 组件
/*
 UserInfo 包含：
  1. Avatar
  2. user_name
*/
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

// 简化后的 Comment
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />    {/* Userinfo */}
      <div className="Comment-text">   
        {props.text}                      {/* text */}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}          {/* date */}
      </div>
    </div>
  );
}
```

提取组件一开始可能看起来很繁琐，Dont 逃避！

经验是，如果 UI 的一部分被多次使用（按钮、面板、头像），或者本身就足够复杂（应用程序、FeedStory、评论），it is a good candidate（候选） to be extracted to a separate component.



### Read-Only Props

```js
// pure function 纯函数：they do not attempt to change their inputs
function sum(a, b) {
  return a + b;
}

// impure function 不纯函数：it changes its own input
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 的原则：

- 所有 React 组件就其 props 而言必须像纯函数一样工作。
- 后面学的 `State` 将允许 React 组件随着时间的推移更改其输出以响应用户操作、网络响应和其他任何内容，而不会违反此规则。



# State and Lifecycle

>  React 把组件看成是一个状态机（State Machines）， 状态机可以理解为一个由 State 状态，Event 事件，Action 动作构成的一个状态转换图。

前面滴答时钟示例中，我们只学习调用 `root.render()` 来改变渲染输出：

```react
const root = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```



理论上说，每秒更新时间的 UI 应该是 Clock 的一个内部实现细节。

理想情况下，我们希望编写一次并让时钟自行更新：

**为了实现这一点，我们需要向 Clock 组件添加“状态”。**

**State 类似于 props，但它是私有的，完全由组件控制。**



### **Converting a Function to a Class 把 Func 变成类**

You can convert a **function** component like `Clock` to a **class** in five steps:

1. 创建一个同名 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes),  that extends `React.Component`.
2. 添加一个名为 render() 的空方法
3. 函数体移动到 render() 方法中。
4. 在 render() 主体中用 this.props 替换 props。
5. 删除 remaining 空函数声明。

```react
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock 现在被定义为一个类而不是一个函数。

每次更新发生时都会 call render 方法，但是只要我们将` <Clock />` 渲染到同一个 DOM 节点，就只会使用 Clock 类的 a single instance (单个实例)。这让我们可以使用

1. 本地状态 ( local state )
2. 生命周期方法 ( lifecycle methods )



### Adding Local State to a Class



```react
class Clock extends React.Component {
  constructor(props) {   // 添加一个分配初始 this.state 的类构造函数：  
    super(props);    
    this.state = {date: new Date()};  
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>     {/*替换 props.date. */}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<Clock date={new Date()} />);   <= 弃用
root.render(<Clock />);

// 或者这么写
ReactDOM.render( 
  <Clock />,
  document.getElementById('root')
);
```





### Adding Lifecycle Methods to a Class

释放组件在销毁时占用的资源非常重要。

* 我们希望在第一次将 Clock 渲染到 DOM 时设置一个计时器。这在 React 中称为 mounting “挂载”。
* 我们还希望在**删除** Clock 生成的 DOM 时清除该计时器。这在 React 中称为 unmounting “卸载”。
* ↑  These methods are called **“lifecycle methods”.**

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {                 //挂载
  }
  componentWillUnmount() {              //卸载
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```



`componentDidMount() `方法在组件输出被渲染到 DOM 之后运行。这是设置计时器的好地方：

```react
  componentDidMount() {
    this.timerID = setInterval(   // 定义了一个 timerID  props
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {  // 拆除计时器
    clearInterval(this.timerID);
  }
```



### 计时时钟代码

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {    
    this.setState({       // 管理对组件本地状态的更新：
      date: new Date()    
    });  
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Let’s quickly recap（回顾） what’s going on

1. 当 `<Clock />` 被传递给 `root.render()` 时，React 会调用 Clock 组件的构造函数 constructor。
2. React calls **Clock 组件的 render() 方法。**( React 学习应该在屏幕上显示什么 )
3. 当 Clock 的输出插入 DOM 时，React 调用 **componentDidMount()** 生命周期方法。在其中，Clock 组件要求浏览器设置一个计时器，以每秒调用一次组件的 ` tick()`方法。

4. 浏览器每秒调用一次 tick() 方法。在其中，Clock 组件通过调用包含当前时间的对象的 `setState()` 来安排 UI 更新。
5. Thanks to the `setState()` call, React knows **the state has changed**, and calls the `render()` method again to learn what should be on the screen. 
6. 这一次，render() 方法中的 this.state.date 会有所不同，因此渲染输出将包括更新的时间。 React 会相应地更新 DOM。
7. 如果 Clock 组件曾经从 DOM 中移除，React 会调用 componentWillUnmount() 生命周期方法来停止计时器。









### Using State Correctly

There are three things you should know about `setState()`.

**1.Do Not Modify State Directly**

```react
// Wrong, this will not re-render a component:
// 唯一可以分配 this.state 的地方是构造函数。
this.state.comment = 'Hello';
```

**Instead, use `setState()`:**

```react
// Correct
this.setState( {comment: 'Hello'} );
```



**2.状态更新可能是异步的** (Asynchronous)

React 可以将多个 `setState()` 调用批处理到单个更新中以提高性能。

因为 `this.props` 和 `this.state` 可能是异步更新的，所以你不应该依赖它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```react
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```



要修复它，请使用第二种形式的` setState()`，它接受一个函数而不是一个对象。

该函数将接收先前的状态作为第一个参数，并将应用更新时的道具作为第二个参数：

```react
// 箭头函数版本 (Correct)
// state, props 是先前的状态。
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));


// 常规函数版本 (Correct)
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

更多: 关于[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)



### 合并 State Updates

When you call `setState()`, React **merges** **the object you provide into the current state.**

For example,  your state may contain several independent variables:

```react
  constructor(props) {
    super(props);
    this.state = {
      posts: [],      
      comments: []    
    };
  }


// 可以使用单独的 setState() 调用独立更新它们：
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```



- 除了 **虚拟DOM** 外，减少更新频率的另一个手段就是 React 的批量更新。
- 顾名思义，批量处理就是，可以避免短期内的多次渲染，攒为一次更新，即 setState 不会立刻改变 React 组件中 state 的值，而是将需要更新的 state 合并后放入状态队列等待被批量提交。
- 所以多个相邻的 state 的修改可能会合并到一起一次执行。





### Data Flows Down 数据向下流动

组件可以选择将其 state 作为 props 传递给其子组件（ child components ）：

```React
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

  ...
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />   //  在这里调用
      </div>
    );
```

如上，`FormattedDate` 组件将在其 `props` 中接收日期，并且不关心它是来自 Clock 的 state、Clock 的 props 还是手动输入的：这通常称为“自上而下”或“单向”（top-down  or unidirectional ）数据流。





# Handling Events 事件处理

使用 React 元素处理事件与处理 DOM 元素上的事件非常相似。只是：

1. React 事件使用 camelCase 命名，而不是 html 的 小写。

2. 使用 JSX，我们将函数作为事件处理程序传递，而不是 string 。

```react
// Html:
<button onclick="activateLasers()">  // 传递 string， onclick 小写
  Activate Lasers
</button>

//React
<button onClick={activateLasers}>    // 传递函数， onClick 驼峰命名
  Activate Lasers
</button>
```



另一个区别是你不能返回 **false** 来阻止 React 中的默认行为。

必须显式调用 `preventDefault`。例如，对于纯 HTML，为了防止提交的默认表单行为，您可以编写：

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

In React, this could instead be:

```react
function Form() {
  function handleSubmit(e) {
    e.preventDefault();    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

这里，e 是一个合成事件。 React 根据 W3C 规范定义了这些合成事件，因此您无需担心跨浏览器的兼容性。 

React 事件与原生事件的工作方式并不完全相同。请参阅  [`SyntheticEvent`](https://reactjs.org/docs/events.html)  以了解更多信息。

使用 React 时，创建 DOM 元素后，通常不需要调用 `addEventListener` 来为 DOM 元素添加监听器。相反，只需在最初呈现元素时提供一个侦听器。



当使用 ES6 类定义组件时，一个常见的模式是事件处理程序 (event handler) 是该类的方法。

例如下面这个 Toggle 组件呈现一个按钮，让用户在 “ON” 和 “OFF” 状态之间切换：

```React
class Toggle extends React.Component {
  constructor(props) {  // 构造函数
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback ：
    // 这个绑定是使 `this` 在回调中工作所必需的
    // 不绑定this 那么你函数里调用this的话他指的是这个DOM元素
    this.handleClick = this.handleClick.bind(this);  
  }

  handleClick() {      // handle events 事件处理
    this.setState(prevState => ({      
      isToggleOn: !prevState.isToggleOn    
    }));  
  }
  render() {
    return (
      <button onClick={this.handleClick}>        
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-24-132814.png)



You have to be careful about the meaning of `this` in JSX callbacks. （ JSX 回调中 this 的含义）

在 JavaScript 中，默认情况下不绑定类方法。如果您忘记绑定` this.handleClick` 并将其传递给 onClick，则在实际调用该函数时 this 将是未定义的。

这不是 React 特有的行为；它是 JavaScript 中函数工作方式的一部分。

一般来说，如果引用的方法后面不带 `()` ， 比如 `onClick={this.handleClick}`，就应该绑定那个方法。
如果调用 bind 惹恼了你，有两种方法可以解决这个问题。如果您使用的是实验性的公共类字段语法，您可以使用类字段来正确绑定回调：

```react
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.  
  // 此语法确保 `this` 绑定在 handleClick 中
  // Warning: this is *experimental* syntax.   警告：这是实验语法
  handleClick = () => {    
    console.log('this is:', this);  
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
```



**react 事件处理为什么推崇显式调用 `bind(this) ` ?**

>  如果你的点击事件触发的方法里需要引用 this 。就需要绑定啊。不然你的 this 是 null（记得如果没绑定 this 应该是全局 window 。但这里 this 就是 null .
>
> 所以 你要么在创建的时候绑定：

```js
<div className="save" onClick={this.handleClick.bind(this)}> Save </div>
```

要么在一开始构造器里声明绑定

```text
constructor(props){
  super(props);
  this.handleClick=this.handleClick.bind(this)
```

还有一种是利用闭包把[作用域](https://www.zhihu.com/search?q=作用域&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A"144757646"})包起来

```js
<div className="save" onClick={()=>this.handleClick}>Save</div>
```

 如果用1、3会在每次render时创建一个新的方法，所以一般用2 ，显示调用bind()只是为了保证this值。



### Passing Arguments to Event Handlers

在循环中，通常希望将额外的参数传递给事件处理程序。

例如，如果 id 是行 ID，则以下任一方法都可以：

```react
<button onClick={ (e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={ this.deleteRow.bind(this, id)}>Delete Row</button>
```

The above two lines are equivalent, and use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) respectively (分别地).

表示 React 事件的 e 参数将作为 ID 之后的第二个参数传递。使用箭头函数，我们必须显式传递它，但使用 bind 任何进一步的参数都会自动转发。





# Conditional Rendering

有条件地 Render，如果没登录就 Render GuestGreeting。

```React
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {    
    return <UserGreeting />;  
  } 
  return <GuestGreeting />;
}
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,  
  document.getElementById('root')
);
```



在下面的示例中，我们将创建一个名为 LoginControl 的有状态组件。

它将根据当前状态呈现  `<Login.. /> ` 或  `<Logout.. />` 。它还将呈现上一个示例中的 `<Greeting />`：

```react
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {      
      button = <LogoutButton onClick={this.handleLogoutClick} />;    
    } else {      
      button = <LoginButton onClick={this.handleLoginClick} />;    
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />        
        {button}      
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```





### 对 react this 的理解

 https://github.com/xingbofeng/xingbofeng.github.io/issues/4







虽然声明变量并使用 if 语句是有条件地呈现组件的好方法，但有时您可能希望使用更短的语法。在 JSX 中有几种内联条件的方法

```react
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&           // Attention
        <h2> You have {unreadMessages.length} unread messages.  </h2>      
      }    
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

It works because  : 

* `true && expression`  always evaluates to `expression`, 

* `false && expression` always evaluates to `false`.
* &&: 假值短路返假值
*  ||: 真值短路返真值 

因此，如果 condition expression 为真，则 && 之后的元素将出现在输出中。如果为 false，React 将忽略并跳过它。

请注意，返回虚假表达式仍会导致 && 之后的元素被跳过，但会返回虚假表达式。在下面的示例中，渲染方法将返回 `<div>0</div>`。

```react
render() {
  const count = 0;  
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}    
    </div>
  );
}

// count == 0 故返回 count , 假值短路返假值
```



**Inline If-Else with Conditional Operator**

在下面的示例中，我们使用它来有条件地渲染一小块文本。

```react
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b> {
        isLoggedIn ? 'currently' : 'not'  // Attention
      }</b> logged in.    
    </div>
  );
}
```

larger expressions: 

```react
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn        
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />      
      }
    </div>  
  );
}
```

当条件变得过于复杂时，可能是提取组件的好时机。





### 防止组件渲染

在极少数情况下，您可能希望组件隐藏自己，即使它是由另一个组件呈现的。

为此，返回 null  而不是在 render 里输出。

在下面的示例中，`<WarningBanner /> `的呈现取决于名为 `warn` 的 `prop` 的值。如果 `prop` 的值为 `false`，则组件不会渲染：

```react
function WarningBanner(props) {
  if (!props.warn) {    
    return null;   
  }
  return (
    <div className="warning">  Warning!  </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />        
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

从组件的 render 方法返回 null 不会影响组件生命周期方法的触发。例如 `componentDidUpdate` 仍然会被调用。



# Lists and Keys

```react
// In JS：
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);   // [2, 4, 6, 8, 10]
```



**渲染多个组件**

下面使用 JS 的 map() 函数遍历 numbers 数组。我们为每个项目返回一个 `<li> ` 元素。最后，我们将生成的元素数组分配给 `listItems`： 然后，我们可以将整个 listItems 数组包含在 `<ul>` 元素中：

```react
<ul> {listItems} </ul>
```

> - ul:  Unordered List（无序列表）
>
> - li : lists 列表项目
>
> li 不能单独使用，必须在于 ul 之中。



```react
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map( (number) => <li> {number}</li> );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```

运行此代码时，您将收到一条警告，提示您应为 list items 提供 key。

A “key” is a special string attribute you need to include when creating lists of elements.



让我们为 numbers.map() 中的列表项分配一个 key 来修复：

```react
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}> {number} </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```



## Keys

keys 帮助 React 识别哪些 items 已更改、添加或删除。

所以应为数组内的元素提供键，以使元素具有稳定的标识（stable identity）



```react
// 选择键的最佳方法是使用一个唯一标识， 比如 id：
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

// 当你没有 rendered item 的稳定 ID 时，你可以使用 item index 作为键作为最后的手段(as a last resort)
const todoItems = todos.map((todo, index) =>
  // 仅当项目没有稳定 ID 时才这样做
  <li key={index}>
    {todo.text}
  </li>
);
```



如果项目的顺序可能发生变化，我们不建议对键使用索引。这会对性能产生负面影响，并可能导致组件状态出现问题。Check out Robin Pokorny’s article for an [in-depth explanation on the negative impacts of using an index as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318).

如果您选择不为列表项分配显式键，那么 React 将默认使用索引作为键。(If you choose not to assign an explicit key to list items , then React will default to using indexes as keys.)



Key 的重要性：

> 1.在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染；
>
> 2.此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。





## Extracting Components with Keys

键仅在周围数组的上下文中才有意义。
例如，如果您提取 `ListItem` 组件，则应将键保留在数组中的` <ListItem /> `元素上，而不是 ListItem 本身的 `<li>` 元素上。

```react
function ListItem(props) {
   // There is no need to specify the key here:  
   return <li> {props.value} </li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    //  Key should be specified inside the array.    
    <ListItem key={number.toString()} value={number} />  
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```



当我们生成两个不同的数组时，我们可以使用相同的键：

```react
function Blog(props) {
  const sidebar = (    
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}> {post.title} </li>  {/* {post.id} */}
      )}
    </ul>
  );
  const content = props.posts.map((post) =>    
    <div key={post.id}>                        {/* {post.id} */}
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}      
         <hr />
      {content}   
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```





## **Key 如何设置？**

- 一般来说，我们会将 `key` 的值设置为数据的「id」。例如 `<li key={todo.id}> {todo.content} </li>` 。
- 如果没有 id 的话，我们可以为数据模型**添加新的id属性**，或者对部分内容进行 hash 处理，以生成每一项的key。
  PS: `key` 仅在它的邻项之间要求唯一，并不具有全局性哦！
- 再不济，我们可以用**索引index**来作为key值，但是这个方法在一些情况下容易出Bug！例如说在需要重新排序时。







## Embedding map() in JSX

JSX 允许在花括号中 Embedding 任何表达式，因此我们可以 **inline the `map()`** result:

```react
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```









# Forms

HTML 表单元素的工作方式与 React 中的其他 DOM 元素有点不同，因为表单元素自然会保留一些内部状态。

例如，这个纯 HTML 格式的表单接受一个名称：

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，此表单具有浏览到新页面的默认 HTML 表单行为。

但在大多数情况下，拥有一个处理表单提交并访问用户输入表单数据的 JavaScript 函数会很方便。实现这一目标的标准方法是使用一种称为“受控组件”**(controlled components**)的技术。



## controlled components

在 HTML 中，`<input>、<textarea> `和 `<select>` 等表单元素通常会维护自己的状态并根据用户输入对其进行更新。在 React 中，可变状态通常保存在**组件的 state** 属性中，并且只能使用 `setState() `进行更新。

而呈现表单的React组件也控制着在后续用户输入时该表单中发生的情况，以这种**由React控制的输入表单元素而改变其值**的方式，称为**受控组件**。

比如，给表单元素input绑定一个onChange事件，当input状态发生变化时就会触发onChange事件，从而更新组件的state。



例如，如果我们想让前面的示例在提交 submit 时记录名称，我们可以将表单编写为受控组件：

```react
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>        
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

由于在我们的表单元素上设置了 value 属性 `value={this.state.value}`，因此显示的值将始终是 `this.state.value`，从而使 React 状态成为事实的来源(source of truth)。

由于 `handleChange` 在每次击键时都会运行以更新 React 状态，因此显示的值将随着用户键入而更新。

使用受控组件，输入的值始终由 React 状态驱动。虽然这意味着您必须键入更多代码，但您现在也可以将值传递给其他 UI 元素，或从其他事件处理程序中重置它。





## The textarea Tag



```react
// html :
<textarea>
  Hello there, this is some text in a text area
</textarea>

// 在 React 中， <textarea> 使用 value 属性代替。
// so , 使用 <textarea> 的表单可以与使用单行输入的表单非常相似：

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});  // Attention
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />   {/* Attention */}
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

请注意` this.state.value `在构造函数中被初始化为 ： “Please write an essay ......'”







## select Tag

在 HTML 中，`<select> `创建一个下拉列表。

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>    <!-- selected 标识默认选中 -->
  <option value="mango">Mango</option>
</select>
```

> html 中 selected 表示默认选中。

React 不使用这个 selected 属性，而是在 root select tag 上使用 value attribution。这在受控组件（controlled component）中更方便，因为您只需要在一个地方更新它。

```react
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};   // 默认选中
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>            
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```



总的来说，这使得 `<input type="text">`、`<textarea>` 和 `<select>` 的工作方式非常相似——它们都接受一个`value` attribute，您可以使用该属性来实现受控组件。



**Note**:

You can pass an array into the `value` attribute, allowing you to select multiple options in a `select` tag:

```react
<select multiple={true} value={['B', 'C']}>
```







## Handling Multiple Inputs

**The file input Tag** 上传文件

在 HTML 中，`<input type="file">` 允许用户从本地选择多个文件以上传到服务器 ， 或由 JavaScript 通过 File API 操作。

```html
<input type="file" />
```

因为它的 values 是只读的，所以它在 React 中是一个不受控制的组件 （**uncontrolled** component ）。稍后将在文档中与其他不受控制的组件一起讨论它。



当需要处理多个受控输入元素时，可以给每个元素添加一个name属性，让handler函数根据 `event.target.name `的值来选择要做什么。

```react
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;   // Attention
    this.setState({
      [name]: value    });      // Attention ： ES6 computed property name syntax
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"           // Attention
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"             // Attention
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```



Notice the ES6 [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) syntax to update the state key：

```js
this.setState(
  {[name]: value}
);
```

It is equivalent to this ES5 code:

```js
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```





## 受控输入空值

输入最初被锁定，但在短暂延迟后变为可编辑。

比如用在 10s 阅读协议之后才能跳过。

```react
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function() {
  ReactDOM.createRoot(mountNode).render(<input value={null} />);
}, 1000);
```





## 受控组件的替代品（Alternatives）-

使用受控组件有时会很乏味（tedious），因为您需要为数据可以更改的每一种方式编写一个事件处理程序，并通过 React 组件管道所有输入状态。

当您将预先存在的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能会变得特别烦人。在这些情况下，您可能需要检查不受控制的组件，这是实现输入表单的一种替代技术。

如果您正在寻找一个完整的解决方案，包括验证、跟踪访问的字段和处理表单提交，[Formik](https://jaredpalmer.com/formik) 是最受欢迎的选择之一。但是，它建立在受控组件和管理状态的相同原则之上——所以不要忽视学习它们。





# 组件通信

子传父 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-19-064612.png" width="70%;" />

如图: 

1. 在父组件中定义 m() 函数
2. 子组件接收 m() 函数作为参数 , 子组件调用它
3. 在父组件层面观察 , m() 被调用了

```react
// App.js ( 父组件 )
   const saveLogHandler = (newLog) => {
        // 将新的数据添加到数组中
        setLogsData([newLog, ...logsData]);
    };

    return( 
      <div className="app">
        {/*引入LogsFrom*/}
        <LogsForm onSaveLog={saveLogHandler}/>   </div> 
     );


// LogsForm.js ( 子组件 )
  const LogsForm = (props) => {
    ....
    // 当表单提交时，汇总表单中的数据
    const formSubmitHandler = (e) => {
      e.preventDefault();   // 取消表单的默认行为 (提交后刷新)
      // 获取表单项中的数据日期、内容、时长, 将数据拼装为一个对象
      const newLog = {
          date: new Date(inputDate),
          desc: inputDesc,
          time: +inputTime
      };
      // 当要添加新的日志时，调用父组件传递过来的函数
      props.onSaveLog(newLog);
    };
  }
```



子传父 - 删除

```react
// App.js
    // 定义一个函数，从数据中删除一条日志
    const delLogByIndex = (index) => {
        setLogsData(prevState => {
            prevState.filter( (item) => item.id !== index)
        });
    };
    ...
    <Logs logsData={logsData} onDelLog={delLogByIndex}/>

// LogItem.js ( 没看懂 index 怎么传过来的 ? )
    // 删除item的响应函数
    const deleteItemHandler = () => {
      props.onDelLog();
    }
    
    {/* 添加一个删除按钮*/}
    <div>
       <div onClick={deleteItemHandler} className='delete'>×</div>
    </div>
```







# Lifting State Up 提升状态

通常，多个组件需要反映相同的变化数据。我们建议将共享状态提升到最接近的共同祖先（closest common ancestor）

在本节中，我们将创建一个温度计算器来计算水是否会在给定温度下沸腾。

首先，创建 `BoilingVerdict` (煮沸判决) 组件，它接受温度作为 props，print 是否足以烧开水：

```react
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;  
  }
  return <p>The water would not boil.</p>;}
```



接下来，我们将创建一个名为 Calculator 的组件。

1. 它呈现一个 `<input>` 让人输入温度，并将其值保存在 this.state.temperature 中。

2. it renders the `BoilingVerdict` for the current input value.

```react
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />  // BoilingVerdict 根据参数决定 render 语句 
      </fieldset>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
```

> `<fieldset>` 是个不常用的 html标签，它会在相关表单元素**周围绘制边框**



代码地址：[**Try it on CodePen**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-25-084409.png)

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-25-084430.png)

> `<fieldset>` 是个不常用的 html标签，它会在相关表单元素**周围绘制边框**



## Adding a Second Input

新要求是，除了摄氏输入，我们还提供华氏输入，并且它们保持同步。

我们可以从 Calculator 中提取一个 **TemperatureInput** 组件开始。我们将为其添加一个新的 scale 属性，它可以是 “c” 或 “f” ：

```react
const scaleNames = {  
  c: 'Celsius',  
  f: 'Fahrenheit'
};
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;    return (
      <fieldset>
        <legend> Enter temperature in {scaleNames[scale]}:</legend>        
        <input value={temperature} 
            onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

我们现在可以更改计算器以呈现两个单独的温度输入

```react
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />        
        <TemperatureInput scale="f" />      
      </div>
    );
  }
}
```

我们现在有两个输入，但是当您在其中一个输入温度时，另一个**不会更新**。这与我们的要求相矛盾：我们希望它们保持同步。

我们也无法从计算器显示 BoilingVerdict。计算器不知道当前温度，因为它隐藏在 TemperatureInput 中。



首先，我们将编写两个函数来将摄氏度转换为华氏度并返回：

```react
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;  // 保留 3 位小数
  return rounded.toString();
}
```

For example, 

* `tryConvert('abc', toCelsius)` returns an empty string,
*  `tryConvert('10.22', toFahrenheit)` returns `'50.396'`.



我们希望这两个输入彼此同步。当我们更新摄氏输入时，华氏输入应该反映转换后的温度，反之亦然。

在 React 中，共享状态是通过将其向上移动到需要它的组件的最近共同祖先来完成的。这被称为“提升状态”。我们将从 TemperatureInput 中删除本地状态并将其移至 Calculator 中。

如果计算器拥有共享状态，它将成为两个输入中当前温度的“真实来源”。它可以指示它们都具有彼此一致的值。由于两个 TemperatureInput 组件的 props 都来自同一个父 Calculator 组件，因此两个输入将始终保持同步。

让我们一步一步地看看它是如何工作的。

首先，我们将在 TemperatureInput 组件中将 this.**state**.temperature 替换为 this.**props**.temperature。现在，让我们假设 `this.props.temperature` 已经存在，尽管我们将来需要从 Calculator 中传递它：

```react
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;    // ...
```

我们知道 props 是只读的。当温度处于 local state 时，TemperatureInput 可以调用 `this.setState()` 来改变它。但是，现在温度 as props 来自父级，TemperatureInput 就无法控制它了。

在 React 中，这通常通过使组件“受控”(controlled)来解决。就像 DOM `<input>` 接受一个值和一个 onChange 属性一样，自定义的 TemperatureInput 也可以接受来自其父 Calculator 的温度和 onTemperatureChange 属性。

现在，当 TemperatureInput 想要更新它的温度时，它会调用 this.props.onTemperatureChange：

```react
 handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

> 自定义组件中的  temperature 或 onTemperatureChange 属性名称没有特殊含义。我们可以将它们命名为其他任何名称，例如将它们命名为 value 和 onChange，这是一种常见的约定。



onTemperatureChange 属性将由父 Calculator 组件与温度属性一起提供。它将通过修改自己的本地状态来处理更改，从而使用新值重新渲染两个输入。我们很快就会看到新的 Calculator 实现。

在深入了解 Calculator 中的更改之前，让我们回顾一下对 TemperatureInput 组件的更改。我们已经从中删除了本地状态，而不是读取 this.state.temperature，我们现在读取 this.props.temperature。当我们想要进行更改时，我们现在调用 this.props.onTemperatureChange()，而不是调用 this.setState()，它将由计算器提供

```react
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

现在让我们转向计算器组件。

我们将当前输入的温度和比例存储在其本地状态中。这是我们从输入中“提升”的状态，它将作为它们两者的“真相来源”。它是我们为了呈现两个输入而需要知道的所有数据的最小表示。

例如，如果我们在 Celsius input 中输入 37，那么 Calculator 组件的状态将是：

```
{
  temperature: '37',
  scale: 'c'
}
```

如果我们稍后将 Fahrenheit 字段编辑为 212，则计算器的状态将是

```
{
  temperature: '212',
  scale: 'f'
}
```



```react
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {  return (fahrenheit - 32) * 5 / 9;  }
function toFahrenheit(celsius) {  return (celsius * 9 / 5) + 32;     }

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// 温度输入组件
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

// 计算模块
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

```

现在，无论您编辑哪个输入，计算器中的 this.state.temperature 和 this.state.scale 都会更新。其中一个输入按原样获取值，因此保留任何用户输入，并且始终根据它重新计算另一个输入值。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-25-091629.png)









# 组合、继承



## 特殊实例

比如 `WelcomeDialog` 可以说是 `Dialog` 的特殊实例。

```react
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}      </h1>
      <p className="Dialog-message">
        {props.message}      </p>
    </FancyBorder>
  );
}

// Dialog 是 WelcomeDialog 调用的子组件
function WelcomeDialog() {
  return (
    <Dialog      
      title="Welcome"      
      message="Thank you for visiting our spacecraft!" />  
  );
}
```



## React 设计哲学 Philosophy



最好将渲染 UI 和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。



# 错误 Debug

当你在 UI 中发现错误时，可以使用 [React 开发者工具](https://github.com/facebook/react/tree/main/packages/react-devtools) 来检查问题组件的 props，并且按照组件树结构逐级向上搜寻，直到定位到负责更新 state 的那个组件。这使得你能够追踪到产生 bug 的源头：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-25-105617.gif)



-----



# FAQ

## state props 的区别 ：

state 和 props 主要的区别在于 **props** 是不可变的，而 state 可以根据与用户交互来改变。这就是为什么有些容器组件需要定义 state 来更新和修改数据。 而子组件只能通过 props 来传递数据。

```react
<script type="text/babel">
function HelloMessage(props) {                // 子组件 props
	return <h1>Hello {props.name}!</h1>;
}

const element = <HelloMessage name="Runoob"/>;   // Define name

ReactDOM.render(
	element,
	document.getElementById('example')
);
</script>
```



组合使用 state 和 props ： 

>  可以在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上

```react
<script type="text/babel">

class WebSite extends React.Component {
  constructor() {
      super();
      this.state = {
        name: "菜鸟教s程",
        site: "http://www.runoob.com"
      }
    }
  render() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />      {/* 可变的 state */}
      </div>
    );
  }
}

class Name extends React.Component {
  render() {
    return (
      <h1>{this.props.name}</h1>             //  接受父组件的 props
    );
  }
}
 
class Link extends React.Component {
  render() {
    return (                                 //  接受父组件的 props
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
}
 
ReactDOM.render(
  <WebSite />,
  document.getElementById('example')
);
</script>
```



## .js Vs .jsx

没有太大区别 .

因为 JSX 不是标准的 Javascript 扩展。 Application 的入口点最好以 .js 命名，其余组件可以使用 .jsx。

我之所以使用 `.jsx`  作为所有组件的文件名，有一个重要原因。实际上，在一个包含大量代码的大型项目中，如果我们将所有 React 的组件都设置为 ` .jsx` 扩展名，那么在跨项目导航到不同的 `javascript` 文件 ( like helpers, middleware, etc.) 时会更容易，你知道这是一个 React 组件，而不是其他类型的 javascript 文件。



## react 绑定 this 的几种方式



React可以使用 React.createClass、ES6 classes、纯函数 3 种方式构建组件。

* 使用 React.createClass 会自动绑定每个方法的this到当前组件。但是需要注意随着 React 16版本的发布官方已经将改方法从React中移除。
* 但使用ES6 classes或纯函数时，为了在回调中使用 `this`，这个绑定是必不可少的，但是需要靠手动绑定this了。接下来介绍React中三种绑定this的方法

1、在构造函数内使用 bind

为了避免在 render 中绑定 this 引发可能的性能问题，我们可以在构造器 constructor 中预先进行绑定。这种方法很明显在可读性和维护性上没有第 2 种和第 3 种有优势。

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
       this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
       }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
         方法1 {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button> 
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

2、render方法中直接使用  `bind()`

这种方法很简单，可能是大多数初学开发者在遇到问题后采用的一种方式。然后由于组件每次执行render将会重新分配函数这将会影响性能。特别是在你做了一些性能优化之后，它会破坏 Pure Component 性能。不推荐使用

```react
  render() {
    return (
     <button onClick={this.handleClick.bind(this)}>
         方法2{this.state.isToggleOn ? 'ON' : 'OFF'}
     </button> 
    );
  }
```



3、render方法中使用箭头函数（）=>{}

这种方法使用了ES6的上下文绑定来让this指向当前组件，但是它同`render方法中直接使用bind()`存在着相同的性能问题，不推荐使用

```react
  render() {
    return (
     <button onClick={( ) => {this.handleClick()}}>
         方法3{this.state.isToggleOn ? 'ON' : 'OFF'}3
        </button>
    );
```



4、在定义阶段使用箭头函数绑定

要使用这个功能，需要在`.babelrc`种开启`stage-2`功能，绑定方法如下：

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
       }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>test</div>
    )
  }
}
```

总结：
如果你使用ES6和React 16以上的版本，最佳实践是使用`在定义阶段使用箭头函数`来绑定this







# 30 days of React

## 1. Props



### Array props type

```react
const User = (props) => {    // 组件以大写开头
  return (
    <div>
      <h1>
        {props.firstName}
        {props.lastName}
      </h1>
      <small>{props.country}</small>
    </div>
  )
}
// 调用或实例化一个组件，组件 props 要接受 3 个 props ： firstName、lastName、count
<User firstName = 'Asabeneh', lastName='Yetayeh' country = 'Finland' />


// Array props type
import React from 'react'
import ReactDOM from 'react-dom'

// Skills Component
const Skills = (props) => {
  // modifying the skills array
  const skillList = props.skills.map((skill) => <li>{skill}</li>)
  return <ul>{skillList}</ul>
}

const App = () => (
  <div className='app'>
    <Skills skills={['HTML', 'CSS', 'JavaScript']} />
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```





### Object props type

```react
import React from 'react'
import ReactDOM from 'react-dom'

const showDate = (time) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[time.getMonth()].slice(0, 3)
  const year = time.getFullYear()
  const date = time.getDate()
  return ` ${month} ${date}, ${year}`
}
// Header Component， 传进来一个 object
// props.data 就表示： 这个 data object 。
const Header = (props) => {
  return (
    <header>
      <div className='header-wrapper'>
        <h1>{props.data.welcome}</h1>
        <h2>{props.data.title}</h2>
        <h3>{props.data.subtitle}</h3>
        <p>
          {props.data.author.firstName} {props.data.author.lastName}
        </p>
        <small>{showDate(props.data.date)}</small>
      </div>
    </header>
  )
}

// The App, or the parent or the container component
// Functional Component
const App = () => {
  const data = {
    welcome: 'Welcome to 30 Days Of React',
    title: 'Getting Started React',
    subtitle: 'JavaScript Library',
    author: {
      firstName: 'Asabeneh',
      lastName: 'Yetayeh',
    },
    date: new Date(),  // 获取当前时间
                       // date needs to be formatted to a human readable format
  }

  return (
    <div className='app'>
      <Header data={data} />   {/* 传过去一个 object */}
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)


```





### Function prop types

```react
import React from 'react'
import ReactDOM from 'react-dom'

// A button component
// button 标签的 onClick 需要接受一个函数参数。告诉他做什么 
const Button = (props) => <button onClick={props.oncli}>{props.text}</button>

// The App, or the parent or the container component
// Functional Component
const App = () => {
  const greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge, 2020')
  }

  return (  //  oncli 需要传递一个函数。 下面给出 2 种函数的定义方式
    <div className='app'>
      <Button text='Greet People' oncli={greetPeople} />
      <Button text='Show Time' oncli={() => alert(new Date())} />
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

>`const Button = (props) => <button onClick={props.onClick}>{props.text}</button>`
>
>对比 ` { props.onClick }` 与 `{ props.onClick() }`
>
>注意不能写成 onClick={props.onClick() } 否则 props.onClick 方法会在 Button 组件渲染时被直接触发而不是等到 Button 组件渲染完成时通过点击触发，又因为此时 Button 组件正在渲染中（即 Button 组件的 render() 方法正在调用），又触发 handleClick(i) 方法调用 setState() 会再次调用 render() 方法导致死循环。（如果有的话）

HTML 有 onclick、onmouseover、onhover、onkeypress 等 events handlers。

在 React 中，这些 events handlers 是驼峰命名的。例如 onClick、onMouseOver、onKeyPress 等。我们将在其他部分详细介绍 React 中的事件。



再来看一个将函数作为 props 处理的例子：

```react
import React from 'react'
import ReactDOM from 'react-dom'

// Function to display time in Mon date, year format eg Oct 4, 2020
const showDate = (time) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[time.getMonth()].slice(0, 3)
  const year = time.getFullYear()
  const date = time.getDate()
  return ` ${month} ${date}, ${year}`
}

// A button component

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

// The App, or the parent or the container component
// Functional Component
const App = () => {
  const handleTime = () => {
    alert(showDate(new Date()))
  }
  const greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge, 2020')
  }
  return (
    // 传递 function
    <div className='app'>
      <Button text='show time' onClick={handleTime} />
      <Button text='Greet People' onClick={greetPeople} />
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```







### Destructuring(解构) props

```react
// 1 .Step by step destructuring

const Header = (props) => {
  // (props.data  是一个被传递过来的 object )
  // 解包 Destructuring `props.data`
  const data = props.data
  const { welcome, title, subtitle, author, date } = data
  const { firstName, lastName } = author
  return (
    <header>
      <div className='header-wrapper'>
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p> {firstName} {lastName}  </p>
        <small>{showDate(date)}</small>
      </div>
    </header>
  )
}

// The App, or the parent or the container component
// Functional Component
const App = () => {
  const data = {
    welcome: 'Welcome to 30 Days Of React',
    title: 'Getting Started React',
    subtitle: 'JavaScript Library',
    author: {
      firstName: 'Asabeneh',
      lastName: 'Yetayeh',
    },
    date: new Date(),
  }

  return (
    <div className='app'>
      <Header data={data} />
    </div>
  )
}
const rootElement = document.getElementById('root')
// we render the JSX element using the ReactDOM package
ReactDOM.render(<App />, rootElement)




// 2. Destructuring in one line
// 一行解包
...
const Header = (props) => {
  const data = props.data
  const {
    welcome,
    title,
    subtitle,
    author: { firstName, lastName },
    date,
  } = data
...



// 3. Destructuring the props inside the parenthesis
// > 小括号() 需要参数，() 里包含着 花括号 {} 
// 所以如果看到某个组件传入的参数是 ({xxx,xxxx}) 大概率是在解包。
const Header = ({
  data: {
    welcome,
    title,
    subtitle,
    author: { firstName, lastName },
    date,
  },
}) => {
  return (
    <header>
      <div className='header-wrapper'>
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
```



再看一个整体的例子：

```react
import React from 'react'
import ReactDOM from 'react-dom'
import asabenehImage from './images/asabeneh.jpg'

// Fuction to show month date year
const showDate = (time) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[time.getMonth()].slice(0, 3)
  const year = time.getFullYear()
  const date = time.getDate()
  return ` ${month} ${date}, ${year}`
}

// Header Component
// 这里的需要的参数一个待解包的 object :  data
// 感觉这里写接受 props ， 里面写 props.data.welcome 也可以。
const Header = ({
  data: {
    welcome,
    title,
    subtitle,
    author: { firstName, lastName },
    date,
  },
}) => {
  return (
    <header>
      <div className='header-wrapper'>
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
          {firstName} {lastName}
        </p>
        <small>{showDate(date)}</small>
      </div>
    </header>
  )
}

// TechList Component
// const techs = ['HTML', 'CSS', 'JavaScript']
//  { techs } 表示对传进来的进行解包， 说实话没太看懂。
const TechList = ({ techs }) => {
  const techList = techs.map((tech) => <li key={tech}>{tech}</li>)
  return techList
}

// User Card Component
// 解包
const UserCard = ({ user: { firstName, lastName, image } }) => (
  <div className='user-card'>
    <img src={image} alt={firstName} />
    <h2>
      {firstName}
      {lastName}
    </h2>
  </div>
)

// A button component

const Button = ({ text, onClick, style }) => (
  <button style={style} onClick={onClick}>
    {text}
  </button>
)

// CSS styles in JavaScript Object
const buttonStyles = {
  backgroundColor: '#61dbfb',
  padding: 10,
  border: 'none',
  borderRadius: 5,
  margin: 3,
  cursor: 'pointer',
  fontSize: 18,
  color: 'white',
}

// Main Component
const Main = ({ user, techs, greetPeople, handleTime }) => (
  <main>
    <div className='main-wrapper'>
      <p>Prerequisite to get started react.js:</p>
      <ul>
        <TechList techs={techs} />
      </ul>
      <UserCard user={user} />
      <Button text='Greet People' onClick={greetPeople} style={buttonStyles} />
      <Button text='Show Time' onClick={handleTime} style={buttonStyles} />
    </div>
  </main>
)

// Footer Component
const Footer = ({ copyRight }) => (
  <footer>
    <div className='footer-wrapper'>
      <p>Copyright {copyRight.getFullYear()}</p>
    </div>
  </footer>
)

// The App, or the parent or the container component
// Functional Component
const App = () => {
  const data = {
    welcome: 'Welcome to 30 Days Of React',
    title: 'Getting Started React',
    subtitle: 'JavaScript Library',
    author: {
      firstName: 'Asabeneh',
      lastName: 'Yetayeh',
    },
    date: new Date(), // date needs to be formatted to a human readable format
  }
  const date = new Date()
  const techs = ['HTML', 'CSS', 'JavaScript']
  // copying the author from data object to user variable using spread operator
  // 使用扩展运算符将作者从 data object 复制到 user 变量
  // > ... 是 es6 中出现的扩展运算符。
  // > 作用是遍历当前使用的对象能够访问到的所有属性，并将属性放入当前对象中
  // > 这里就是 data.author 的 2 个属性： { firstName, lastName } 放到当前对象里面。
  const user = { ...data.author, image: asabenehImage }

  const handleTime = () => {
    alert(showDate(new Date()))
  }
  const greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge, 2020')
  }

  return (
    <div className='app'>
      <Header data={data} />
      <Main
        user={user}
        techs={techs}
        handleTime={handleTime}
        greetPeople={greetPeople}
      />
      <Footer copyRight={date} />
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```





### Mapping array

比较熟悉了，我们一般这样：

```js
const list = numbers.map((number) => <li>{number}</li>)
```



#### Mapping array of arrays

Let's see how to map array of arrays

```react
import React from 'react'
import ReactDOM from 'react-dom'

// 多重数组： 
const skills = [
  ['HTML', 10],
  ['CSS', 7],
  ['JavaScript', 9],
  ['React', 8],
]

// Skill Component
// 解包
const Skill_ = ({ skill: [tech, level] }) => (
  <li>
    {tech} => {level}
  </li>
)

// Skills Component
// skills.length 长度为 4 ，说明整个二维数组都传递了过来
// skills.map, 说明是对每一个数组元素，即 ① ['HTML', 10] ② ['CSS', 7] 做操作。
// ['HTML', 10] 作为 {skill} 被传入 Skill_ 组件，解包，生成 <li> 标签
const Skills = ({ skills }) => {
  const skillsList = skills.map((skill) => <Skill_ skill={skill} />)
  console.log(skillsList)
  return <ul>{skillsList}</ul>
}

const App = () => {
  return (
    <div className='container'>
      <div>
        <h1>Skills Level</h1>
        <Skills skills={skills} />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

效果：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-29-112356.png)



#### Mapping array of objects 对象数组

```react
import React from 'react'
import ReactDOM from 'react-dom'

// 对象数组
const countries = [
  { name: 'Finland', city: 'Helsinki' },
  { name: 'Sweden', city: 'Stockholm' },
  { name: 'Denmark', city: 'Copenhagen' },
]

// Country component
const Country = ({ country: { name, city } }) => {
  return (
    <div>
      <h4>{name}</h4>
      <li><small>{city}</small></li>
    </div>
  )
}

// countries component
// 逻辑上面讲解过了，这个逻辑是一样的。
const Countries = ({ countries }) => {
  const countryList = countries.map((country) => <Country country={country} />)
  return <div>{countryList}</div>
}
// App component
const App = () => (
  <div className='container'>
    <div>
      <h1>Countries List</h1>
      <Countries countries={countries} />
    </div>
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

效果： 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-29-113027.png" style="zoom: 67%;" />





#### Key in mapping arrays

key 帮助 React 识别已更改、添加或删除的 items。应为数组内的元素提供 key ，以使 item 具有稳定的身份（stable identity）。

key 应该是唯一的，故大多将 id 作为 key 提供。如果我们在 mapping 映射期间没有将 key 传递给 React，它会在浏览器上引发 warning 。

如果数据没有 id，我们必须想办法在映射时为每个元素创建唯一标识符。请参见以下示例：

```react
<li key={num}> {num} </li>)
```



```react
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';

const Numbers = ({numbers}) => {
  // modifying array to array of li JSX
  传入 
  const list = numbers.map((num) => <li key={num}> {num} </li>)
  return list
}

const App = () => {
  const numbers = [1, 2, 3, 4, 5]

  return (
    <div className='container'>
      <div> <h1> Numbers List </h1>
        <ul>
          <Numbers numbers={numbers} />
        </ul>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



再看一个，让我们在 countries mapping 示例中添加 key ：

```react
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';

const countries = [
  { name: 'Finland', city: 'Helsinki' },
  { name: 'Sweden', city: 'Stockholm' },
  { name: 'Denmark', city: 'Copenhagen' },
  { name: 'Norway', city: 'Oslo' },
  { name: 'Iceland', city: 'Reykjavík' },
]

// Country component
const Country = ({ country: { name, city } }) => {
  return (
    <div>
      <h1>{name}</h1>
      <small>{city}</small>
    </div>
  )
}

// countries component
// <Country key={country.name} 
const Countries = ({ countries }) => {
  const countryList = countries.map((country) => (
    <Country key={country.name} country={country} />
  ))
  return <div>{countryList}</div>
}
const App = () => (
  <div className='container'>
    <div>
      <h1>Countries List</h1>
      <Countries countries={countries} />
    </div>
  </div>
)

// React 18:
const root = createRoot(document.getElementById('root'));
root.render(<App />);

```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-29-114109.png)

修改后： warning 消失。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-29-114557.png)







## 2. Class Components

这里如何将 func组件更改为 class 组件。

**基于类的 React 组件是 `React.Component `的子组件，它有一个内置的渲染方法 render() ，它可能有一个构造函数。**

```react
class Header extends React.Component {
  constructor(props) {
    super(props)
    // the code inside the constructor run before any other code
  }
  render() {
    return (
      <header>
        <div className='header-wrapper'>
          <h1>Welcome to 30 Days Of React</h1>
          <h2>Getting Started React</h2>
          <h3>JavaScript Library</h3>
          <p>Asabeneh Yetayeh</p>
          <small>Oct 7, 2020</small>
        </div>
      </header>
    )
  }
}
```



改写一下上面写过的：

```react
import React from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom'

// class base component
class Header extends React.Component {
  constructor(props) {
    super(props)
    // the code inside the constructor run before any other code
  }
  render() {
    return (
      <header>
        <div className='header-wrapper'>
          <h1>Welcome to 30 Days Of React</h1>
          <h2>Getting Started React</h2>
          <h3>JavaScript Library</h3>
          <p>Asabeneh Yetayeh</p>
          <small>Oct 7, 2020</small>
        </div>
      </header>
    )
  }
}

// TechList Component
// class base component
class TechList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const techs = ['HTML', 'CSS', 'JavaScript']
    const techsFormatted = techs.map((tech) => <li key={tech}>{tech}</li>)
    return techsFormatted
  }
}

// Main Component
// Class Component
class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <main>
        <div className='main-wrapper'>
          <p>Prerequisite to get started react.js:</p>
          <ul>
            <TechList />
          </ul>
        </div>
      </main>
    )
  }
}

// Footer Component
// Class component
class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <footer>
        <div className='footer-wrapper'>
          <p>Copyright 2020</p>
        </div>
      </footer>
    )
  }
}

// The App, or the parent or the container component
// Class Component
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() { 
    return (
      <div className='app'>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
//const rootElement = document.getElementById('root')
//ReactDOM.render(<App />, rootElement)
```





### this.props 与 解构

我们可以使用关键字 this 访问基于类的组件的 props。请参见下面的示例。

```react
// index.js

import React from 'react'
import ReactDOM from 'react-dom'

// class based component
class Header extends React.Component {
  constructor(props) {
    super(props)
    // the code inside the constructor run before any other code
  }
  render() {
    return (
      <header>
        <div className='header-wrapper'>
          <h1>{this.props.data.welcome}</h1>
          <h2>{this.props.data.title}</h2>
          <h3>
            {this.props.data.author.firstName} {this.props.data.author.lastName}
          </h3>
          <small>{this.props.data.date}</small>
        </div>
      </header>
    )
  }
}
const App = () => {
  const data = {
    welcome: 'Welcome to 30 Days Of React',
    title: 'Getting Started React',
    subtitle: 'JavaScript Library',
    author: {
      firstName: 'Asabeneh',
      lastName: 'Yetayeh',
    },
    date: 'Oct 7, 2020',
  }

  return (
    <div className='app'>
      <Header data={data} />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



如上例，为了从 props 中获取数据，我们每次都编写 props.data。

我们可以**使用解构来避免这种重复**。

```react
// index.js

import React from 'react'
import ReactDOM from 'react-dom'

// class based component
class Header extends React.Component {
  constructor(props) {
    super(props)
    // the code inside the constructor run before any other code
  }
  render() {
    console.log(this.props.data)
    
    // 解构 DestructurinD： 避免重复编写 props.data.xxx.xxxx....
    
    const {
      welcome,
      title,
      subtitle,
      author: { firstName, lastName },
      date,
    } = this.props.data

    return (
      <header>
        <div className='header-wrapper'>
          <h1>{welcome}</h1>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>
            {firstName} {lastName}
          </p>
          <small>{date}</small>
        </div>
      </header>
    )
  }
}
const App = () => {
  const data = {
    welcome: 'Welcome to 30 Days Of React',
    title: 'Getting Started React',
    subtitle: 'JavaScript Library',
    author: {
      firstName: 'Asabeneh',
      lastName: 'Yetayeh',
    },
    date: 'Oct 6, 2020',
  }

  return (
    <div className='app'>
      <Header data={data} />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```





### 给类添加方法 (method)

```react
//index.js

import React from 'react'
import ReactDOM from 'react-dom'

// class based component
class Header extends React.Component {
  greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge, 2020')
  }
  render() {
    return (
      <header>
        <div className='header-wrapper'>
          <h1>Welcome to 30 Days Of React</h1>
          <h2>Getting Started React</h2>
          <h3>JavaScript Library</h3>
          <p>Asabeneh Yetayeh</p>
          <small>Oct 7, 2020</small>
          <button onClick={this.greetPeople}> Greet </button>
        </div>
      </header>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Header />, rootElement)
```







## 3. States

状态即状态

在下面的例子中，我们将开发一个显示狗或猫的小应用程序。我们可以先用 cat 设置初始状态，然后当它被点击时，它会显示 dog

```react
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';

class App extends React.Component {
  // declaring state 是一个猫猫图片
  // 三元表达式做的是： 
  // ① 如果当前图片状态是猫，就把图片换成 dog 的 url 。
  // ① 如果当前图片状态是狗，就把图片换成 cat 的 url 。
  state = { image: 'https://www.smithsstationah.com/imagebank/eVetSites/Feline/01.jpg', }
  
  // 定义每次点击图片时需要调用的函数。 
  changeAnimal = () => {
    let dogURL = 'https://static.onecms.io/wp-content/uploads/sites/12/2015/04/dogs-pembroke-welsh-corgi-400x400.jpg'
    let catURL = 'https://www.smithsstationah.com/imagebank/eVetSites/Feline/01.jpg'
    let image = this.state.image === catURL ? dogURL : catURL
    this.setState({ image })
  }

  render() {
    // accessing the state value
    const count = this.state.count
    return (
      <div className='App'>
        <div className='animal'>
          <img src={this.state.image} alt='animal' />
        </div>

        <button onClick={this.changeAnimal} class='btn btn-add'>
          Change
        </button>
      </div>
    )
  }
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```



## 4. Conditional Rendering

条件渲染是一种在不同条件下渲染不同 JSX 或组件的方式。

我们可以使用常规的 if 和 else 语句、三元运算符和 && 来实现条件渲染。

```react
    ...
    let status = this.state.loggedIn ? (
      <h1>Welcome to 30 Days Of React</h1>
    ) : (
      <h3>Please Login</h3>
    )

    return (
      <div className='app'>
        <Header data={data} />
        {status}
        <Button
          text={this.state.loggedIn ? 'Logout' : 'Login'}
          style={buttonStyles}
          onClick={this.handleLogin}
        />
      </div>
    )
  }
```

除了 JSX，我们还可以有条件地渲染一个组件。让我们把上面的条件 `JSX` 改成一个组件。

```react
    const status = this.state.loggedIn ? <Welcome /> : <Login />
```



```react
// index.js
import React from 'react'
import ReactDOM from 'react-dom'

// A button component
const Button = ({ text, onClick, style }) => (
  <button style={style} onClick={onClick}>
    {text}
  </button>
)

// CSS styles in JavaScript Object
const buttonStyles = {
  backgroundColor: '#61dbfb',
  padding: 10,
  border: 'none',
  borderRadius: 5,
  margin: '3px auto',
  cursor: 'pointer',
  fontSize: 22,
  color: 'white',
}

// class based component
class Header extends React.Component {
  render() {
    const {
      welcome,
      title,
      subtitle,
      author: { firstName, lastName },
      date,
    } = this.props.data

    return (
      <header>
        <div className='header-wrapper'>
          <h1>{welcome}</h1>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>
            {firstName} {lastName}
          </p>
          <small>{date}</small>
        </div>
      </header>
    )
  }
}

const Login = () => (  <div> <h3>Please Login</h3>   </div> )
const Welcome = (props) => ( <div> <h1>Welcome to 30 Days Of React</h1> </div> )

class App extends React.Component {
  state = { loggedIn: false,  }
  handleLogin = () => {
    this.setState({  loggedIn: !this.state.loggedIn,  })
  }

  render() {
    const data = {
      welcome: '30 Days Of React',
      title: 'Getting Started React',
      subtitle: 'JavaScript Library',
      author: {
        firstName: 'Asabeneh',
        lastName: 'Yetayeh',
      },
      date: 'Oct 9, 2020',
    }

    const status = this.state.loggedIn ? <Welcome /> : <Login />

    return (
      <div className='app'>
        <Header data={data} />
        {status}
        <Button
          text={this.state.loggedIn ? 'Logout' : 'Login'}
          style={buttonStyles}
          onClick={this.handleLogin}
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-29-QQ20220429-221550-HD.gif" style="zoom:50%;" />



&&:  如果左操作数（表达式）为真，则 && 运算符渲染右 JSX 操作数。

```react
   ...
    return (
      <div className='app'>
        <Header data={data} />
        {status}
        <Button
          text={loggedIn ? 'Logout' : 'Login'}
          style={buttonStyles}
          onClick={this.handleLogin}
        />
        {techs.length === 3 && (
          <p>You have all the prerequisite courses to get started React</p>
        )}
        {!loggedIn && (
          <p>
            Please login to access more information about 30 Days Of React
            challenge
          </p>
   ...
```



注意一个点： 

```react
...  state = {
    techs: ['HTML', 'CSS', 'JS'],
  }  ...
... <TechList techs={this.props.techs} />  ...

class TechList extends React.Component {
  render() {
    const { techs } = this.props // (3) ['HTML', 'CSS', 'JS']
    //const techs  = this.props // {techs: Array(3)}
    // console.log(techs)
    const techsFormatted = techs.map((tech) => <li key={tech}>{tech}</li>)
    return techsFormatted
  }
}
```

如上，之前疑惑为什么 `const { techs } = this.props`  为什么要加一个花括号。

因为后面要 map ，在控制台上 log 一下 ：

- const { techs } = this.props ： 输出： (3) ['HTML', 'CSS', 'JS']
- const techs  = this.props ： 输出 ： {techs: Array(3)} ， 然后 map 直接报错。
- 所以看来还是要解包。









## React Project Folder Structure

在 React 项目中使用单个文件夹结构或文件命名没有严格的方法。但某些结构在可扩展性、可维护性、易于处理文件和易于理解的结构方面优于其他结构。如果您想进一步了解文件夹结构，可以查看以下文章。

- [React Folder Structure by https://www.devaradise.com](https://www.devaradise.com/react-project-folder-structure)
- [React Folder Structure by www.robinwieruch.de](https://www.robinwieruch.de/react-folder-structure)
- [React Folder Structure by Faraz Ahmad](https://dev.to/farazamiruddin/an-opinionated-guide-to-react-folder-structure-file-naming-1l7i)
- [React Folder Structure by https://maxrozen.com/](https://maxrozen.com/guidelines-improve-react-app-folder-structure/)



到目前为止，我们一直在处理 index.js 文件。我们在 index.js 上有很多组件。今天我们会将每个组件移动到一个文件中，并将所有文件导入 App.js。

目前，我们在 src 目录。所有文件夹结构都将在 src 目录中。

让我们从 index.js 文件开始。除了 index.js 文件，让我们创建一个 App.js 文件，并将我们必须的大部分组件暂时移动到 App.js 中。 

index.js 是您将组件与 index.html 连接起来的方法。

```react
// src/index.js
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



在上面的代码中有 App 组件。将 App 组件创建到它自己的文件 App.js 并 export

```react
// src/App.js
import React from 'react

// named export in regular function, function declaration
export function App () {
  return <h1>Welcome to 30 Days Of React</h1>
}
```

如果一个组件使用的是 `default export` ，我们在 import 过程中就不需要大括号 {} 。









## Events

In React ： 

```react
import React, { Component } from 'react'
// if it is functional components
class App extends Component {
  greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge')
  }
  render() {
    return <button onClick={this.greetPeople}> </button>
  }
}
```

HTML 和 React 事件之间的另一个区别是你不能返回 false 来阻止 React 中的默认行为。您必须显式调用 `preventDefault`。

```React
  handleSubmit = (e) => {
    /* e.preventDefault() 停止了表单元素的默认行为 —— 刷新页面  
        也就是说，调用这个函数之后，浏览器就不会哗啦把页面刷新了， 实测也确实是这样的。
    */
    e.preventDefault()
    
     /*
     在 submit 中。连接后端，把数据发过去
     write code to connect backend api
      and send the data to the backend database
     */
```





例如，对于纯 HTML，为了防止打开新页面的默认链接行为，您可以编写纯 HTML：

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

However, in React it could be as follows:

```react
// 哈？ 这里也没用 preventDefault 呀 。。。？？
import React, { Component } from 'react'
// if it is functional components
class App extends Component {
  handleClick = () => {
    alert('Welcome to 30 Days Of React Challenge')
  }
  render() {
    return (
      <a href='#' onClick={this.handleClick}>
        Click me
      </a>
    )
  }
}
```



Event handling（事件处理） is a very vast topic （非常大的主题）

we will focus on **the most common event types**.  like *onMouseMove, onMouseEnter, onMouseLeave, onMouseOut, onClick, onKeyDown, onKeyPress, onKeyUp, onCopy, onCut, onDrag, onChange,onBlur,onInput, onSubmit*



### 

### **React 的事件委托(事件冒泡)**：

> **事件的冒泡机制**： 目标点由下而上，直到 window。先触发目标事件，再触发目标的上级事件

假设有如下 html，我们想要在每个 `li` 上绑定 `onClick` 事件，最直观的做法当然就是给每个 li 分别添加事件，增加事件回调。这种做法当然没错，但是我们有一种更好的做法，那就是在 `ul` 上添加**监听事件**，由于事件的冒泡机制，事件就会冒泡到 ul 上，因为 ul 上有事件监听，所以事件就会触发。

```html
<ul id="operate">
 <li id="add">add</li>
 <li id="edit">edit</li>
 <li id="delete">delete</li>
</ul>
```

事件委托有以下优点。

1. 减少事件注册，节省内存，能够提升整体性能。
2. 简化了 dom 节点更新时相应事件的更新（用过 jquery 的都知道，动态加入的元素，事件需要重新绑定）。

React 并不是将 click 事件直接绑定在 dom 上面，而是采用事件冒泡的形式冒泡到 **document** 上面，这个思路借鉴了事件委托机制。所以，React 中所有的事件最后都是被委托到了 document 这个顶级 DOM 上。



----

当父子组件相互嵌套时，我们点击子组件时，子组件的点击事件会触发，但由于子组件被包含在父组件中，父组件的点击事件也会触发。为了防止事件冒泡，需要在子组件的点击事件中，写上`e.stopPropagation()`，就可以防止事件冒泡了 ? 

**event.stopPropagation();**

 js 中的事件默认是冒泡方式，逐层往上传播，可以通过 `stopPropagation()` 函数停止事件在DOM层次中的传播



> 有时候，在项目中，打开弹框，滑动遮罩，遮罩下面的内容也会跟着一起滑动，造成事件穿透的现象。可以通过`event.stopPropagation()` 阻止事件冒泡。





### event object 'e' 

React 事件插件的重要工作，就是将浏览器的 nativeEvent（原生事件）转换成 SyntheticEvent（合成事件）。不同的插件完成了不同的事件转换。

每次触发DOM事件时会产生一个事件对象（也称event对象），此处的参数e接收事件对象。而事件对象也有很多属性和方法，其中 target 属性是获取触发事件对象的目标，也就是绑定事件的元素，`e.target  ` 表示该DOM元素，然后在获取其相应的属性值。

```react
// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    firstName: '',
    message: '',
    key: '',
  }
  handleClick = (e) => {
    // e ：事件对象 event object
    // console.log(e) :  SyntheticBaseEvent 合成事件
    // {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: button, … }
    this.setState({
      message: 'Welcome to the world of events',
    })
  }
  // triggered whenever the mouse moves
  handleMouseMove = (e) => {
    this.setState({ message: 'mouse is moving' })
  }
  // to get value when an input field changes a value
  // e.target.value 可以获取触发事件对象的目标的 value 。
  handleChange = (e) => {
    this.setState({
      firstName: e.target.value,
      message: e.target.value,
    })
  }

  // to get keyboard key code when an input field is pressed
  // it works with input and textarea
  handleKeyPress = (e) => {
    this.setState({
      message:
        `${e.target.value} has been pressed and the keycode is` + e.charCode,
    })
  }
  // Blurring happens when a mouse leave an input field
  handleBlur = (e) => {
    this.setState({ message: 'Input field has been blurred' })
  }
  // This event triggers during a text copy
  handleCopy = (e) => {
    this.setState({
      message: 'Using 30 Days Of React for commercial purpose is not allowed',
    })
  }
  render() {
    return (
      <div>
        <h1>Welcome to the World of Events</h1>

        <button onClick={this.handleClick}>Click Me</button>
        <button onMouseMove={this.handleMouseMove}>Move mouse on me</button>
        <p onCopy={this.handleCopy}>
          Check copy right permission by copying this text
        </p>

        <p>{this.state.message}</p>
        <label htmlFor=''> Test for onKeyPress Event: </label>
        <input type='text' onKeyPress={this.handleKeyPress} />
        <br />

        <label htmlFor=''> Test for onBlur Event: </label>
        <input type='text' onBlur={this.handleBlur} />

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name: </label>
            <input
              onChange={this.handleChange}
              name='firstName'
              value={this.state.value}
            />
          </div>

          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
// we render the JSX element using the ReactDOM package
ReactDOM.render(<App />, rootElement)
```







## Forms 表单处理

我们会填写不同的表单字段以将数据提交到远程数据库。

例如简单文本、电子邮件、密码、电话、日期、复选框、单选按钮、选项选择和文本区域字段。

```html
<!--  一些 HTML 表单：-->
<input type="text" />
<input type="number" />
<input type="range" />

<input type="email" />
<input type="password" />
<input type="tel" />

<input type="checkbox" />
<input type="radio" />

<input type="color" />

<input type="url" />
<input type="image" />
<input type="file" />

<input type="hidden" />

<input type="date" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
<input type="time" />

<input type="reset" />
<input type="search" />
<input type="submit" />
<input type="button" />


<!-- 包括 textarea 和 select with options 等  ： -->

<textarea>Please write your comment ...</textarea>

<select name="country">
  <option value="">Select your country</option>
  <option value="finland">Finland</option>
  <option value="sweden">Sweden</option>
  <option value="denmark">Denmark</option>
</select>
```

这次我们将关注更多的 `onChange` 事件类型，它会在输入字段数据更改时触发。

默认情况下，输入字段有一个内存来存储输入数据，但在本节中，我们使用状态来控制它，并且我们实现了一个受控输入 (controlled component)。

### Getting data from an input field

如下例： 

- onChange 方法： 输入框中的元素发生改变即触发。
- handleChange 方法： onChange 触发后会 触发 handleChange ，调用 setState() 方法改变 FirstNma 的值，再返回 `<h1>{this.state.firstName}</h1>` 进行渲染。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {   firstName: '',  }
  handleChange = (e) => {
    // e 是事件对象 event object，e.target.value 可以获取触发事件对象的目标的 value 。
    const value = e.target.value
    this.setState({ firstName: value })
  }

  render() {
    /* 访问(accessing)  state 值, 这个值会被注入到 input */
    const firstName = this.state.firstName
    return (
      <div className='App'>
        <label htmlFor='firstName'>First Name: </label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          placeholder='First Name'
          value={firstName}
          onChange={this.handleChange}
        />
        <h1>{this.state.firstName}</h1>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```







### 表单验证

验证的主要目的是从用户那里获得所需的数据。此外，防止恶意用户和数据。

验证可以在客户端或服务器端完成。

客户端验证可以使用 HTML5 内置验证或使用 JavaScript（使用正则表达式）来实现。







## Uncontrolled Component

在大多数情况下，我们使用 React 官方文档中推荐的受控输入。

非受控组件即不被**父组件**控制，也就是一个独立组件，不需要传值，也无任何与当前组件的父组件有所交集。

在我们封装组件的时候,只有在当前组件只做展示用途，且无任何不同的时候才会封装为非受控组件

在HTML当中，像 `<input />` 、`<textarea>`这类表单元素会维持自身状态，并根据用户输入进行更新。但在 React 中，这些组件在**不加以处理的情况下都是非受控组件**，因为你真正使用的时候会发现这些组件是不会自动更新值的，我们输入的值在不做任何处理的情况是无法拿到使用输入的值的：

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Demo1 extends Component {
    render() {
        return (
            <input />
            //<ABC />
        )
    }
}

ReactDOM.render(<Demo1/>, document.getElementById('content'))
```

他们转化成受控组件，就是通过 onChange 等事件获取当前输入内容，作为 value 传入，此时就成为受控组件。



**非受控组件DOM操作：**

①  操作DOM 获取到你要的数据 ： ref 属性接受一个回调函数，返回一个 element 节点 ， 通过节点获取到数据 `ref={(element)=>this.addressElement = element }`
② 可以在构造函数里面定义一个变量，通过变量来创建组件引用，就可以获取到这个节点

如果 ref 等于一个函数，表示当元素被挂载到页面中之后会立即调用此函数，并传入渲染后的DOM元素

```React
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Sum extends Component{
    handleChange=(event)=>{
        let a = parseInt(this.a.value||0);
        let b = parseInt(this.b.value||0);
        this.result.value = a+b;
    }
    render(){
        //如果ref等于一个函数，表示当元素被挂载到页面中之后会立即调用此函数，并传入渲染后的DOM元素
        return (
            //经过React封装可以onChange可以写在div上
            <div onChange={this.handleChange}> 
                <input type="text" ref={ref=>this.a=ref} /> + 
                <input type="text" ref={ref=>this.b=ref} /> = 
                <input type="text" ref={ref=>this.result=ref} />
            </div>
            //this指当前类的实例,a表示当前实例的属性，此时this.a就是input这个DOM元素
            //input是非受控组件，因为不受状态控制
        )
    }
}

ReactDOM.render(<Sum/>,window.app)
```



这种方式也是官方比较推荐的方式。Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```react
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();  
  }

  componentDidMount() {
    this.textInput.current.focusTextInput(); 
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />    
	  );
  }
}
```





## Life Cycles 生命周期

组件生命周期是在 React 应用程序中安装、更新和销毁组件的过程。

- Mounting
- Updating
- Unmounting

将 React 组件渲染或放入 DOM 称为挂载。以下内置方法在安装 React 组件期间按给定顺序运行。

1. constructor()
2. static getDerivedStateFromProps()
3. render()  （可选 Optional ）
4. componentDidMount()



通过运行以下代码片段查看不同方法的执行顺序。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: '',
    }
  }

  //从名字我们就可以理解，这个方法从 props 中派生出一个状态。
  static getDerivedStateFromProps(props, state) {
    console.log(
      'I am getDerivedStateFromProps and I will be the second to run.'
      
    )
    return null
  }
  componentDidMount() {
    console.log('I am componentDidMount and I will be last to run.')
  }

  // render 方法是我们返回 JSX 的地方。
  // 每当状态发生变化时，渲染方法都会渲染。不要在渲染方法中设置 State。
  render() {
    console.log('I am render and I will be the third to run.')
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



在组件被挂载到 DOM 之后，它可以在 state 或 props 发生变化时更新，在重新渲染组件时，这些方法按以下顺序调用：

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()



`shouldComponentUpdate()` 内置生命周期方法返回一个布尔值。如果此方法**未返回 true**，则应用程序将不会更新。这可以用于在达到某个点（游戏、订阅）时阻止使用，或者可以用于阻止某个特定用户。

例如，如果我们想在 30 天后停止挑战，我们可以将这一天从 1 增加到 30，我们可以在第 30 天阻止应用程序。看这个例子。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
      day: 1,
    }
  }

  // Core Code ...
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    console.log(nextState.day)
    if (nextState.day > 31) {
      return false
    } else {
      return true
    }
  }
  // the doChallenge increment the day by one
  doChallenge = () => {
    this.setState({
      day: this.state.day + 1,
    })
  }
  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <button onClick={this.doChallenge}>Do Challenge</button>
        <p>Challenge: Day {this.state.day}</p>
        {this.state.congratulate && <h2>{this.state.congratulate}</h2>}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



**`componentDidUpdate`** 有两个参数：prevProps 和 prevState。它在组件在 DOM 中更新后调用。



----

**Unmounting**

组件生命周期的最后阶段是卸载。卸载阶段从 DOM 中移除组件。 `componentWillUnmount` 方法是唯一在卸载组件时调用的内置方法。





## React Router

https://github.com/Asabeneh/30-Days-Of-React/blob/master/17_React_Router/17_react_router.md





 React Router 本身就是一个 React 组件，它允许您在 React 组件之间导航。

https://reactrouter.com/web/guides/quick-start

正如我们一开始就明确指出，React 是一个单页面应用程序，在整个应用程序中只有一个 index.html 页面。当我们实现 React Router 时，不同的组件会根据不同的逻辑和条件同时或不同时间在 index.html 页面上呈现。

导入 react-router-dom：

```React
import React from 'react'
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect,
  Prompt,
  withRouter,
} from 'react-router-dom'
```

BrowerRouter 是允许包装应用程序路由的父组件。使用 BrowserRouter 我们可以访问浏览器历史记录。它可以被重命名为 router：

```React
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
```

让我们利用 BrowserRouter 为 React 应用程序进行导航：





## Fetch and Axios

**JavaScript** 提供了 **fetach**  API 来发出 HTTP 请求。

```js
class App extends Component {
  state = { data: [],  }

  componentDidMount() {
    const url = 'https://restcountries.eu/rest/v2/all'
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({ data,  })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    ...
```



我们可以实现 async 和 await 并使上面的代码简洁明了。

```react
class App extends Component {
  state = {   data: [],  }

  componentDidMount() {   
    this.fetchCountryData()   // Attention !!
  }

  fetchCountryData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    const response = await fetch(url)
    const data = await response.json()
    this.setState({  data,  })
  }

  render() {
    return (
      <div className='App'>
        <h1>Fetching API using Fetch</h1>
        <h1>Calling API</h1>
        <div>
          <p>There are {this.state.data.length} countries in the api</p>
          <div className='countries-wrapper'>
            {this.state.data.map((country) => (
              <Country country={country} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
```

如果我们使用 async 和 await，我们会使用 try 和 catch 来处理错误。让我们在上面的代码中应用一个 try catch 块。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Country = ({ country: { name, flag, population } }) => {
  return (
    <div className='country'>
      <div className='country_flag'>
        <img src={flag} alt={name} />
      </div>
      <h3 className='country_name'>{name.toUpperCase()}</h3>
      <div class='country_text'>
        <p>
          <span>Population: </span>
          {population}
        </p>
        <p>
          <span>Currency: </span>
          {currency}
        </p>
      </div>
    </div>
  )
}

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.fetchCountryData()
  }

  fetchCountryData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      this.setState({
        data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className='App'>
        <h1>Fetching API using Fetch</h1>
        <h1>Calling API</h1>
        <div>
          <p>There are {this.state.data.length} countries in the api</p>
          <div className='countries-wrapper'>
            {this.state.data.map((country) => (
              <Country country={country} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```



----





**Axios**
Axios 是一个第三方包，我们需要使用  `npm i axios ` 安装它。这是发出 HTTP 请求（GET、POST、PUT、PATCH、DELETE）的最流行方式。在这个例子中，我们将只介绍一个 get 请求。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Country = ({
  country: { name, capital, flag, languages, population, currency },
}) => {
  return (
    <div className='country'>
      <div className='country_flag'>
        <img src={flag} alt={name} />
      </div>
      <h3 className='country_name'>{name.toUpperCase()}</h3>
      <div class='country_text'>
        <p>
          <span>Population: </span>
          {population}
        </p>
        >
      </div>
    </div>
  )
}

class App extends Component {
  state = {
    data: [],
  }

  // 将获得的数据装到 data 里面。
  componentDidMount() {
    const url = 'https://restcountries.eu/rest/v2/all'
    axios
      .get(url)
      .then((response) => {
        this.setState({
          data: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h1>Calling API</h1>
        <div>
          <p>There are {this.state.data.length} countries in the api</p>
          <div className='countries-wrapper'>
            {this.state.data.map((country) => (
              <Country country={country} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-30-143620.png)



如您所见，fetch 和 axios 之间没有太大区别。但由于浏览器支持和易用性，我建议您使用比 fetch 更多的 axios。







