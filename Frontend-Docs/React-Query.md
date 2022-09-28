https://zhuanlan.zhihu.com/p/522609991

在前端项目的数据状态管理中，与服务端的交互数据往往占较大比例，尤其在诸如个人博客网站、内部管理系统这样的重数据交互、轻 UI 交互的场景。这类数据和客户端本地数据有很多差异：

1. 数据持久化存储在远程服务端，不受客户端控制
2. 需要通过异步请求来获取和更新
3. 有可能在 Web 应用中变得"过时"

传统状态管理方案在应对这类场景时有些显得笨拙臃肿。React Hooks 推出后，逐渐有一些专注这一领域的工具出现并大放光彩。本文将着重介绍 React Query 这一代表性工具给出的简洁高效的解决方案。



## 拉踩 Redux :

### 代码量方面 拉踩 : 

一个例子:  假设我们需要开发一个个人博客，以其中首页博客列表页为例，使用传统的 Redux 状态管理方案的话，需要先定义 `actions`、`reducers` 以及 `store`： 

```js
// Redux actions, reducers and stores
const fetchPosts = createAsyncThunk("posts/fetchPosts", () =>
  fetch("/fakeApi/posts").then((response) => response.json())
);
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  }
});
```



然后，定义 UI 组件并在其中调用 Redux 相关方法获取数据：

```js
const PostList = () => {
  const dispatch = useDispatch();
  // Retrieve data from Redux store state
  const { status, error, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    // Start fetching data
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content = null;
  if (status === "loading") {
    content = <div className="loading">Loading...</div>;
  } else if (status === "succeeded") {
    content = posts.map((post) => (
      <article key={post.id}>
        <h4>{post.title}</h4>
        <div>
          <span>Author: {post.author}</span>{" "}
          <span>Date: {new Date(post.date).toLocaleDateString()}</span>
        </div>
      </article>
    ));
  } else if (status === "failed") {
    content = <div className="error">{error}</div>;
  }

  return <section className="posts-list">{content}</section>;
};
```

可以看出，我们有一半多的代码是在对服务端数据进行操作。

那么，如果用 `React Query`  来实现的话会是什么样呢 ？

首先我们完全不需要定义 actions、reducers、store 等，只要修改下 UI 组件的如下部分即可：

```js
// Components
const PostList = () => {
  // Retrieve data via React Query
  const { status, error, data: posts } = useQuery("posts", () =>
    fetch("/fakeApi/posts").then((response) => response.json())
  );

  let content = null;
  ...
}
```

React Query 只用了仅仅 3 行就完成了之前 40 行代码的所有功能，而且也像 React 本身一样非常的声明式，开发者要做的仅仅是描述好自己想要的数据即可，真是令人赞叹。

进一步地，围绕数据请求这一场景，React Query 还针对下列常见需求给出了自己的解决方案：

- 缓存......（可能是编程中最难做到的事情）
- 将对同一数据的多个请求简化为一个请求
- 在后台更新"过期"数据
- 知道数据何时"过期"
- 尽可能快地反映数据的更新
- 性能优化，如分页和懒加载数据
- 管理内存
- 共享数据



### 架构方面进行拉踩 

按照来源，前端有两类**「状态」**需要管理：

- 用户交互的中间状态 ( UI State)
- 服务端状态 (Server State , )

在陈年的老项目中，通常用`Redux`、`Mobx`这样的**「全局状态管理方案」**无差别对待他们。

事实上，他们有很大区别：



#### **1. 用户交互的中间状态**

比如组件的`isLoading`、`isOpen`，这类**「状态」**的特点是：

- 以**「同步」**的形式更新
- **「状态」**完全由前端控制
- **「状态」**比较独立（不同的组件拥有各自的`isLoading`）

这类**「状态」**通常保存在组件内部。 当**「状态」**需要跨组件层级传递，通常使用`Context API`。

再大范围的**「状态」**会使用`Redux`这样的**「全局状态管理方案」**。



#### **2. 服务端状态**

当我们从服务端请求数据：

```js
function App() {
  const [data, updateData] = useState(null);
  
  useEffect(async () => {
    const data = await axios.get('/api/user');
    updateData(data);
  }, [])

  // 处理data
}
```

返回的数据通常作为**「状态」**保存在组件内部（如 `App` 组件的 `data` 变量 ）。

如果是需要复用的通用**「状态」**，通常将其保存在 `Redux` 这样的**「全局状态管理方案」**中。

这样做有 2 个坏处：

1. 需要重复处理请求中间状态

2. 为了让 `App` 组件健壮，我们还需要处理 `Pending`、`Error ` 等中间状态：

```js
function App() {
  const [data, updateData] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await axios.get('/api/user');
      updateData(data);
    } catch(e) {
      setError(true);
    }
    setLoading(false);
  }, [])

  // 处理data
}
```

这类通用的中间状态处理逻辑可能在不同组件中重复写很多次。服务端状态更应被归类为**「缓存」**，他有如下性质：

- 通常以**「异步」**的形式请求、更新
- **「状态」**由请求的数据源控制，不由前端控制
- **「状态」**可以由不同组件共享

