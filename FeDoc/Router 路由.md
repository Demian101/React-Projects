http://react-guide.github.io/react-router-cn/





# 基础使用

-  `<Link>` 组件可以将文本 text 变成可供点击跳转的功能组件 
- `<Route>` 标签指定 路径 path 和组件 的对应关系 

```react
// Home.js
export default function Home() {
  return (
    <div> Home...</div>
  )
};

// About.js
export default function About() {
  return (
    <div> About...</div>
  )
};

// App.js
// - 引入 2 个组件
import Home from "./Home";
import About from "./About";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    // 声明当前要用一个非 hash 模式的路由
    <BrowserRouter>
      {/* 指定跳转的组件 to 用来配置路由地址 */}
      {/* Link 组件可以将文本 text 变成可供点击跳转的功能组件 */}
      <Link to="/" > 首页 </Link>
      <Link to="/about" > 关于 </Link>
      {/* 路由出口路由 对应的 真实组件 会在这里进行渲染 */}
      <Routes>
        {/* 指定路径 和 组件的对应关系 */}
        <Route path="/" element={<Home />}> </Route>
        <Route path="about" element={<About />}> </Route>
      </Routes>
    
    </BrowserRouter>
  );
};
```

效果图 : 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-12-QQ20220612-223028-HD.gif)







# 核心组件

**HashRouter VS. BrowserRouter**

推荐 BrowserRouter , 因为没有 /#/ , 用户体验更好



- HashRouter : 使用 URL 的哈希值实现（http://localhost:3000/#/first）
- **BrowserRouter** **(** **推荐**) 使用 H5 的 `history.pushState API ` 实现（http://localhost:3000/first）



**Link**

审查元素发现 , Link 最终会渲染为 `<a>` 链接元素 : 

```react
<Link to="/about" > 关于 </Link>  

会被渲染成 : 

<a href="/about"> 关于 </a>
```



**Routes**

1. 提供一个路由出口，满足条件的路由组件会渲染到组件内部; 

2. 定义 path 和组件的对应关系

```react
<Routes>
 {/* 满足条件的路由组件会渲染到这里 */} 
  <Route />
  ..
</Routes>
```

如上例 , 当用户点击了 `<Link to="/about" > 关于 </Link>`  的 "关于" 后 , 

url 会跳转到  `http://localhost/about` ; 

`Routes`  会去看 , 下属的哪个 `Route` 会匹配到当前的路径地址 "/about"  

显然是 :  `<Route path="about" element={<About />}> </Route>` , 所以就渲染 `<About />` 组件作为路径出口 (满足条件的路由组件会渲染到组件内部; )



**Route**

1. path 属性指定匹配的路径地址，
2. element属性指定要渲染的组件

```react
 <Route path="about" element={<About />}> </Route>
```

当 url 路径为  **‘/about’**  时，会渲染 ` <About/> ` 组件

总结下 : 

- `<Link>` 会使 Url 路径发生变化
- `<Route>` 会去匹配变化了的 url 来看要渲染哪个组件





# 编程式导航

## useNavigate 跳转

```react 
// 新增 Login.js 组件
import { useNavigate } from "react-router-dom"

export default function Login(){
  const navigate = useNavigate()
  const goAbout = () => {
    navigate("/about")
  }
  return ( 
    <>
      <div> login.. </div>
      <button onClick={goAbout}> 跳到 “关于” </button>
    </>
  )
};

// App.js : 
      <Routes>
        ..
        <Route path="login" element={<Login />}> </Route>
      </Routes>
```

> 如果在跳转时不想加历史记录，可以添加额外参数 `navigate("/about", {replace: true} )` 



## 跳转带参数

### 1. searchParams传参

```react
// 传参: 
navigate('/about?id=1')

// 取参数 , useSearchParams() 返回一个数组 [] , [params] 就是说取数组的第一个元素
//  写成 const [params, _] = useSearchParams()  可能更清晰一些
const [params] = useSearchParams()  
const id = params.get('id')
```



在 `About.js` 里新增这一句 : 

```react
// About.js
import { useSearchParams, useParams } from "react-router-dom"

export default function About() {
  const [params, _ ] = useSearchParams()
  const id = params.get('id')      // 新增
  console.log("params", _)
  return (
    <> 
      <div> About...</div>
      <div> get id ： {id} </div>  
    </> )
};
```

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220612232515781.png" alt="image-20220612232515781" style="zoom:50%;" />



### 2. Params 传参

```react
// 传参:
navigate('/about/1')

// 取参:
const params = useParams()
const id = params.id
```



# 嵌套路由

## Outlet 二级路由出口

一般的模式是这样的 : 

- `/` 根目录是 Layout 组件 , 导航栏有 2 个 按钮, 可以切换 Board 和 Article
- 点击 Board 后会跳转到 /board 路由
- 点击 Article 后跳转到 /article 路由

```js
Layout ( / )

    - Board ( /board )

    - Article ( / article )
```

结构如下图: 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-12-154505.png" style="zoom:50%;" />



实现 : 

1. `App.js` :  定义嵌套路由声明

2. `Layout.js` :  使用 `<Outlet />` 指定二级路由出口

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-13-024214.png" style="zoom:50%;" />

如上图, `/board ` 和 `/article ` 写在了 `<Route path='/'`  里面 : 

- `<Route path='/'`  是一级路由 , 只有先匹配到 `/`   显示 `<Layout>` ,  二级路由才有被匹配的可能和机会 . 
- 在 `<Layout>` 里 , 插入 `<Outlet>` 路由出口 , 说明如果能匹配到 url 为  `/board ` 和 `/article `  , 则会分别呈现 `<Board>` 和 `<Article>`





## 默认二级路由设置

常见需求: 在访问 `http://localhost` 后, 默认渲染出 `http://localhost/board` 的内容作为主页

只需要对想定义的二级路由 `<Route>` 添加 index, 然后删除其默认 path 即可

```react
//App.js 
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Board from "./Board"
import Article from "./Article";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Layout />}> {/* 首先得匹配到一级路由*/}
          <Route index element={<Board />}> </Route>     {/* 匹配后默认显示该二级路由 */}
          <Route path='/arcticle' element={<Article />}> </Route>  {/* 二级路由 */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```



```react
// Layout.js
import { Outlet } from "react-router-dom"

export default function Layout() {
  return ( 
  <div> 
    Layout.. 
    <Outlet />    {/* 二级路由出口 */}
  </div>)
}
```

效果图 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-13-031413.png" style="zoom:50%;" />

可见 , Board 已经被默认渲染出来了.





# 404 配置

当所有的路由都没有被匹配时 , 显示 404 Not Found 页面

做法:  在各级路由的最后添加 ` * 号` 路由 作为兜底

```react
import NotFound from "./NotFound";
...
  <BrowserRouter>
      <Routes>
         <Route path='/' element={<Layout />}> {/* 首先得匹配到一级路由*/}
          <Route index element={<Board />}> </Route>     {/* 匹配后默认显示该二级路由 */}
          <Route path='/board' element={<Board />}> </Route>       {/* 二级路由 */}
          <Route path='/arcticle' element={<Article />}> </Route>  {/* 二级路由 */}
        </Route>
        <Route path="*" element={ <NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}
```





## 官网



直接看代码 : 

```react
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
...

  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
```

通过上面的配置，这个应用知道如何渲染下面四个 URL：

| URL                   | 组件                      |
| --------------------- | ------------------------- |
| `/`                   | `App`                     |
| `/about`              | `App -> About`            |
| `/inbox`              | `App -> Inbox`            |
| `/inbox/messages/:id` | `App -> Inbox -> Message` |



