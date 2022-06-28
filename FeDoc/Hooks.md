# What is hook ?

经过多年的实战 , 认为函数组件更符合 React 的设计理念  `UI = f(data)` , 为了能让函数组件可以拥有自己的状态  , Hooks 在 React 16.8 中应运而生

Hook 允许在**不编写类组件**的情况下使用状态、生命周期方法和其他 React 特性。如果我们使用 hooks，我们可以在整个应用程序中只有一个 functional component （功能组件）。

hook API 就有两套：类（class）API  和 基于函数的 hooks API  ,  任何一个组件，可以用类来写，也可以用钩子来写。下面是类的写法。

```React
class Welcome extends React.Component {
  render() {
   return <h1>Hello, {this.props.name}</h1>;
  }
}
```

再来看钩子的写法，也就是函数。

```React
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这两种写法，作用完全一样。官方推荐使用钩子（函数），而不是类。因为钩子更简洁，代码量少，用起来比较"轻"，而类比较"重"。而且，钩子是函数，更符合 React 函数式的本质。

但是，钩子的灵活性太大，初学者不太容易理解。很多人一知半解，很容易写出混乱不堪、无法维护的代码。那就不如使用类了。因为类有很多强制的语法约束，不容易搞乱。

-----

## 纯函数只做计算(其他的都是 side effect)

**函数一般来说，只应该做一件事，就是返回一个值。** 如果你有多个操作，每个操作应该写成一个单独的函数。而且，数据的状态应该与操作方法分离。根据这种理念，React 的函数组件只应该做一件事情：返回组件的 HTML 代码，而没有其他的功能。这种只进行单纯的数据计算（换算）的函数，在函数式编程里面称为 **"纯函数"**（pure function）。

看到这里，你可能会产生一个疑问：如果纯函数只能进行数据计算，那些**不涉及计算**的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？



函数式编程将那些跟数据计算无关的操作，都称为 "副效应" **（side effect）** 。如果函数内部直接包含产生副效应的操作，就不再是纯函数了，我们称之为不纯的函数。

纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。

一句话，**钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应（side effect）。** 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都**必须通过 hook引入**。



由于副效应非常多，所以钩子有许多种。React 为许多常见的操作（副效应），都提供了专用的钩子。

- `useState()`：保存状态
- `useContext()`：保存上下文
- `useRef()`：保存引用

- `useEffect`：**通用的副效应钩子**，找不到对应的钩子时，就可以用它。





# useState

Tips: `useState(0)  `实际上返回一个数组 ,  我们用 `const [value, setValue] = useState(0)` 来接收 `useState(0)` 返回的数组



## 连续更新问题

react hook 的 useState 更新是异步的，所以在连续更新触发 useState 时 , 有时会出现问题 : 

如下例计数器 , 快速连续点击了两次按钮后，值只增加了 1 次，因为两次 count+1 操作时的 count 都还是 1 。

```react
import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(1);
    const clickHandler = ()=> {
        setTimeout(()=>{
            setCount(count+1);
        }, 1000);  // 人为设置 1s 的卡顿
    }
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={clickHandler}>+1</button>
        </div>
    );
};
```

上边案例中的 ` setCount(count+1);` 可以改成这个样子：

```
setCount(prevState => prevState+1);

// 即

