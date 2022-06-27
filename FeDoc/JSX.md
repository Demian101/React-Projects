JSX 本质是 React.createElement(component,props,children)函数的语法糖。它看起来很像 XML 的 JavaScript 语法扩展，React 使用 JSX 来替代常规的 JavaScript。

元素是构成 React 应用的最小单位，JSX 就是用来声明 React 当中的元素。

**优点：**

>  JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
>
> 它是类型安全的，在编译过程中就能发现错误。
>
> 使用 JSX 编写模板更加简单快速。



DOM：与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。

JSX 这种 `<></>` 标签的写法，编写的组件通过预处理器 **babel** 解析后，再交给 React 库渲染到指定父容器下，形成最终 html 页面，供浏览器解析和显示。



**JSX 本身其实也是一种表达式**，在编译之后，JSX 其实会被转化为普通的 JavaScript 对象。

**Before:**（转换前你写的代码）

```jax
/** @jsx h **/
let foo = <div id="foo">Hello!</div> 
```

**After:**（转换后的可运行代码）

```js
var foo = h("div", {id:"foo"}, "Hello")';
```

这意味着，可以在 `if` 或者 `for` 语句里使用 JSX，将它赋值给变量，当作参数传入，作为返回值都可以：

```jsx
<script type= "text/babel">
    function formatName(user) {
        return user.firstName + ' ' + user.lastName ;
    }

    const user = {
        firstName: 'Harper',
        lastName:  'Perez'
    };

    function getGreeting(user) {
        if(user) {
            <!-- 在语句里使用 jsx -->
            return <h1> Hello, {formatName(user)}! </h1>;
        }
        return <h1>Hello, Stranger.</h1>;
    }

    ReactDOM.render (
        getGreeting(user),
        document.getElementById('root')
    );
```



# intro.

```jsx
# 这种看起来可能有些奇怪的标签语法，既不是字符串也不是 HTML ，就是 JSX。
# jsx 声明变量
const element = <h1>Hello, world!</h1>;

# jsx 中设置属性
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
const element = <img src={user.avatarUrl} />;

# jsx 中可以包含多个子元素
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);

# jsx作为表达式，用在return返回
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

```



# Comment

**标签内部**的注释需要写在大括号中，

**标签外**的注释**不能**使用大括号

```jsx
    ReactDOM.render(
        /* 标签外注释不能用 {} ! */
        <div>
           <h1> 
               {/* 标签内的注释要写在大括号中 */}
           </h1>
        document.getElementById('root')
    );

```



```jsx
var content = (
  <Nav>
    {/* 一般注释, 用 {} 包围 */}
    <Person
      /* 多
         行
         注释 */
      name={window.isLoggedIn ? window.name : ''} // 行尾注释
    />
  </Nav>
);
```





# {} ：Injecting data to a JSX Element

`{}` 使得 `jsx` 可以直接使用 `js` 语法表达式。

你可以任意地在 JSX 当中使用 [JavaScript 表达式](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FExpressions_and_Operators%23Expressions)，在 JSX 当中的表达式要包含在大括号 `{}` 里。

推荐在 JSX 代码的外面扩上一个小括号，这样可以防止分号自动插入的 bug。

```jsx
# JSX 中调用 js 函数：
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
// 渲染element元素并加载到父容器root下
ReactDOM.render(
    element,
    document.getElementById('root')
);
# JSX 嵌入 复杂表达式
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



```React
const welcome = 'Welcome to 30 Days Of React'
const title = 'Getting Started React'
const subtitle = 'JavaScript Library'
const authorFirstName = 'Asabeneh'
const authorLastName = 'Yetayeh'
const date = 'Oct 1, 2020'

// JSX element, header
const header = (
  <header>
    <div className='header-wrapper'>
      <h1>{welcome}</h1>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>
        Instructor: {authorFirstName} {authorLastName}
      </p>
      <small>Date: {date}</small>
    </div>
  </header>
)
```



# 样式

React 推荐使用内联样式。 （为啥。。。感觉都写在一起好肿 。。）

我们可以使用 **camelCase** (驼峰)语法来设置内联样式

React 会在指定元素数字后自动添加 **px** 。

```jsx
<div id= "root"></div>
<script type="text/babel">
    var myStyle = {
        fontSize: 100,
        color: 'red'
    };
    ReactDOM.render(
        <h1 style = {myStyle}> Hello React </h1>,
        document.getElementById('root')
    );
