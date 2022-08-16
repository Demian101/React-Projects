



## 4 张动图解释为什么（什么时候）使用 Redux

> 过早优化是万恶之源 —— Donald Knuth

本文描述了**什么时候**开始使用 Redux。作者描述了在构建一个真实 React APP 时，从没有使用 Redux 到使用 Redux 的过程以及收获。

首先，**并不是所有的 React 应用程序都需要使用 Redux**。事实上，大多数非常简单的 React 应用程序根本不能从 Redux 中受益。

### 第 1 天

使用 React 本地组件状态

React 使用[单向数据流](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)，这意味着父组件把自身的状态作为属性传递给子组件。

![when-do-i-know-im-ready-for-redux-1.gif](https://github.com/dev-reading/fe/raw/master/assets/when-do-i-know-im-ready-for-redux-1.gif)

### 第 5 天

随着添加更多的功能，**非父子**组件之间需要**共享**一些状态。

我们通过[提升状态](https://reactjs.org/docs/lifting-state-up.html)来解决这个问题。

这意味着我们将状态（和改变这个状态的函数）**提升到最接近的祖先**（Container Component）。我们将这些函数绑定到容器组件，并将它们作为属性向下传递。这意味着子组件可以触发其父组件中的状态更改，这将**更新树中的所有其他组件**。

![when-do-i-know-im-ready-for-redux-2.gif](https://github.com/dev-reading/fe/raw/master/assets/when-do-i-know-im-ready-for-redux-2.gif)

### 第 20 天

随着添加了更多的功能和组件，我们的应用程序状态流程开始看起来像这样...

![when-do-i-know-im-ready-for-redux-3.gif](https://github.com/dev-reading/fe/raw/master/assets/when-do-i-know-im-ready-for-redux-3.gif)

### 第 n 天

如果您开始遇到上述某些问题，则可能意味着您应该使用 Redux 了。





当我们使用 Redux 后，状态变成了这样：

![when-do-i-know-im-ready-for-redux-4.gif](https://github.com/dev-reading/fe/raw/master/assets/when-do-i-know-im-ready-for-redux-4.gif)

如果您的应用符合以下某些条件，那么我认为应该立即使用 Redux。

- UI 可以根据应用程序状态显着变化
- 并不总是以一种线性的，单向的方式流动
- 许多不相关的组件以相同的方式更新状态
- 状态树并不简单
- 状态以许多不同的方式更新
- 您需要能够撤消以前的用户操作





## Flux与Redux

Flux 是一种架构思想，专门解决软件的结构问题。它跟 MVC 架构是同一类东西，但是更加简单和 清晰。





Facebook Flux 是用来构建客户端Web应用的应用架构。它利用单向数据流的方式来组合React 中的视图组件。它更像一个模式而不是一个正式的框架，开发者不需要太多的新代码 就可以快 速的上手Flux。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-20-135814.png" style="zoom:40%;" />

Redux 最主要是用作应用状态的管理。简言之，Redux 用一个单独的常量状态树 (state对象) 保存这一整个应用的状态，这个对象不能直接被改变。当一些数据变化了，一个新的对象就会被创建 ( 使用actions 和 reducers)，这 样就可以进行数据追踪，实现时光旅行。



**redux** 介绍及设计和使用的三大原则

- state 以单一对象存储在 store 对象中
- state只读 (每次都返回一个新的对象)
- 使用纯函数 `reducer` 执行 state 更新





# Redux  /rēˈdəks/

## QA 

**容器**

状态容器即用来存储状态的容器。状态多了，自然需要一个东西来存储，但是容器的功能却不是仅仅能存储状态，它实则是一个状态的管理器，除了存储状态外，它还可以用来对state进行查询、修改等所有操作。（编程语言中容器几乎都是这个意思，其作用无非就是对某个东西进行增删改查）

----

**可预测（Predictable）**

可预测指我们在对state进行各种操作时，其结果是一定的。即以相同的顺序对state执行相同的操作会得到相同的结果。简单来说，Redux中对状态所有的操作都封装到了容器内部，外部只能通过调用容器提供的方法来操作state，而不能直接修改state。这就意味着外部对state的操作都被容器所限制，对state的操作都在容器的掌控之中，也就是可预测。

总的来说，**Redux是一个稳定、安全的状态管理器**。

-----

**useReducer ?  useContext ?**

问：不对啊？React中不是已经有state了吗？为什么还要整出一个Redux来作为状态管理器呢？

答：state应付简单值还可以，如果值比较复杂的话并不是很方便。

问：复杂值可以用useReducer嘛！

答：的确可以啊！但无论是 state 还是 useReducer ，state 在传递起来还是不方便，自上至下一层一层的传递并不方便啊！

问：那不是还有context吗？

答：的确使用context可以解决state的传递的问题，但依然是简单的数据尚可，如果数据结构过于复杂会使得context变得异常的庞大，不方便维护。

Redux可以理解为是reducer和context的结合体，使用Redux即可管理复杂的state，又可以在不同的组件间方便的共享传递state。

当然，Redux主要使用场景依然是大型应用，大型应用中状态比较复杂，如果只是使用reducer和context，开发起来并不是那么的便利，此时一个有一个功能强大的状态管理器就变得尤为的重要。





## 在网页中直接使用

我们先来在网页中使用以下Redux，在网页中使用Redux就像使用jQuery似的，直接在网页中引入Redux的库文件即可：

```
<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
```

网页中我们实现一个简单的计数器功能，页面长成这样：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220520223449874.png)

```html
<button id="btn01">减少</button>
<span id="counter">1</span>
<button id="btn02">增加</button>

// 不使用Redux：

const btn01 = document.getElementById('btn01');
const btn02 = document.getElementById('btn02');
const counterSpan = document.getElementById('counter');

let count = 1;

btn01.addEventListener('click', ()=>{
   count--;
   counterSpan.innerText = count;
});

btn02.addEventListener('click', ()=>{
   count++;
   counterSpan.innerText = count;
});
```



-----

使用 Redux (和 useReducer 很想): 

```js
*   网页中使用redux的步骤 , 和 useReducer 类似：
*       1. 引入redux核心包
*       2. 创建reducer整合函数
*       3. 通过reducer对象创建store
*       4. 对store中的state进行订阅
*       5. 通过dispatch派发state的操作指令
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-24-033818.png" style="zoom:50%;" />

完整代码 :

- dipatch 用来触发state的操作，可以将其理解为是想reducer发送任务的工具。它需要一个对象作为参数，这个对象将会成为reducer的第二个参数action，需要将操作信息设置到对象中传递给reducer。action中最重要的属性是type，type用来识别对state的不同的操作，上例中’ADD’表示增加操作，’SUB’表示减少的操作。

- store 还拥有一个 subscribe方法，这个方法用来订阅state变化的信息。该方法需要一个回调函数作为参数，当store中存储的state发生变化时，回调函数会自动调用，我们可以在回调函数中定义state发生变化时所要触发的操作：

  ```react
  store.subscribe(()=>{
      // store中state发生变化时触发
  });
  ```

- Redux 中最最核心的东西就是这个 store，只要拿到了这个 store 对象就相当于拿到了Redux中存储的数据。在加上 Redux 的核心思想中有一条叫做“单一数据源”，也就是所有的 state 都会存储到一课对象树中，并且这个对象树会存储到一个 store 中。所以到了 React 中，组件只需获取到 store 即可获取到 Redux 中存储的所有 state 。

```html
<!DOCTYPE html>
<html lang="zh">
<head> <meta charset="UTF-8"> <title>Title</title> </head>
<body>
  <div>
    <button id="sub">减少</button>
    <span id="countSpan">1</span>
    <span id="nameSpan"></span>
    <button id="add">增加</button>
    <button id="addFive">加5</button>
  </div>
<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
<script>
    const subBtn = document.getElementById('sub');
    const addBtn = document.getElementById('add');
    const addFiveBtn = document.getElementById('addFive');
    const countSpan = document.getElementById('countSpan');
    const nameSpan = document.getElementById('nameSpan');

    function reducer(state = {count:1,name:'孙悟空'}, action) {   // 创建reducer整合函数
        /* state 是当前 state，根据这个 state 生成新的 state
         *   action 是一个 js 对象，它里边会保存操作的信息, 其他需要传递的参数，也在 action 对象中设置 */
        switch (action.type) {
            case 'ADD':
                return {...state, count:state.count +1};
            case 'SUB':
                return {...state, count:state.count -1};
            case 'ADD_N':
                return {...state, count:state.count +action.payload};
            default:
                return state;
        }
    }

    const store = Redux.createStore(reducer);

    nameSpan.innerText = store.getState().name;

    store.subscribe(() => {
        // 修改 Dom 设置值
        countSpan.innerText = store.getState().count;
        nameSpan.innerText = store.getState().name;

    });


    subBtn.addEventListener('click', () => {
        store.dispatch({type: 'SUB'});
    });

    addBtn.addEventListener('click', () => {
        store.dispatch({type: 'ADD'});
    });

    addFiveBtn.addEventListener('click', () => {
        store.dispatch({type: 'ADD_N', payload:5});
    });

</script> </body>  </html>
```



问题 : 

1. 如果state过于复杂，将会非常难以维护
   1. 可以通过对state分组来解决这个问题，创建多个reducer，然后将其合并为一个

2. state 每次操作时，都需要对 state 进行复制，然后再去修改

3. case后边的常量维护起来会比较麻烦

> 虽然可以使用对 Redux 进行分组 ( 创建多个reducer ) 的方式, 但是这并不是主流的方式 .

```react
// Reducer 1
const stuReducer = (state = {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山'
}, action) => {
    switch (action.type) {
        case 'SET_NAME':
        
        
// Reducer 2
const schoolReducer = (state = {
    name: '花果山一小',
    address: '花果山大街1号'
}, action) => {
    switch (action.type) {
        case 'SET_SCHOOL_NAME':
```



## Redux Toolkit（RTK）

上边的案例我们一直在使用Redux核心库来使用Redux，除了Redux核心库外Redux还为我们提供了一种使用Redux的方式——Redux Toolkit。它的名字起的非常直白，Redux工具包

RTK可以帮助我们处理使用Redux过程中的重复性工作，简化Redux中的各种操作。



Install : 

```bash
## 在React中使用时react-redux都是必不可少，所以使用RTK依然需要安装两个包：react-redux和@reduxjs/toolkit。

npm install react-redux @reduxjs/toolkit -S

OR

yarn add react-redux @reduxjs/toolkit
```





使用 RTK 时，reducer 依然可以使用之前的创建方式不变，但是不在需要合并reducer。

RTK为我们提供了一个 `configureStore` 方法，它直接接收一个对象作为参数，可以将 reducer 的相关配置直接通过该对象传递，而不再需要单独合并 reducer。

上例中代码：

```js
const reducer = combineReducers({
    stu:stuReducer,
    school:schoolReducer
});

const store = createStore(reducer);
```

修改为：

```js
const store = configureStore({
    reducer:{
        stu:stuReducer,
        school:schoolReducer
    }
});
```



### RTK 构建 store

```react
// ./store/index.js
import {configureStore, createSlice} from "@reduxjs/toolkit";

// createSlice 创建 reducer 的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
/*
 * 参数 1 : name
 * 参数 2 : initialState  厨师状态
 * 参数 3 : reducers, 指定对 state 的各种操作，直接在对象中添加方法  */
const stuSlice = createSlice({
    name:'stu', // 用来自动生成 action 中的type
    initialState:{
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    },   // state的初始值
    reducers:{
        setName(state, action){
            // action: 可以通过不同的方法来指定对 state 的不同操作
            // 这里的 state 是一个代理对象，可以直接修改
            state.name = '猪八戒';
        },
        setAge(state, action){
            state.age = 28;
        }
    }
});

// 切片对象会自动的帮助我们生成 action
// stuSlice.actions 中存储的是 slice 自动生成 action 创建器（函数），调用函数后会自动创建 action 对象
// 自动生成的 action 对象的结构  {type: name/函数名, payload:函数的参数}
export const {setName, setAge} = stuSlice.actions;

// const nameAction = setName('哈哈');
// const ageAction = setAge(30);
// console.log(nameAction);
// console.log(ageAction);


// 创建store:  configureStore 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
   reducer:{     // student 只是其中的一个 Reducer, 后面可以添加新的
       student: stuSlice.reducer
   }
});

export default store;
```



### 完成 RTK 代码

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-24-QQ20220624-140259-HD.gif)

index.js 传 store 的好处是 : 再也不用像 useContext 一样, 每次修改内容都去修改  `<Provider store={store}>` 这里了

```react
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {Provider} from "react-redux";
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);
```



```js
// ./store/index.js
//   store 代码和上面一样, 唯一不同的就是下面 : 
//     传入什么参数, 就修改为什么参数.
const stuSlice = createSlice({
    ...
    reducers:{ 
        setName(state, action){
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        }
    ...
```



```react
// App.js
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store';

const App = () => {
    // redux - useSelector() 用来加载 state 中的数据
    const student = useSelector(state => state.student);
    // 通过 redux - useDispatch() 来获取派发器对象
    const dispatch = useDispatch();
    // 获取 action 的构建器
    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };

    const setAgeHandler = () => {
        dispatch(setAge(33));
    };

    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>
        </div>
    );
};

export default App;
```



### 拆分 RTK Code

创建 2 个 Slice : 

```react
├─ index.js
├─ stuSlice.js
├─ schoolSlice.js
```



```react
//  index.js
import {configureStore} from "@reduxjs/toolkit";
import {stuReducer} from "./stuSlice";
import {schoolReducer} from "./schoolSlice";

// 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
   reducer:{
       student:stuReducer,
       school:schoolReducer
   }
});
export default store;
```



```react
// schoolSlice.js
import {createSlice} from "@reduxjs/toolkit";

const schoolSlice = createSlice({
    name:'school',
    initialState:{
        name:'花果山一小',
        address:'花果山大街28号'
    },
    reducers:{
        setName(state, action){
            state.name = action.payload;
        },
        setAddress(state, action){
            state.address = action.payload;
        }
    }
});

export const {setName, setAddress} = schoolSlice.actions;
export const {reducer:schoolReducer} = schoolSlice;
```



```react
// stuSlice.js
import {createSlice} from "@reduxjs/toolkit";

const stuSlice = createSlice({
    name:'stu', // 用来自动生成action中的type
    initialState:{
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    }, // state的初始值
    reducers:{ // 指定state的各种操作，直接在对象中添加方法
        setName(state, action){
            // 可以通过不同的方法来指定对state的不同操作
            // 两个参数：state 这个state的是一个代理对象，可以直接修改
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        }
    }
});

// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const {setName, setAge} = stuSlice.actions;
export const {reducer:stuReducer} = stuSlice;
```



```react
// App.js

import {setName, setAge} from './store/stuSlice';
import {setName as setSchoolName, setAddress as setSchoolAddress} from "./store/schoolSlice";

const App = () => {
  // state 是一个对象, 直接解构赋值
  const {student, school} = useSelector(state => state);
  // 通过 useDispatch()来获取派发器对象
  const dispatch = useDispatch();
  ... 
  return ( <div> 
          <hr/>  // 换行
          <p>
              {school.name} ---
              {school.address}
          </p>
          {/* dispatch(setSchoolName('高老庄中小') 调用  */}
          <button onClick={()=>dispatch(setSchoolName('高老庄中小'))}>修改学校名字</button>
          <button onClick={()=>dispatch(setSchoolAddress('高老庄府前街19号'))}>修改学校地址</button>
      </div>
  );

```





## RTK Query

RTK Query是一个强大的数据获取和缓存工具。

在它的帮助下，Web应用中的加载变得十分简单，它使我们不再需要自己编写获取数据和缓存数据的逻辑。

Web 应用中加载数据时需要处理的问题：

1. 根据不同的加载状态显示不同 UI 组件    (  ex:  " Loading ..." )
2. 减少对相同数据重复发送请求
3. 使用乐观更新，提升用户体验
4. 在用户与UI交互时，管理缓存的生命周期

这些问题，RTKQ都可以帮助我们处理。首先，可以直接通过RTKQ向服务器发送请求加载数据，并且RTKQ会自动对数据进行缓存，避免重复发送不必要的请求。其次，RTKQ在发送请求时会根据请求不同的状态返回不同的值，我们可以通过这些值来监视请求发送的过程并随时中止。



-----

RTKQ 中将一组相关功能统一封装到一个 **Api 对象**中，

比如：

- 都是学生相关操作统一封装到StudentApi中，
- 关于班级的相关操作封装到ClassApi中。

接下来，我们尝试创建一个简单的Api，至于数据还是我们之前所熟悉的学生数据：

```react
// ./store/studentApi.js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//  createApi() 用来创建 RTKQ 中的 API 对象
//   RTKQ的所有功能都需要通过该对象来进行
//   createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),   // 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            // 向 getStudents 发请求时, 会访问 "http://localhost:1337/api/students " ( 拼一起)
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                }
            }),
        };
    }  // endpoints 用来指定 Api 中的各种功能，是一个方法，需要一个对象作为返回值
});
```



`createApi()` 参数说明 : 

`createApi` 需要一个配置对象作为参数，配置对象中的属性繁多，我们暂时介绍案例中用到的属性：

- reducerPath
  - 用来设置reducer的唯一标识，主要用来在创建store时指定action的type属性，如果不指定默认为api。

- baseQuery

  - 用来设置发送请求的工具，就是你是用什么发请求，RTKQ为我们提供了fetchBaseQuery作为查询工具，它对fetch进行了简单的封装，很方便，如果你不喜欢可以改用其他工具，这里暂时不做讨论。

- fetchBaseQuery

  - 简单封装过的fetch调用后会返回一个封装后的工具函数。需要一个配置对象作为参数，baseUrl表示Api请求的基本路径，指定后请求将会以该路径为基本路径。配置对象中其他属性暂不讨论。

- endpoints

  - Api对象封装了一类功能，比如学生的增删改查，我们会统一封装到一个对象中。一类功能中的每一个具体功能我们可以称它是一个端点。endpoints用来对请求中的端点进行配置。

  - endpoints是一个回调函数，可以用普通方法的形式指定，也可以用箭头函数。回调函数中会收到一个build对象，使用build对象对点进行映射。回调函数的返回值是一个对象，Api对象中的所有端点都要在该对象中进行配置。

  - 对象中属性名就是要实现的功能名，比如获取所有学生可以命名为 getStudents，根据 id 获取学生可以命名为getStudentById。属性值要通过build对象创建，分两种情况：

    - 查询：`build.query({})`
    - 增删改：`build.mutation({})`

  - 例如：

    ```react
    getStudents: build.query({
        query() {
            return 'students'
        }
    }),
    ```

    - 先说query，query也需要一个配置对象作为参数（又他喵的是配置对象）。配置对象里同样有n多个属性，现在直说一个，query方法。注意不要搞混两个query，一个是build的query方法，一个是query方法配置对象中的属性，这个方法需要返回一个子路径，这个子路径将会和baseUrl拼接为一个完整的请求路径。比如：getStudets的最终请求地址是:

    ```
    http://localhost:1337/api/`+`students`=`http://localhost:1337/api/students
    ```

    可算是介绍完了，但是注意了这个只是最基本的配置。RTKQ功能非常强大，但是配置也比较麻烦。不过，熟了就好了。



上例中，我们创建一个Api 对象 studentApi，并且在对象中定义了一个 getStudents 方法用来查询所有的学生信息。

如果我们使用 react 下的 createApi，则其创建的Api对象中会**自动生成 hook 函数**，钩子函数名字为 `useXxxQuery` 或 `useXxxMutation` ，中间的Xxx就是方法名，查询方法的后缀为Query，修改方法的后缀为Mutation。所以上例中，Api对象中会自动生成一个名为`useGetStudentsQuery` 的钩子，我们可以获取并将钩子向外部暴露。 

```
export const {useGetStudentsQuery} = studentApi;
```



### 创建Store对象

Api对象的使用有两种方式，一种是直接使用，一种是作为store中的一个reducer使用。store是我们比较熟悉的，所以先从store入手。

```react
import {configureStore} from "@reduxjs/toolkit";
import {studentApi} from "./studentApi";