setCount( (prevState) => { return prevState + 1});
```

这样一来，函数中的 prevState 是上次修改后的最新 state，避免再次出现点击多次按钮只修改一次的问题。总的来说，当我们修改一个state的值而需要依赖于前边的值进行计算时，最安全的方式就是通过回调函数而不是直接修改。





### oldvalue

关于 oldvalue :  就是 state 中现在的值,

类似上面说的连续更新问题 , 这里的 setPage 通过一个回调函数来修改 page ，回调函数的返回值就是新的 state 的值

使用回调函数的好处是，这个回调函数会确保上一次的 `setPage()` 调用完成后才被调用，同时 (在下一次调用前) 会使用最新的 page 值作为回调函数的第一个参数。

```react
// 下面是多页分页, 切换页码的组件:
// oldPage 的作用 : 
//   我们要扩展下 setPage 的写法, 所以需要提取下修改 page 前的现在的值
// oldPage 可以是 oldMoney, oldValue 都是指的上一个值 
const [page, setPage] = useState(0)
const nextPage = () => {  // 下一页
    setPage((oldPage) => {
      console.log("oldPage ",oldPage)
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => { ... }  // 上一页,写法同 nextPage
  
  ...
  <button className='next-btn' onClick={nextPage}>
```



## 不同类型的 Append 

**数组** Append : 

```react 
const [prevState, setState] = useState([]);

// 将 ...prevState 展开, 屁股上加 1 个 'somedata' , 整体合并为一个新数组 newarray
// setState( prevState => newarray ) , newarray 作为最新的 prevState.
setState(prevState => [...prevState, 'somedata'] );
```



**对象** Append

```react
  const [exampleObj, setObject] = useState(
    {masterField: {
        fieldOne: "a",
        fieldTwo: {
           fieldTwoOne: "b"
           fieldTwoTwo: "c"
           }
        }
   });
  
  // 先将 exampleObj 展开, 再在屁股后面加一个字段 masterField2,  2 者用 {} 包裹起来形成新对象
  setExampleState({...exampleObj,  masterField2: {
        fieldOne: "a",
        fieldTwo: {
           fieldTwoOne: "b",
           fieldTwoTwo: "c"
           }
        },
   })


/* 
$ console.log(a) : 
masterField: {
        fieldOne: "a",
        fieldTwo: {
           fieldTwoOne: "b",
           fieldTwoTwo: "c"
           }
        },
  masterField2: {
        fieldOne: "c",
        fieldTwo: {
           fieldTwoOne: "d",
           fieldTwoTwo: "e"
           }
        },
   }
}
*/
```



**对象部分修改 :** 

```react
  const [infoData, setInfoData] = useState({
    major: {
      name: "John Doe",
      age: "24",
      sex: "M",
    },
    minor:{
      id: 4,
      collegeRegion: "south",
    }
  });

  setInfoData((prevState) => ({
      ...prevState,           // prevState 展开, 只想修改  prevState.major
      major: {
        ...prevState.major,   // prevState.major,  再展开
        name: "Tan Long",     // 只想修改  prevState.major 中的 name 
      }
    }));
```

Perhaps : 

```react
  setInfoData((prevState) => ({
      ...prevState,
      major: {
        ...prevState.major,
        name: "Tan Long",
      },
      minor: {
        ...prevState.minor,
        collegeRegion: "northEast"

    }));
```





## callback 函数的参数

useState - 回调函数的参数

**使用场景 **: 

- 如果初始 state **需要通过计算**才能获得( 不能直接 `useState(0) , useState('')`  )，则可以传入一个函数，在函数中计算并返回初始的 state，此函数**只在初始渲染时被调用**

- 该函数参数只会在组件的**初始渲染中起作用**，后续渲染时**会被忽略**。

**语法** :

```react
const [name, setName] = useState(()=>{    
  // 编写计算逻辑    
  return '计算之后的初始值'
  }
)
```

**语法规则**

1. 回调函数 return 出去的值将作为 `name` 的初始值
2. 再次强调 : 回调函数中的逻辑只会在组件初始化的时候执行一次



例子 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-10-074133.png" style="zoom:50%;" />

```react
import { useState } from 'react'

const Counter = (props) => {
  const [count, setCount] = useState(() => {
    return props.count    // 依据传入的参数决定初始值.
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

function App() {
  return (
    <>
      <Counter count={10} />
      <Counter count={20} />
    </>
  )
}
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-10-QQ20220610-154309-HD.gif)





## Example : `...list`

`useState`  是一个函数，它接受一个参数并返回当前状态和允许您更新它的函数。

```react
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export default function App() {
  const [text, setText] = useState("")
  const [list, setList] = useState(["Skill-1","Skill-2","Skill-3"])
  
  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  const handleAdd = (evt) => {
    // 前面定义了数组是 "Skill-1","Skill-2","Skill-3"， 那么这里 setList 进行的是追加而不是替换。
    // 所以为了保证之前的数据还在，先用 ...list 展开之前的数据，再把最新的 text 追加上去。
    setList([...list,text])
    setText("")  // 将输入框清空，
  }

  const handleDel = (index) => {
    console.log(index)
    var newlist= [...list]    // 复制下之前的 list
    newlist.splice(index,1)   // 从 index 处删除一个元素
    setList(newlist)          // 触发 render 界面
  }
  return(
    <div>
      <input onChange={handleChange} value={text}/>
      <button onClick={handleAdd}> Add an item </button>
      <ul>
        {
          list.map((item, index)=>
            <li key={item}>
              {item} 
                <button onClick={() => handleDel(index)}> Del </button>
            </li>
          )
        }
      </ul> 
    {!(list.length) && <div>无待办事项</div>}
    </div>
  )
}
```

初始状态：

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220508210440290.png" alt="image-20220508210440290" style="zoom:50%;" />

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-08-QQ20220508-211055-HD.gif)



------

## Example : `add / Minus `

直接写在标签内部 :  `<button onClick={() => setCount(count + 1)}>`   +1

```React
// 把 minusOne 和 addOne 抽出来写成函数
const App = () => {
  const [count, setCount] = useState(0)
  
  const addOne = () => {
    let value = count + 1
    setCount(value)
  }
  const minusOne = () => {
    let value = count - 1
    setCount(value)
  }
  return (
    <div className='App'>
      <h1>{count} </h1>
      <button onClick={addOne}> Add One </button>
      <button onClick={minusOne}> Minus One </button>
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

如下图：无论是 Minus 还是 add， 都可以对 数字 5 进行操作：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-01-032615.png)



-----

另一个例子（点击，切换显示小猫小狗）：

- `setImage(image === catURL ? dogURL : catURL)`

```react
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const App = () => {
  // declaring state
  // ① useState(url) 传入 image 的当前状态：url
  // ② image 将由 setImage() 更新
  const url = 'https://www.smithsstationah.com/imagebank/eVetSites/Feline/01.jpg'
  const [image, setImage] = useState(url)


  // 在这个函数里调用  setImage(result)
  // 意思就是 把 result 赋值给 image 作为 image 的新状态， 即 image = result。
  const changeAnimal = () => {
    let dogURL =
      'https://static.onecms.io/wp-content/uploads/sites/12/2015/04/dogs-pembroke-welsh-corgi-400x400.jpg'
    let catURL =
      'https://www.smithsstationah.com/imagebank/eVetSites/Feline/01.jpg'
    setImage(image === catURL ? dogURL : catURL)
  }

  return (
    <div className='App'>
      <h1>30 Days Of React</h1>
      <div className='animal'>
        <img src={image} alt='animal' />
      </div>

      <button onClick={changeAnimal} class='btn btn-add'>
        Change
      </button>
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```







# useEffect 

> `useEffect`  是**通用的副效应钩子**，找不到对应的钩子时，就可以用它。

前面提到，**钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应（side effect）。** 

函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都**必须通过 hook引入**。



常见的 Side Effet 类型 :

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）
- localstorage操作



## 执行时机(依赖项控制)

**1. 不写依赖项**

> 组件首次渲染执行一次，以及**不管是哪个状态更改引起组件更新时都会重新执行**
>
> 1. 组件初始渲染
> 2. **组件更新 （不管是哪个状态引起的更新）**

```react
useEffect(()=>{
    console.log('副作用执行了')
})     // 如果不写依赖项, 那么每次组件更新时都会重新执行
```



**2. [] 依赖**

> **组件只在首次渲染时执行一次**
>
> **即使后面组件重新渲染，这个副作用函数也不会再次执行。这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了**。

```jsx
useEffect(()=>{
	 console.log('副作用执行了')
},[])
```



**3. 添加特定依赖项**

> 副作用函数在
>
> 1. 首次渲染时执行，
>
> 2. 在依赖项发生变化时重新执行

```react
    useEffect(() => {    
        console.log('副作用执行了')  
    }, [prop, state]) 
    //  意味着 prop 和 state 只要有一个改变了, 就会触发渲染 .
```

**只要有一个**改变了, 就会触发渲染 .



## 其 return : 清理 Side effect

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()` 允许返回一个函数，在组件卸载时，执行该函数，清理副效应。

如果不需要清理副效应，`useEffect()`就不用返回任何值。

```react
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {  // 返回的东西会在组件卸载时被执行
    subscription.unsubscribe();
  };
}, [props.source]);
```

上面例子中，`useEffect()` 在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。

实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。



----

**清理定时器:**

> 添加副作用函数前：组件虽然已经不显示了，但是定时器依旧在运行

点击 button 会将 flag 设为 false ( 即将  Foo 组件卸载 ) , 一旦组件被销毁，定时器也被清理

```react
import { useEffect, useState } from 'react'

function Foo() {  
    useEffect(() => {   
        const timerId = setInterval(() => {      
            console.log('副作用函数执行了')    
        }, 1000)   
        // 添加清理副租用函数    
        return () => {      
            clearInterval(timerId)    
        }  
    })  
    return <div>Foo</div>
}
function App() {  
    const [flag, setFlag] = useState(true)  
    return (   
        <>      
          <button onClick={() => setFlag(false)}>click</button>      
         {flag ? <Foo/> : null}    
        </>    
    )
}

export default App
```

'







## 多个 Side Effect 

使用`useEffect()`时，有一点需要注意。如果有多个副效应，应该调用多个`useEffect()`，而不应该合并写在一起。

```react
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);
  useEffect(() => {
    const timeoutA = setTimeout(() => setVarA(varA + 1), 1000);
    const timeoutB = setTimeout(() => setVarB(varB + 2), 2000);

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
  };
  }, [varA, varB]);

  return <span>{varA}, {varB}</span>;
}
```



上面的例子是错误的写法，副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个`useEffect()`。

```react
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000);
    return () => clearTimeout(timeout);
  }, [varA]);

  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000);

    return () => clearTimeout(timeout);
  }, [varB]);

  return <span>{varA}, {varB}</span>;
}
```







## Example : `await axios`

下面是一个从远程服务器获取数据的例子。

> `useState()` 的 data 保存 fetch 获取的数据；
>
> `useEffect()`的内有一个 async 函数，用来从服务器异步获取数据。拿到数据用 `setData()` 重新触发组件渲染。
>
> fetch data 只需执行一次，故  `useEffect()`的依赖为 [] 。

```react
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <ul>
      {data.hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```











# useRef



> 小白：师父，React里面的 `Refs` 有什么用啊？
>
> 乐闻：先考你一个问题，现在有一个表单，页面加载完成时第一个 `input` 框自动获取焦点，不需要人为选中，应该怎么实现？
>
> 小白：直接给 `input` 标签加上 `autoFocus` 属性呗，例如 `<input autoFocus="autofocus"/>`
>
> 乐闻：emm，还有其他的实现方式没？
>
> 小白：如果使用 `jquery` 的话就好了，可以直接获取到 `input` 标签实例，然后调用它的 `focus()` 方法就可以实现自动聚焦了。
>
> 乐闻：React 也提供了我们访问 DOM 节点的能力，接下来我详细的跟你说说这个 `refs` 属性。

Refs 提供了一种方式，允许我们访问 DOM 节点 或  React 元素/组件实例。

> 1. DOM节点就是 JSX 里的 `<div>`，`<input>` 等原生标签。
> 2. React 元素即： class 组件、函数组件。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你**需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件**。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

- 举个例子，避免在 `Dialog` 组件里暴露  `open()` 和 `close()` 方法，最好传递 `isOpen` 属性。



## 1. 从 DOM 树中获取内容

开发 React 应用程序时不要接触 DOM，因为 React 有自己的方式来使用虚拟 DOM 操作 DOM。如果我们有兴趣从 DOM 树中获取一些内容，我们可以使用 useRef 钩子。请参阅示例：

```react
import React, { useRef } from 'react'

const App = (props) => {
  
  const ref = useRef(null)
  
  const onClick = () => {
    let content = ref.current.textContent
    alert("content: ", content , "\n", "ref : ",ref)
  }
  return (
    <div className='App'>
      <h1 ref={ref}> How to getting content from the DOM tree</h1>
      <button onClick={onClick}>Getting Content</button>
    </div>
  )
}
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-10-094033.png)



我们要获取元素的真实DOM对象，首先我们需要使用useRef()这个钩子函数获取一个对象，这个对象就是一个容器，React会自动将DOM对象传递到容器中。代码`const divRef = useRef()`就是通过钩子函数在创建这个对象，并将其存储到变量中。

创建对象后，还需要在被获取引用的元素上添加一个ref属性，该属性的值就是刚刚我们所声明的变量，像是这样`ref={divRef}`这句话的意思就是将对象的引用赋值给变量divRef。这两个步骤缺一不可，都处理完了，就可以通过divRef来访问原生DOM对象了。

useRef()返回的是一个普通的JS对象，JS对象中有一个current属性，它指向的便是原生的DOM对象。上例中，如果想访问div的原生DOM对象，只需通过`divRef.current`即可访问，它可以调用DOM对象的各种方法和属性，但还是要再次强调：慎用！

尽量减少在React中操作原生的DOM对象，如果实在非得操作也尽量是那些不会对数据产生影响的操作，像是设置焦点、读取信息等。



```react
    const h1Ref = useRef(); // 创建一个容器
    const [count, setCount] = useState(1);
    // const h1Ref = {current:null};

    const clickHandler = () => {
        // 通过 id 获取  h1
        const header = document.getElementById('header');
        // alert(header);
        // header.innerHTML = '哈哈';

        console.log(h1Ref);
        // alert(h1Ref.current === header);
        h1Ref.current.innerText = '嘻嘻！';
    };

    const countAddHandler = ()=>{
      setCount(prevState => prevState + 1);
    };

    return <div className={'app'}>
        <h1 id="header" ref={h1Ref}>我是标题{count}</h1>
        <button onClick={clickHandler}>1</button>
        <button onClick={countAddHandler}>2</button>
    </div>;
```





## **2. 获取组件实例**

> 函数组件由于没有实例，不能使用 ref 获取，如果想获取组件实例，必须是类组件

`App.js`

```jsx
import { useEffect, useRef } from 'react'

class Foo extends React.Component {  
    sayHi = () => {    
        console.log('say hi')  
    }  
    render(){    
        return <div>Foo</div>  
    }
}

function App() {  
    const h1Foo = useRef(null)  
    useEffect(() => {    
        console.log(h1Foo)  
    }, [])  
    return (    
        <div> <Foo ref={ h1Foo } /></div>  
    )
}
export default App
```

console 输出 : 

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220610172934462.png" alt="image-20220610172934462" style="zoom:50%;" />











## class 里的 Refs

举个栗子，实现 ： 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-02-085818.png)

```react
<script type="text/babel">
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();  
    }
  handleClick() {
    // 使用原生的 DOM API 获取焦点
    this.myRef.current.focus();
  }
  render() {
    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
    return (
      <div>
        <input type="text" ref={this.myRef} />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}
 
ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
</script>
```



实现：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-02-103645.png)

```react
import React, { useRef,Component } from "react"
import ReactDOM from 'react-dom'

class RefsDeme extends Component {  
  constructor(props) {   
     super(props);   
      this.state = {};  
        this.inputRef = React.createRef(); 
  }
  componentWillMount() { console.log("componentWillMount->inputRef:", this.inputRef);}
  componentDidMount() { 
    console.log("componentDidMount->inputRef:", this.inputRef);
    this.inputRef.current.focus();  
  }
  render() {
    return (
      <div>
        我不会获得焦点：<input name="ss" />  <br />
        姓名：        <input ref={this.inputRef} />      
      </div>    
    );  }}
const rootElement = document.getElementById('root')
ReactDOM.render(<RefsDeme />, rootElement)

```



回调函数方式

```react
import React, { useRef,Component } from "react"
import ReactDOM from 'react-dom'

class RefsDeme extends Component {  
  constructor(props) {    
    super(props);    
    this.state = {};    
    this.inputRef = null;  
  } 
  componentWillMount() { } 
  componentDidMount() {    
    this.inputRef.focus();  
  } 
  render() { 
    return (      
    <div>        
      姓名：{" "}        
      <input  ref={(ref) => { this.inputRef = ref; }}  />
    </div>
    );  }}

const rootElement = document.getElementById('root')
ReactDOM.render(<RefsDeme />, rootElement)
```



function 组件

>  因为Function组件不存在 this,所以 function 组件不能通过class组件的方式来操作refs。Function组件使用refs，需要用到 React Hooks。

```react
import React, { useRef, useEffect } from "react";

export default function FunctionRef() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
 return (
    <div>
      FunctionRef: <input ref={inputRef} />
    </div>
  );
}
```





**创建 refs ：**

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性**附加到 React 元素**。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```react
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();  // Ref
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```



**访问 Refs**

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```react
const node = this.myRef.current;
```

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。









### useRef

如何处理不受控制的输入数据。在本节中，我们将使用 useRef 挂钩来获取输入数据或访问 React 应用程序中的任何 DOM 元素。

1. useRef 返回一个可变的 ref 对象
2. 其 `.current` 属性初始化为传递的参数 (initialValue)。
3. initialValue 被赋值给其返回值的` .current`对象
4. ref对象与自建一个` {current：''}`对象的区别是：useRef会在每次渲染时返回**同一个 ref 对象**，即返回的ref对象在组件的整个生命周期内保持不变。自建对象每次渲染时都建立一个新的。
5. ref对象的值发生改变之后，不会触发组件重新渲染。有一个窍门，把它的改变动作放到` useState() `之前。

在下面的示例中，我们将看到如何使用 useRef 挂钩从输入中获取数据并访问 DOM 树中的元素

```react
import React, { useRef } from "react"

export default function App () {
  
  const input_ = useRef()
  const setInputValue = function() {
    input_.current.value = "OurJS:" + Date.now()
  }

  return (
    <div>
      <hr/><h1>useRef</h1>
      <input type="text" ref={input_}/>
      <button onClick={setInputValue}>Set Value:useRef</button>
    </div>
  )
}
```

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220502164520154.png" alt="image-20220502164520154" style="zoom:50%;" />

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220502164536695.png" alt="image-20220502164536695" style="zoom:50%;" />







官网实例：

```js
//useRef 返回一个可变的 ref 对象，
// 其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
const refContainer = useRef(initialValue);
```

一个常见的用例便是命令式地访问子组件：

```react
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

本质上，`useRef` 就像是可以在其 `.current` 属性中保存一个可变值的“盒子”。

你应该熟悉 ref 这一种[访问 DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 的主要方式。如果你将 ref 对象以 `<div ref={myRef} />` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 `.current` 属性设置为相应的 DOM 节点。

然而，`useRef()` 比 `ref` 属性更有用。它可以[很方便地保存任何可变值](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)，其类似于在 class 中使用实例字段的方式。





#### Focus

Using the useRef we can trigger the focus event on input.

```react
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const onClick = () => {
    ref.current.focus()
  }
  return (
    <div className='App'>
      <h1>How to focus on input element useRef</h1>
      <input type='text' ref={ref} />
      <br />
      <button onClick={onClick}>Click to Focus on input</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```





#### Accessing and Styling a DOM element

We can access and style an element from the DOM tree. See the example below:

```react
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const onClick = () => {
    ref.current.style.backgroundColor = '#61dbfb'
    ref.current.style.padding = '50px'
    ref.current.style.textAlign = 'center'
  }
  return (
    <div className='App'>
      <h1 ref={ref}>How to style HTML from the DOM tree using useRef</h1>
      <button onClick={onClick}>Style it</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement
```





**与 createRef 区别**

createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。

因此你可以在 useRef 对象上存放缓存的值。





#### React-refs

先复习下 React 中关于 Refs 相关的知识。

> Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

Refs 在 React 中起初的作用是做到对 Dom 元素的引用，当我们想操作的原生 DOM 元素的时候，我们可以使用 Ref 做到对元素的引用。

```react
import { useRef } from "react";

export default function App() {
  let ref = useRef<HTMLInputElement>(null);
  let handleSubmit = () => {
    console.log(ref.current?.value)
  }
  
  return (
    <div className="App">
      <input ref={ref} />
      <button onClick={handleSubmit} >提交</button>
    </div>
  );
}
```

在上面的例子中，我们在点击提交按钮的时候获取 `input` 元素的值。 

在 React Hook 中，我们可以使用 useRef 来创建一个新的 Ref 对象，**Ref 对象包含一个 current 字段**，我们可以在 useRef 函数的第一个参数中传参做为 current 字段的初始值。

Ref 对象的一个特性就是，在函数组件的各次渲染中都保持一致，访问到的 current 字段都是最新的。`useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。

**需要注意的是，修改 Ref 对象中 current 的值并不会引发组件的重新渲染。**

```react
import { useRef } from "react";

export default function MyButton() {
  const countRef = useRef(0)

  const handleClick = () => {
    countRef.current = countRef.current + 1
  };

  return <button onClick={handleClick}>Click me {countRef.current}</button>;
}
```

实际运行就会发现，在点击事件中我们修改了 `countRef.current` 的值，尽管该值确实发生了变化，可是并不会触发组件的重新渲染。

> 使用 ` useState()  ` 产生的变量值发生变化后，是会触发组件重新渲染的。



**其实你可以把函数组件的 ref 对象看作类似类组件实例属性的存在**。于是函数组件的 ref 对象获得了全新的能力：模拟类组件实例属性。

如果你想在函数组件声明一个每次渲染都不改变的对象，且修改这个对象，不会引发组件的重新渲染，Refs 是很好的一个选择。







# useContext

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但此种用法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树逐层传递 props。

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

使用 context, 我们可以避免通过中间元素传递 props：

`Context`提供了一个**局部的全局作用域**，使用 Context 则无需再手动的逐层传递`props`。



如下，组件数的结构是：

```
|_App
   |_Toolbar
      |_ ThemedButton

App 指定了 ”theme="dark" “ 后， 这个信息需要一级一级向下传递，如下：
```



```React
// 错误代码
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。  
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，  
  // 因为必须将这个值层层传递所有组件。  
  return (    
    <div>
      <ThemedButton theme={props.theme} />
    </div>  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用 context, 我们可以避免通过中间元素传递 props。



## 类组件 - createContext

完整代码：

```react
//第一步就是使用 React Context API，在组件外部建立一个 Context。 （“light”为默认值）
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用 Provider 来将当前的 theme 传递给以下的组件树（所有子组件都会看到）。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。 传下去！
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```



## Hook  - useContext

1. 外部创建一个 Store 存储, 作为容器
2. 根组件中定义要向下传递的参数状态 ( 作为 Provider 提供 value )
3. 下层的组件使用 `const  `  ( 作为 Consumer 使用 value)

```react
├─ App.js   > 作为 Provider 向下提供 value,  useContext 可以向子树组件传递状态, 
├─ Store
│   └── cart-context.js  > 作为容器, 定义在其内存储的数据
├─ components
│   └── Cart.js
│      └── Cart.js   > 作为子组件, 使用
```



```react
// cart-context.js
import React from 'react';
const CartContext = React.createContext({   // 声明一下就好, 真正的数据在 App.js 里向下传递
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    addItem: () => { },
    removeItem: () => { },
    clearCart: ()=>{ }
});
export default CartContext;


// App.js
import CartContext from "./store/cart-context";
    ...
    return (
      // 把要往下传递的值在这里定义
      // 后面的子组件会根据就近原则原则合适的 Store 存储内容
      <CartContext.Provider value={{...cartData, addItem, removeItem, clearCart}}>
          <div>
              <FilterMeals onFilter={filterHandler}/>
              <Meals
                  mealsData={mealsData}
              />
              <Cart/>

          </div>
      </CartContext.Provider>
    );


// Cart.js
// 将导入的 CartContext 放入 useContext :  useContext(CartContext) 勾住
import CartContext from "../../store/cart-context";
const Cart = () => {  // 购物车组件
    const ctx = useContext(CartContext);
    if(ctx.totalAmount === 0){ ...  }   // 购物车已经被清空
    ...
}
```







# useGlobalContext ?? ?? 

上面讲过, useContext 主要是组件间的同态变化







# useReducer

https://www.lilichao.com/index.php/2022/05/13/reducer/

useReducer 是 useState的一个替代方案。

>  在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，

什么时候使用 useReducer：

1、如果 state 是一个数组或者对象，

2、如果 state 变化很复杂，经常一个操作需要修改很多 state，比如：[login](https://www.zhihu.com/search?q=login&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"443296316"}) 登陆到时候就可以用 useReducer。



## 计数器实例

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-22-055517.png" alt="image-20220622135507527" style="zoom:50%;" />

```react
import React, {useReducer, useState} from 'react';


// 为了避免 reducer 重复创建，通常 reducer 会定义到组件外部
const countReducer = (state, action) => {
    // 可以根据 action 中不同 type 来执行不同的操作
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return state;
    }
};

const App = () => {
        /* useReducer(reducer, initialArg, init)
        *   参数：
        *     reducer : reducer 是一个"整合函数"
        *         对于我们当前 state 的所有操作都应该在该函数中定义
        *         该函数的返回值，会成为 state 的新值
        *       关键: reducer 在执行时，会收到两个参数：
        *          1. state: 当前 state 的状态值
        *          2. action: 对象, 在这个对象中会存储 dispatch 所发送的指令
        *       initialArg : 是 state的初始值
        *   返回值： 和 useState 一样, 返回一个数组 [] ：
        *           第一个参数，返回最新的 state ( reducer 操作后的值) 
        *           第二个参数，返回 state 修改的 dispatcher (派发器)
        *              通过派发器可以发送操作 state 的命令
        *              具体的修改行为将会由另外一个函数(reducer)执行
        *           如上例, countDispatch 是领导， countReducer 是具体干活的
        * */
        const [count, countDispatch] = useReducer(countReducer, 1);

        const addHandler = () => {
            countDispatch({type: 'ADD'});  // 增加 count的值， 逻辑在 Reducer 里实现
        };

        const subHandler = () => {
            countDispatch({type: 'SUB'});  // 减少 count的值
        };
        /* 想上面这样, 就把 count 的状态 和 相关的操作都封装到了 Reducer 里面. */

        return (
            <div style={{fontSize: 30, width: 200, height: 200, margin: '100px auto', textAlign: 'center'}}>
                <button onClick={subHandler}>减少</button>
                {count}
                <button onClick={addHandler}>增加</button>

            </div>
        );
    }
;

export default App;

```



```react
// 不用 Reducer 的时候
// count 状态写了一个 useState, 但是后面还有很多函数需要用到 count 这个变量, 都放在外面就不是很方便 .
// 所以像上面一样, 我们将这个变量 及其 对应方法 , 都放到 Reducer 里面去定义

const [count, setCount] = useState(1);

const addHandler = () => {
    setCount(prevState => prevState + 1);
};

const subHandler = () => {
    setCount(prevState => prevState - 1);
};
```





## 汉堡 App 实例

三大步骤: 

一 : 在 `App.js` 定义 useReducer 和 Reducer  中具体执行的操作函数 / action 类型

二 : useContext 顺便定义下  毕竟要把 Reducer 中的东西向下传递

三 :  子组件中 , useContext 获取到父组件传递的状态 :  cartDispatch ( useReducer 的指挥官 )  , 通过 cartDispatch 指挥 Reducer 干活



------

### 一 :  `App.js` 定义 useReducer

要点: 

1. `const cartReducer = (state, action)`  接收 2 个参数: 
   1. state: 当前 state 的状态值
   2. action: 是个对象, 在这个对象中会存储 dispatch 所发送的指令
2. `const [cartData, cartDispatch] = useReducer( cartReducer, {...}` : 
   1. cartDispatch 是发号施令的 , cartReducer 是函数体, 是具体干活的
   2. `{...}` 是传给 `cartData` 的初始值 
   3. cartReducer 要干的活 , 可以通过 `action` 的 type 字段定义 , 然后用 switch 派发
3. `<CartContext.Provider value={{...cartData, cartDispatch}}>`
   1. 将 `cartDispatch` 传递给子组件

```react
// App.js
const cartReducer = (state, action) => {
    // 复制购物车， 这里的 action 接收 2 个参数 { type: (ADD|REMOVE|CLEAR), meal: '具体添加或删除的汉堡 item'}
    const newCart = {...state};

    switch (action.type){
        default:
            return state;
        case 'ADD':
            // 增加一个事物到购物车里，我们需要知道具体是哪个食物： 所以需要向 action 对象里传入 meal。
            if (newCart.items.indexOf(action.meal) === -1) {
                newCart.items.push(action.meal);
                action.meal.amount = 1;
            } else {
                action.meal.amount += 1;
            }
            newCart.totalAmount += 1;
            newCart.totalPrice += action.meal.price;
            return newCart;
        case 'REMOVE':
            action.meal.amount -= 1;
            if (action.meal.amount === 0) {
                newCart.items.splice(newCart.items.indexOf(action.meal), 1);
            }
            newCart.totalAmount -= 1;
            newCart.totalPrice -= action.meal.price;
            return newCart;
        case 'CLEAR':
            newCart.items.forEach(item => delete item.amount);
            newCart.items = [];
            newCart.totalAmount = 0;
            newCart.totalPrice = 0;
            return newCart;
    }
};



const App = () => {
    // state Reducer， 用来保存购物车的状态数据
    const [cartData, cartDispatch] = useReducer( cartReducer, {
        items: [],      // 1. 商品 [] items
        totalAmount: 0, // 2. 商品总数（totalAmount）
        totalPrice: 0   // 3. 商品总价（totalPrice） 
    })
    ...
    return (
      // <CartContext.Provider value={{...cartData, addItem, removeItem, clearCart}}>
      <CartContext.Provider value={{...cartData, cartDispatch}}>

```



-----

### 二 : useContext 向下传递 Reducer 

这一步比较简单 : 

- items / totalAmount /  totalPrice  都是子组件中需要用的的东西  ,只需要在这里说明下 , `App.js` 的 Reducer  已经传过来了具体的操作 ;
- cartDispatch 只需要在这里定义下 , `App.js` 的 Reducer  已经传过来了具体的用法 

```react
import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    cartDispatch: () => {}  // 核心
});

export default CartContext;
```



### 三 : 子组件调用 `cartDispatch` : 

要点 : 

1. ctx 接收 `useContext()` 传递过来的状态 ;
2. `{type: 'ADD', meal: props.meal}`  就是传到 Reducer 里的 action 对象 ; 
3. `ctx.cartDispatch` 开始指挥 `cartReducer` 干活 : 
   1. `switch (action.type) ` 看看 `'ADD' / 'REMOVE' `这些操作派发到哪里 
   2. `action.meal`  是购物车对具体的汉堡的操作 , 是汉堡个数 + 1 , 还是个数 -1 

```react 
// ./UI/Counter/Counter.js

import CartContext from "../../../store/cart-context";
const Counter = (props) => {
    const ctx = useContext(CartContext);  // 获取父组件传过来的 useContext
    
    // 添加购物车的函数
    const addButtonHandler = () => {
        ctx.cartDispatch({type: 'ADD', meal: props.meal});
    };

    // 减少食物个数的函数
    const subButtonHandler = () => {
        ctx.cartDispatch({type: 'REMOVE', meal: props.meal});
    };
```





## 其他例子

```react
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}> - </button>
      <button onClick={() => dispatch({type: 'increment'})}> + </button>
    </>
  );
}
```



```react
const initialState = { name: "Bob", occupation: "builder" };
const [state, updateState] = useReducer(
  (state, updates) => (
    {
    ...state,
    ...updates,
    }
  ),
  initialState
);
```





useContext 和 useReducer 使用：将 `dispatch` 函数作为 useContext 的 value，共享给页面的子组件， useReducer 结合 useCountext，通过 context 把 dispatch 函数提供给组件树中的所有组件使用，而不是通过 props 添加回调函数到方式一层层传递。所以如果页面组件层级比较深，并且需要子组件触发 state 的变化，可以考虑 useContext + useReducer。

> dispatch 和 Redux 有关

不同于 `useState` 返回函数只能对值进行设置，`useReducer` 返回的 `dispatch` (发送 / 派遣) 函数可以触发 `reducer` 函数的执行, 在 `reducer` 函数中对值的设置可以有更精细化的操作。我们还可以在执行 `dispatch` 函数的时候传入 `action` 对象，`reduer` 函数可以根据 `action` 对象的值进行相对应的操作。

如下是一段 typescript 代码 : 

```typescript
import { useReducer } from "react";

export default function App() {
  const [value, dispatch] = useReducer(
    (state = 0, action: { type: "add" | "min" }) => {
      switch (action.type) {
        case "add":
          state++;
          break;
        case "min":
          state--;
          break;
      }
      return state;
    },
    0,
    (state) => {
      return state + 1;
    }
  );
  return (
    <>
      <div>
        {value}
        <button onClick={() => dispatch({ type: "add" })}>加</button>
        <button onClick={() => dispatch({ type: "min" })}>减</button>
      </div>
    </>
  );
}
```



# useMemo  (Memory)

## React.memo()

React组件会在两种情况下发生重新渲染。

- 当组件自身的state发生变化时。

- 当组件的父组件重新渲染时。

可以理解 , 第二种情况并不是总是那么必要。



如果有一个组件, 没有依赖父组件的 State , 这个组件的**重新渲染是完全没有必要的**。

React为我们提供了一个方法 `React.memo()`。该方法是一个高阶函数，用来根据组件的 props 对组件进行缓存

**当一个组件的父组件重新渲染，而子组件的 props 没有发生变化时，它会直接将缓存中的组件渲染结果返回 ,  而不是再次触发子组件的重新渲染**，这样一来就大大的降低了子组件重新渲染的次数。

`React.memo` 接受一个组件作为参数 , 所以说是高阶组件 ; 

实例: 

- 使用 `export default React.memo(B);` 

```react
const B = () => {
    console.log('B渲染');
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

export default React.memo(B);
```

进行 React.memo 包装后 , 返回的B组件就增加了缓存功能，只有当 B 组件的 props 属性发生变化时，才会触发组件的重新渲染。

`memo` 只会根据 `props` 判断是否需要重新渲染，和 state 和 context 无关，state 或 context 发生变化时，组件依然会正常的进行重新渲染。



## useMemo

useMemo和useCallback十分相似，useCallback用来缓存函数对象，useMemo用来缓存函数的执行结果。在组件中，会有一些函数具有十分的复杂的逻辑，执行速度比较慢。闭了避免这些执行速度慢的函数返回执行，可以通过useMemo来缓存它们的执行结果，像是这样：

```
const result = useMemo(()=>{
    return 复杂逻辑函数();
},[依赖项])
```

useMemo中的函数会在依赖项发生变化时执行，注意！是执行，这点和useCallback不同，useCallback是创建。执行后返回执行结果，如果依赖项不发生变化，则一直会返回上次的结果，不会再执行函数。这样一来就避免复杂逻辑的重复执行。





# **useCallback**

```react
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
/*    参数 1. 回调函数 cb
*     参数 2. 依赖数组 deps
*        - 当依赖数组中的变量发生变化时，回调函数才会重新创建
*        - 如果不指定依赖数组，回调函数每次都会重新创建
*        - 一定要将回调函数中使用到的所有变量都设置到依赖数组中 (除了 setState 函数本身  */
```

这 React 官方为 `useCallback` 配的例子, 它解释了 `useCallback` 的基本工作原理:

1. 在一个 FC (函数组件) 中, 包装一个函数, 这个函数会被"记住", 如果没有别的原因, 这个函数在 FC 多次被调用的过程中是不变的 (也就是 react hook 的状态) 
2. 如果  `useCallback(cb, deps)`  的 deps 列表中有任意一项发生了**变化 ** (对于 primitive type 而言, 是值的变化; 对于 object 而言, 是引用的变化/内存地址的变化),  则 `memoizedCallback` 会被更新, 并且在 FC 的下一次渲染中使用**新的副本.**



我们想象这样的场景: 你有一个组件, 它包含两部分:

1. 一个从 0 开始的计时器, 每过 1 秒, 你需要将其更新, 并将它的值展示出来.
2. 一个输入框 input, 你要将其做成响应式的(reactive), 即, 它的值来自于一个 stateful value, 且当你对它输入新的内容时, 其值能够反应到 stateful value 中.

我们将这个 input 组件表达如下:

```react
const SimpleInput = () => {
    const [clock, setClock] = React.useState(0);
    const [textValue, setTextValue] = React.useState('');

    React.useEffect(() => {
        const timer = setInterval(() => {
            setClock(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <>
            <p>time counter: {clock}</p>
            <input
                value={textValue}
                onChange={(domEvt) => {
                    setTextValue(domEvt.target.value);
                }}
                placeholder="text value"
            />
        </>
    )
}
```



问题在于: 当 `<SimpleInput /> `重新渲染(函数体被从头执行一遍),  每次  `<input /> `的 property  `onChange` 都会得到一个全新的回调函数: 

```js
(e) => { setTextValue(e.target.value); }
```

我们并不担心创建这样一个回调函数的开销, 它微乎其微 : 

> 在这个例子中, 每过 1s , `<SimpleInput />`就会因为 `setClock`被调用而发生重新渲染, 继而 `<input onChange />`会得到一个全新的`onChange` 值, 而这个 `onChange` 的变化可能会导致 `<input />`内部发生一些计算. 
>
> 但实际上, `onChange`做的事一直不变: 从用户的输入中获取最新的值, 更新给 `textValue`. **这一动作不受外界任何变化影响, 尤其是, 这个回调函数内部没有依赖任何其它的外部有状态变量**.

**假如** `<input />` 会因为 onChange的变化而在内部产生巨大的重新计算, 而 `onChange` 要做的事又始终不变, 则这样的重新计算是**巨大的浪费**.

所以, 为了尽可能避免 `<input />`产生不必要的重新渲染, 对于 `onTextChange`这个其实永远不会变化其执行内容的函数而言, 我们可以用 `useCallback` 将其包裹起来:

```react
const SimpleInput = () => {
    const [clock, setClock] = React.useState(0);
    const [textValue, setTextValue] = React.useState('');

    const onTextChange = React.useCallback((domEvt) => {
        setTextValue(domEvt.target.value);
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setClock(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <>
            <p>time counter: {clock}</p>
            <input
                value={textValue}
                onChange={onTextChange}
                placeholder="text value"
            />
        </>
    )
}
```

`React.memo` 和 `React.useCallback` 一定记得需要配对使用，缺了一个都可能导致性能不升反“降”，毕竟无意义的浅比较也是要消耗那么一点点点的性能。





-----

useMemo 和 useCallback 十分相似，useCallback用来缓存函数对象，useMemo用来缓存函数的执行结果。

在组件中，会有一些函数具有十分的复杂的逻辑，执行速度比较慢。闭了避免这些执行速度慢的函数返回执行，可以通过useMemo来缓存它们的执行结果，像是这样：

```react
const result = useMemo(()=>{
    return 复杂逻辑函数();
},[依赖项])
```

useMemo中的函数会在依赖项发生变化时执行，注意！是执行，这点和useCallback不同，useCallback是创建。执行后返回执行结果，如果依赖项不发生变化，则一直会返回上次的结果，不会再执行函数。这样一来就避免复杂逻辑的重复执行。



-----



把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

> 没看懂吧, 没关系



我们先来看一个简单的例子。 这个是一个子组件，接受父类的一个 `fn` 方法并展示其按钮。

```javascript
const ChildComponent = memo(function (props) {
  console.log('child render!')
  return <Button onClick={props.fn}> showTime</Button>
})
```

> **注意：** 这里的 `memo` 也是一个 `Hooks` , 详情请见 [Hook API 索引 – React (reactjs.org)](https://link.segmentfault.com/?enc=NiecLvr8LdnOswoUv2kOzA%3D%3D.PASJaVs%2B2jcv902jDuoE4ulhGSSYG2wNDETsdXt8wfF7RVjsIOYsY2ZZyIPVTaMkqa2Fu026orHwrZ2wNF7bmQ%3D%3D)



这是一个父组件，里面有一个计数器，一个数字增加按钮，和这个子组件。

```react
function Main() {
  const [count, setcount] = useState(0)

  const ShowTime = () => {
    console.log('now time :' + new Date())
  }

  return (
   ...<Row>
        <Title>index：{count}</Title>
        <Button onClick={() => setcount(count + 1)}>increase</Button>
        <ChildComponent fn={ShowTime} />
   ... </Row>
  )
}
```

可以看到，在点击 `increase` 按钮的时候，`count` 发生了增加，这是正常且合理的。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-26-145732.jpg" width=20%>

但是这个时候我们打开我们的浏览器控制台，就会发现子组件 `ChildComponent` 在不停的 `render` 。

这是不合理的，对于我们来说，子组件应该只受 `childname` 该参数的影响，如果该参数函数 `fn` 没发生改变，我们就不应该去 `render` 。

> **注意：** 这个地方子组件不停 `render` 的原因在于，**这个 `ShowTime` 方法在不停的重新创建**，然后导致传给子组件的 `props` 其实是不一样的，因此导致不停 `render`



这个时候我们就用到了 `useCallback` 。



```react
function Main() {
  const [count, setcount] = useState(0)

  const useMemoryCallback = useCallback(() => {
    console.log('now time :' + new Date())
  }, [])

  return (
    <Row
      style={{
        'flex-direction': 'column',
        marginLeft: '10px',
      }}
    >
      <Col>
        <Title>index：{count}</Title>
      </Col>
      <Col>
        <Button onClick={() => setcount(count + 1)}>increase</Button>
      </Col>
      <Col>
        <ChildComponent fn={useMemoryCallback} />
      </Col>
    </Row>
  )
}
```







# Custom Hooks

可以在可用的 React 钩子之上制作自定义钩子。

例如当我们获取数据时，我们使用 fetch 或 axios 发送 HTTP 请求并使用 useEffect 挂钩来管理 React 生命周期。让我们在 useEffect 和 useState 之上构建 useFetch 自定义钩子。

```javascript
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);  
  return [loading, person];
};
```

上面代码中，`usePerson()`就是一个自定义的 Hook。

Person 组件就改用这个新的钩子，引入封装的逻辑。

```javascript
const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```











# ...Examples

## Fetching Data Using Hooks

前面 fetch data，我们使用的是 fetch 和 axios 

在 **useEffect** hook 中，我们不必单独使用 componentDidMount 生命周期来  fetch data 。 useEffect 包含了 React 生命周期方法（mounting, updating and unmounting）。

`{国家}` 接口数据如下： 

- 乌干达 🇺🇬
- 国旗 url 
- 人口 （population ：3 ）

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-01-130856.png)



`useState()`生成一个状态变量（`data`），保存 fetch 获取的数据；`useEffect()`的副效应函数内部有一个 async 函数，用来从服务器异步获取数据。拿到数据以后，再用 `setData()` 触发组件的重新渲染。

由于获取数据只需要执行一次，所以下例的 `useEffect()`的第二个参数为一个空数组。

```react
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Country = ({ country: { name, flags, population } }) => {
  // 上面解包的 country 没看到用处，但删掉又会报错 ....
  // img 的 alt ：alt specifies an alternate text for an image, if the image cannot be displayed.
  return (
    <div className='country'>
      <div className='country_flag'>
        <img src={flags.png} alt={name} width='4%' />
      </div>
      <h3 className='country_name'>{name.common.toUpperCase()}</h3>
      <div class='country_text'>
        <p> <span> Population: </span>
          {population} </p> <br />
      </div>
    </div>
  )
}

const App = (props) => {
  const [data, setData] = useState([])
  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const url = 'https://restcountries.com/v3.1/all'  
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='App'>
      <h4>Fetching Data Using Hook</h4>
      <div>
        <p>There are {data.length} countries in the api</p>
        <div className='countries-wrapper'>
          {data.map((country) => (
            <Country country={country} />
          ))}
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

![image-20220501211712917](data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1528 522"></svg>)



## Form Using React Hooks

```react
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // '' 是初始值
  // 利用 setFirstName 函数去改变 firstName
  const [firstName, setFirstName] = useState('')
  
  // e.target.value 是输入框中的用户键入内容
  const handleChange = (e) => {
    const value = e.target.value
    setFirstName(value)
  }
  return (
    // onChange: 一旦输入框内的内容改变，就调用 handleChange 去 setFirstName(value)
    <div className='App'>
      <label htmlFor='firstName'>First Name: </label>
      <input
        type='text'
        id='firstName'
        name='firstName'
        placeholder='First Name'
        value={firstName}
        onChange={handleChange}
      />
      <h1>{firstName}</h1>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220501134959914.png" alt="image-20220501134959914" style="zoom:50%;" />



```react
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const initialState = {
    Name: '',
    country: '',
  }
  const [formData, setData] = useState(initialState)

  // 假设 Name 和 Country 现在的值： { Mike , China }
  // 然后在 Name <input> 里给一些变化：输入 "Mike Jakson", 此时 Onchange 会调用下面的函数。
  // 因为 Country 没有改变，所以不需要更新。
  // e.target 解包为 { 'Name','Mike Jakson' } ， 传入 ...formData 进行更新
  // 更新内容为 [Name]: value 即 ['Name']: 'Mike Jakson'
  const onChange = (e) => {
    // 打印 e.target : <input type="text" name="Name" .. value="Mike Jakson">
    // 打印 name, value :  Name Mike Jakson
    const { name, value } = e.target
    // > ... 是 es6 中出现的扩展运算符，作用是遍历对象能访问到的所有属性，将其放入当前对象中
    // > 这里就是 formData 的 2 个属性： { Name, country } 放到当前对象里面。
    // 然后 [name]: value } 对符合的 formData 进行更新。
    setData({ ...formData, [name]: value })
  }
  const onSubmit = (e) => {
    /*  阻止表单的默认行为，比如点击 submit 后刷新页面。
     stops the default behavior of form element, specifically refreshing of page */
    e.preventDefault()
    /* 在这里写代码和后端交互 write codes to connect backend   */
    console.log(formData)
  }

  // accessing the state value by destrutcturing the state
  const { Name, country } = formData
  return (
    <div className='App'>
      <h3>Add Student</h3>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            name='Name'
            placeholder='Name...'
            value={Name}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type='text'
            name='country'
            placeholder='Country'
            value={country}
            onChange={onChange}
          />
        </div>
        <button class='btn btn-success'>Submit</button>
      </form>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-01-060628.png" style="zoom:50%;" />



**嵌套对象的  useState & 多种数据类型的 useState **（ 仔细看代码）

```react
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const options = [
  { value: '', label: '-- Select Country--', },
  { value: 'Finland',label: 'Finland',  },
  { value: 'Sweden', label: 'Sweden', },
]

// mapping the options to list(array) of JSX options
// 制作下拉框
const selectOptions = options.map(({ value, label }) => (
  <option key={label} value={value}>  {'   '}  {label}  </option>
))

const App = (props) => {
  const initialState = {
    Name: '',  country: '',   file: '',   bio: '',
    skills: {
      html: false,
      css: false,
      javascript: false,
    },
  }
  const [formData, setFormData] = useState(initialState)

  const onChange = (e) => {
    // 1. 对于多选(checked) ：
    //   选中时即触发，比如勾选 html， 触发 Onchange, 传入  e.target  :
    //     e.target.checked = true
    //     e.target.name = html
    //   如果取消选中，则 e.target.checked 返回 false

    // 2. 对于 Files：
    //   上传的内容存储在  e.target.files 里，
    //   打印 e.target.files[0] : File {name: '爱欲之死.mobi', lastModified: 1651.., lastModifiedDate: 2022 23:27:02..., size: 343218 ..
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {  // 多选 (checkbox)
      setFormData({
        ...formData,
        skills: { ...formData.skills, [name]: checked },
      })
    } else if (type === 'file') {  // 文件 (file)
      setFormData({ ...formData, [name]: e.target.files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { Name, country, file, skills, } = formData

    const formattedSkills = []
    for (const vle in skills) {
      console.log(vle)
      if (skills[vle]) {    // if true ,就添加到 list 里面。
        formattedSkills.push(vle.toUpperCase())
      }
    }
    const data = {   Name, country, bio, file, skills: formattedSkills,
    }
    console.log(data)
  }

  // accessing(访问) the initial State 
  const { Name, country, bio, } = formData
  return (
    <div className='App'>
      <h3> Add Student</h3>
      <form onSubmit={onSubmit}>
          <label htmlFor='Name'> Name </label>
            <input type='text' id='Name' name='Name'
              value={Name}
              onChange={onChange}
              placeholder='First Name' />

          <div>
            <label htmlFor='country'>Country</label> <br />
            <select name='country' id='country' value={country} onChange={onChange} > 
              {selectOptions} </select></div>

        <p>Select your skills</p>
          <div> <input type='checkbox' id='html' name='html' onChange={onChange} />
            <label htmlFor='html'> HTML</label>  </div>
          <div> <input type='checkbox' id='css' name='css' onChange={onChange} />
            <label htmlFor='css'> CSS</label> </div>
          <div> <input type='checkbox' id='javascript'  name='javascript'  onChange={onChange}  />
            <label htmlFor='javascript'> JavaScript </label> </div>
        
        <div>
          <label htmlFor='bio'>Bio</label> <br />
          <textarea id='bio'  name='bio'  value={bio}   onChange={onChange}  cols='120' rows='10'
            placeholder='Write about yourself ...' />  </div>
        <div> <input type='file' name='file' onChange={onChange} />  </div>
        <div> <button>Submit</button>  </div>
      </form>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

效果如下：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-01-072431.png)





**数据验证**：

> `<input type="email">` 自带检查
>
> `type='number' ` 也是可以限制类型为数字
>
> onBlur 事件已用于检查输入未聚焦（focused）时的有效性。

```react
  ...
  const onBlur = (e) => {
    const { name } = e.target
    setFormData({ ...formData, touched: { ...formData.touched, [name]: true } })
  }
  const validate = () => {
    // Object to collect error feedback and to display on the form
    const errors = {
      firstName: '',
    }

    if (
      (formData.touched.firstName && formData.firstName.length < 3) ||
      (formData.touched.firstName && formData.firstName.length > 12)
    ) {
      errors.firstName = 'First name must be between 2 and 12'
    }
    return errors
  }

  ...
  
  const errors = validate()

  return (
    <div className='App'>
        ... 
            <input
              ...
              onChange={onChange}
              onBlur={onBlur}
              placeholder='First Name'
            />
            {errors.firstName &&  <small>{errors.firstName}</small>}
          </div>
     .... 
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-01-073028.png" style="zoom:50%;" />



Blur的作用：

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220501153819922.png" alt="image-20220501153819922" style="zoom:50%;" />