</script>
```





# 数组 

JSX 允许在模板中插入数组，数组会自动展开所有成员：

```jsx
<div id="root">/div>
<script type="text/babel">
    var arr = [
        <h1>Hello World</h1>,
        <h2>Hello React</h2>
    ];
    
    ReactDOM. render(
        <div>
             [arr]
        </div>, 
      document.getElementById('root')
    );
</script>
```



如果：

```React
const techs = ['HTML', 'CSS', 'JavaScript']
const main = (
        <main>
          <div className='main-wrapper'>
            <ul>{techs}</ul>
          </div>
        </main>
      )
ReactDOM.render(main, rootElement)
```

这样的话 ，techs 会黏成一坨：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-28-081045.png)

所以需要这样展开：

> 作为一名 React 开发人员，您应该对函数式编程（map、filter、reduce、find、some、every）有很好的理解。

```React
const techs = ['HTML', 'CSS', 'JavaScript']
const techsFormatted = techs.map((tech) => <li>{tech}</li>)
```



OK , 现在列表的格式正确，但是console 上有一个 warning，它说每个列表应该有一个 unique key。在数组中，我们没有 id，但是当您的数据中有 id 时，通常会将 id 作为唯一值传递。

现在，让我们使用 unique key 传递给 每个 item 以删除警告。

```React
// JSX element, main
const techs = ['HTML', 'CSS', 'JavaScript']
const techsFormatted = techs.map((tech) => <li key={tech}>{tech}</li>)
const main = (
        <main>
          <div className='main-wrapper'>
            <ul>{techsFormatted}</ul>
          </div>
        </main>
      )
ReactDOM.render(main, rootElement)
```







# JSX 属性 

你可以使用引号来定义以字符串为值的属性：

```jsx
const element = <div tabIndex="0"></div>;
```

也可以使用大括号来定义以 JavaScript 表达式为值的属性：

```jsx
const element = <img src={user.avatarUrl} />;
```



## 使用 JSX 指定子级

```js
// 如果一个标签是空的，你可以立即用 /> 关闭它，类似 XML：
const element = <img src={user.avatarUrl} />;  

// JSX 标签可能包含子标签：
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```





## JSX 表示对象 Objective

Babel 转译器会把 JSX 转换成一个名为 `React.createElement()` 的方法调用。

下面两种代码的作用是完全相同的：

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```react
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```



`React.createElement()` 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：

```jsx
//注意:以下示例是简化过的 (不代表在React源码中是这样)
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这样的对象被称为 “React 元素”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并使其保持最新状态。



> 我们建议为您选择的编辑器使用“Babel”语言定义 [“Babel” language definition](https://babeljs.io/docs/en/next/editors)，以便正确突出显示 ES6 和 JSX 代码。



---

在 JSX 中不能使用 **if else** 语句，但可以使用 **conditional (三元运算)** 表达式来替代。

> 如果变量 **i** 等于 **1** 浏览器将输出 **true**, 如果修改 i 的值，则会输出 **false**.

```jsx
<script type= "text/babel">
    var i=1;
    ReactDOM.render(
    <div>
        <h1> {i == 1 ? 'true' : 'false'} </h1>
    </div>,
    document.getElementById('root')
);
</script>
```



# 

# HTML标签 与 React组件 对比

React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。

要渲染 **HTML** 标签，只需在 JSX 里使用小写字母开头的标签名。

```javascript
var myDivElement = <div className="foo" />;
React.render(myDivElement, document.body);
```

要渲染 **React** 组件，只需创建一个大写字母开头的本地变量。

```javascript
var MyComponent = React.createClass({/*...*/});
var myElement = <MyComponent someProperty={true} />;
React.render(myElement, document.body);
```

React 的 JSX 里约定分别使用首字母大、小写来区分本地组件的类和 HTML 标签。



# 转换

JSX 把类 XML 的语法转成纯粹 JavaScript，XML 元素、属性和子节点被转换成  `React.createElement` 的参数。

```javascript
var Nav;
// 输入 (JSX):
var app = <Nav color="blue" />;
// 输出 (JS):
var app = React.createElement(Nav, {color:"blue"});
```

注意，要想使用 `<Nav />`，`Nav` 变量一定要在作用区间内。

JSX 也支持使用 XML 语法定义子结点：

```javascript
var Nav, Profile;
// 输入 (JSX):
var app = <Nav color="blue"><Profile>click</Profile></Nav>;
// 输出 (JS):
var app = React.createElement(
  Nav,
  {color:"blue"},
  React.createElement(Profile, null, "click")
);
```