作为可以由不同组件共享的**「缓存」**，还需要考虑更多问题，比如：

- 缓存失效
- 缓存更新

`Redux`一把梭固然方便。但是，区别对待不同类型**「状态」**能让项目更可控。

这里，推荐使用 `React-Query` 管理服务端状态。



## **初识 React-Query**

`React-Query `是一个基于 `hooks` 的数据请求库。

我们可以将刚才的例子用 `React-Query` 改写：

```js
import {useQuery} from 'react-query'
function App() {
  const {data, isLoading, isError} = useQuery(
    'usersData', 
    ()=> axios.get('/api/user')
  );
```

- `userData `字符串是这个 `query` 独一无二的 `key` 。
- 可以看到，`React-Query`封装了完整的请求中间状态（`isLoading`、`isError`...）。
- `React-Query `还为我们做了如下工作：
  - 多个组件请求同一个 `query` 时只发出一个请求
  - 缓存数据失效/更新策略（判断缓存合适失效，失效后自动请求数据）
  - 对失效数据垃圾清理

数据的`CRUD`由 2 个 `hook` 处理：

- `useQuery` 处理数据的查询 ; 
- `useMutation `处理 增/删/改 ; 



在下面的例子中，点击**「创建用户」**按钮会发起创建用户的 `post` 请求：

- 调用 `mutate `方法，触发请求。

```js
import { useQuery, queryCache } from 'react-query';

 function App() {
   // 获取用户
   const {data, isLoading, isError} = useQuery('userData', () => axios.get('/api/user'));
   // 新增用户
   const {mutate} = useMutation(data => axios.post('/api/user', data));
 
   return (
     <ul>
       {data.map(user => <li key={user.id}>{user.name}</li>)}
       <button
         onClick={() => {
           mutate({name: 'kasong', age: 99})
         }}
       >
         创建用户
       </button>
     </ul>
   )
 }
```

但点击后 ,  `userData query` 对应数据不会更新，因为他还未失效。

所以我们需要告诉 `React-Query`，`userData query `对应的缓存已经失效，需要更新：

```js
import { useQuery, queryCache } from 'react-query';

function App() {
  // ...
  const {mutate} = useMutation(userData => axios.post('/api/user', userData), {
    onSuccess: () => {
      queryCache.invalidateQueries('userData')
    }  
  })
  
  // ...
}
```

- 调用 `mutate `方法，触发请求。
- 当请求成功后，会触发 `onSuccess` 回调函数，回调中调用 `queryCache.invalidateQueries`，将`userData ` (唯一 key) 对应的 `query`缓存置为`invalidate`。
- 这样，`React-Query`就会重新请求`userData`对应`query`的数据。







## 数据请求 useQuery

作为最为基础的功能，React Query 提供了`useQuery`用以获取服务端数据，它接受三个参数：

