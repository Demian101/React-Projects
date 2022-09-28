**HOC: Higher Order Component**

类似于 JavaScript 中的高阶函数，在 JS 中，高阶函数是**将另一个函数作为参数或返回另一个函数**的函数。

与高阶函数类似，高阶组件接受一个**组件**并返回另一个**组件**。

大多时候，第三方库会使用高阶组件。例如 redux、react-router-dom 和 material-u 都用了。

```react
// One way of writing a Higher Order Component(HOC)
import React from 'react'
const higherOrderComponent = (Component) => {
  return (props) => {
    return <Component {...props} />
  }
}
```



```react
const EnhancedComponent = higherOrderComponent(WrappedComponent);
// const "被强化组件" = 高阶组件("被包装组件")
```





# 高阶组件产生初衷

组件是把 `props` 渲染成 `UI` 的, 而高阶组件是将组件转换成另外一个组件，我们更应该注意的是，经过包装后的组件，获得了那些强化,节省多少逻辑，或是解决了原有组件的那些缺陷，这就是高阶组件的意义。高阶组件究竟解决了什么问题 🤔🤔🤔？

**① 复用逻辑**：高阶组件更像是一个加工`react`组件的工厂，批量对原有组件进行**加工**，**包装**处理。我们可以根据业务需求定制化专属的`HOC`,这样可以解决复用逻辑。

**② 强化 props **：这个是`HOC`最常用的用法之一，高阶组件返回的组件，可以劫持上一层传过来的`props`,然后混入新的`props`,来增强组件的功能。代表作`react-router`中的`withRouter`。

**③ 赋能组件**：`HOC`有一项独特的特性，就是可以给被`HOC`包裹的业务组件，提供一些拓展功能，比如说**额外的生命周期，额外的事件**，但是这种`HOC`，可能需要和业务组件紧密结合。典型案例`react-keepalive-router`中的 `keepaliveLifeCycle`就是通过`HOC`方式，给业务组件增加了额外的生命周期。

**④ 控制渲染**：劫持渲染是`hoc`一个特性，在`wrapComponent`包装组件中，可以对原来的组件，进行`条件渲染`，`节流渲染`，`懒加载`等功能，后面会详细讲解，典型代表做`react-redux`中`connect`和 `dva`中 `dynamic` 组件懒加载。

我会针对高阶组件的初衷展开，详细介绍其原理已经用法。跟上我的思路，我们先来看一下，高阶组件**如何在我们的业务组件中使用的**。

> 这种设计模式是装饰模式：装饰模式的特点是不需要改变 被装饰对象 本身，而只是在外面套一个外壳接口。



# 实例 1 

`withxxx`  是高阶组件的命名规范，如下 `withFetch` 组件，它封装了 axios 请求 url 的逻辑，并将数据状态 data 存储在 class 中。

这使得无论是从 URL_A 获取数据显示图片，还是从 URL_B 获取数据显示书籍，都可以使用高阶组件包装的 fetch 逻辑，其区别只不过是 URL 不同罢了。

```react 
import { React } from 'react';

const withFetch = (Component, url) => {
  return class WithFetchComponent extends React.Component{
    state = { list: [] }
    async componentDidMount() {
      const {data: list} = await axios.get(url)
      this.setState({ list })
    }
    render(){
      return <Component {...this.porps} list={this.state.list} /> 
    }
  }
}
export default withFetch;
```



PhotoList 使用 HOC 包装自己，

1. 在 HOC 中 fetch 数据
2. 把数据拿回来进行渲染。

```react
const url = ' https://jsonplaceholder.typicode.com/photos?_limit=5
const PhotoList = ( {list} ) => {
  return (
    <ul>
      {list.map((photo) => {
        return <li key={photo.id}> 图片 URL 是: {photo.url} </li>
      })}
    </ul>
}
export default withFetch(PhotoList, url)
```