export const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer
    },
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware),
});
```

创建 store 并没有什么特别，只是注意需要添加一个中间件 (middleware) ，这个中间件已自动生成了我们直接引入即可，中间件用来处理Api 的缓存。

store 创建完毕同样要设置 Provider 标签，这里不再展示。接下来，我们来看看如果通过 studentApi 发送请求。由于我们已经将 studentApi 中的钩子函数向外部导出了，所以我们只需通过钩子函数即可自动加载到所有的学生信息。比如，现在在App.js中加载信息可以这样编写代码：

```react
import React from 'react';
import {useGetStudentsQuery} from './store/studentApi';

const App = () => {
    const {data, isFetching, isSuccess} = useGetStudentsQuery();

    return (
        <div>
            {isFetching && <p>数据正在加载...</p>}
            {isSuccess && data.data.map(item => <p key={item.id}>
                {item.attributes.name} --
                {item.attributes.age} --
                {item.attributes.gender} --
                {item.attributes.address}
            </p>)}
        </div>
    );
};

export default App;
```

直接调用useGetStudentsQuery()它会自动向服务器发送请求加载数据，并返回一个对象。这个对象中包括了很多属性：

1. data – 最新返回的数据
2. currentData – 当前的数据
3. error – 错误信息
4. isUninitialized – 如果为true则表示查询还没开始
5. isLoading – 为true时，表示请求正在第一次加载
6. isFetching 为true时，表示请求正在加载
7. isSuccess 为true时，表示请求发送成功
8. isError 为true时，表示请求有错误
9. refetch 函数，用来重新加载数据

使用中可以根据需要，选择要获取到的属性值。写了这么多，也只写了一个Hello World。但是，良好的开端是成功的一半，这个理解了，后边的东西也就简单了！





### Hello RTKQ

```react
// App.js
import React from 'react';
import {useGetStudentsQuery} from "./store/studentApi";

const App = () => {

    // 调用Api查询数据
    // 这个钩子函数它会返回一个对象作为返回值，请求过程中相关数据都在该对象中存储
    const {data, isSuccess, isLoading} = useGetStudentsQuery(); // 调用Api中的钩子查询数据

    return (
        <div>
            {isLoading && <p>数据加载中...</p>}
            {isSuccess && data.data.map(item => <p key={item.id}>
                {item.attributes.name} ---
                {item.attributes.age} ---
                {item.attributes.gender} ---
                {item.attributes.address}
            </p>)}
        </div>
    );
};
export default App;


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {Provider} from "react-redux";
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);
```



```react
//  ./store/index.js
import {configureStore} from "@reduxjs/toolkit";
import studentApi from "./studentApi";

const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer
    },

    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware)
});

export default store;
```



```react 
//  studentApi.js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

// 创建Api对象
// createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                }
            }),
        };
    } // endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery
} = studentApi;

export default studentApi;
```





### 修改代码

...https://www.bilibili.com/video/BV1bS4y1b7NV?p=104&vd_source=cdb8c15859fbdd5efddeed0be9186c4b