1. `queryKey`  : 通常是个字符串 , 作为该数据请求的唯一标识，可用来重新请求、获取以及清理缓存等
2. `queryFn`  : 数据请求逻辑，需返回一个 Promise 
3. `options` (可选） 额外配置项，可用来设置缓存时间、重试次数等

```js
const returns = useQuery(queryKey, queryFn?,{
    enabled, //默认为true，表示自动请求，false的话则需要你手动
    retry, //请求失败后，请求的重试次数，也可以为boolean，true为无数次重试，false则不会重试
    refetchOnWindowFocus，//页面取得焦点时，重新获取数据，默认为true
    staleTime, //指定缓存时长，以毫秒为单位。
    ...
})
```



它的返回值是一个对象，常用的属性主要有：

- `status`  : 当前数据请求的状态，具体有 `idle`、`loading`、`error`、`success` 。此外，也可用`isIdle`、`isLoading` 、`isError`、 `isSucess`几个 flag 属性快速判断当前状态 
- `error` : 数据请求 Promise 失败时的错误信息 
- `data`  : 数据请求 Promise 成功时返回的数据

```js
const {
    data,    // 请求成功 data
    isLoading,  // true表示数据在获取的路上
    error,  //错误对象，如果存在则包含相关的错误信息
    refetch，//实用，可在需更新数据时调用，则会触发这个请求，比如 enabled=false 时
    ...
} = useQuery(queryKey, queryFn?,options?）
```





接下来我们先看一个典型的应用示例：

```js
function Todos() {
  const { isLoading, isError, data, error } = useQuery('todos', () => 
    fetch('/api/todos').then(response => response.json()));
 
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
 
  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

假设获取待做事项列表数据时需要额外传递`已完成、未完成`等状态信息以进行筛选，

甚至还要考虑下分页，则需将数据获取部分改写成：

```js
const { isLoading, isError, data, error } = useQuery(
  ['todos', status, page], 
  () => fetch(`/api/todos?status=${status}&page=${page}`).then(response => response.json()),
);
```

这里我们将 `queryKey` 替换成了一个可以数组 `['todos', status, page]`，这样一旦 `status`、`page` 参数发生变更的时候，React Query 通过 `queryKey` 的变更获悉应该重新发起请求，以此达到更新数据的目的。

实际上，React Query 对于`queryKey`的唯一要求是可以被序列化，可以根据团队的倾向选择合适的方案，如下都是一些合法的例子：

```js
useQuery(['todos', { status, page }], queryFn);
useQuery(`todos/${status}/${page}`, queryFn);
useQuery(['todos', todoId], () => fetchTodoById(todoId));
```

关于 `queryFn` ，我们常用的可以是浏览器内置的  `fetch`  API，也可以是 axios，只要返回的是一个 Promise 即可：

```js
// Refined `fetch` API
useQuery(['todos', todoId], async () => {
  const response = await fetch('/todos/' + todoId);
  // Throw error if status code is not 2xx
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
});
 
// `axios` library
useQuery(['todos', todoId], () => axios.get('/todos/' + todoId));
```





### 有依赖的查询 dependent-queries

> 还是得看文档啊 !!!!!! 

```js
依赖查询（或串行查询）取决于先前的查询结果。要实现这一点，只需使用enabled选项就可以告诉查询何时可以运行：

// Get the user
const { data: user } = useQuery(["user", email], getUserByEmail);

const userId = user?.id;

// Then get the user's projects
const { isIdle, data: projects } = useQuery(
  ["projects", userId],
  getProjectsByUser,
  {
    // 直到`userId`存在，查询才会被执行
    enabled: !!userId,
  },
);

// isIdle将一直为`true`，直到`enabled`为`true`且查询开始获取为止。
// 然后它将进入`isLoading` 阶段，并希望进入 `isSuccess` 阶段 :)
```



### Click 执行 : 

> https://stackoverflow.com/questions/62340697/react-query-how-to-usequery-when-button-is-clicked

根据 API Reference，您需要将 enabled 选项更改为 false 以禁用查询自动运行。然后你手动重新获取。

> 也就是说 , 默认的是自动 fetch 的; 

```js
// emulates a fetch (useQuery expects a Promise)
const emulateFetch = _ => {
  return new Promise(resolve => {
    resolve([{ data: "ok" }]);
  });
};

const handleClick = () => {
  // manually refetch
  refetch();
};

const { data, refetch: yourdefineFunction } = useQuery("my_key", emulateFetch, {
  refetchOnWindowFocus: false,
  enabled: false // disable this query from automatically running
});

return (
  <div>
    <button onClick={handleClick}>Click me</button>
    {JSON.stringify(data)}
  </div>
);
```

mutation 中这样定义暴露出的函数 : 

```js
const { data, mutate: yourdefineFunction } = useMutation( func, 
```









## 数据修改 useMutation

数据请求的另外一个大的类别是数据提交，诸如 POST、PATCH、DELETE 这几种具有副作用的请求类型都属于此类。

我们希望在处理数据修改时，也有如同前面介绍的种种数据获取工具一样的趁手方案。

针对这一诉求，React Query 提供了`useMutation`，它接受两个参数：

1. `mutationFn`  : 类似 `useQuery` 中的 `queryFn` ， `mutationFn` 是执行数据提交逻辑的方法，需返回一个 Promise
2. `options`  : 可选配置项，例如 `onSucess`、`retry` 等



`useMutation`返回的对象中，常用的一些属性有 : 

- `mutate` : 触发`mutationFn`，开始提交数据到服务器端 ; 
- `status`、`error`、`data` 等 : 与 `useQuery` 返回值类似，可以用这些属性确定当前请求的状态、错误信息和返回值 ; 



让我们看一个常见的应用示例： 

```js
function App() {
  const addTodoMutation = useMutation(newTodo => axios.post("/todos", newTodo));

  return (
    <div>
      {addTodoMutation.isError ? (
        <div>An error occurred: {mutation.error.message}</div>
      ) : null}
      {addTodoMutation.isSuccess ? <div>Todo added!</div> : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPostMutation.mutate(new FormData(e.currentTarget));
        }}
      >
        <div>
          <label for="todo">Todo: </label>
          <input id="todo" type="text" name="todo" />
        </div>
        <button>{addTodoMutation.isLoading ? "Creating..." : "Create"}</button>
      </form>
    </div>
  );
}
```

如上所示，一开始我们使用 `useMutation` 创建了一个 mutation，并在提交表单的时候调用其 `mutate` 方法提交用户填写的新待办事项信息，并通过`isError`、`isSuccess`、`isLoading`等标志变量展示相关进展。





## QueryClient、QueryClientProvider、useQueryClient

这三个可以用来进行query的全局配置、与缓存交互等

```React
// 例子来自官网
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";   //调试工具

const queryClient = new QueryClient();//创建实例，可以用该实例配置一些选项，具体看文档

export default function App() {
  return (
   //注入到Example里
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const queryClient = useQueryClient()   //获取 QueryClient 实例
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      "https://api.github.com/repos/tannerlinsley/react-query"
    ).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
      {/* 指定key为repoData，可以该query重新获取数据 */}
      <button onClick={()=>queryClient.refetchQueries('repoData')}>重新获取</button>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

