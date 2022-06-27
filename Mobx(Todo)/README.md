## Start

```
yarn 
yarn start
```



## Intro.

Todo 应用 , 可以

1. 回车添加 Todo
2. 删除 Todo
3. Todo 可被标记为 **isDone** / **未完成**
4. 可以 全完完成 / 全选未完成

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-10-101336.png" style="zoom:50%;" />







## Mobx 状态管理

安装: `npm install mobx --save`。 

React 绑定库: `npm install mobx-react --save`



MobX 是一个经过战火洗礼的库，它通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。MobX背后的哲学很简单:

**任何源自应用状态的东西都应该自动地获得。**

其中包括UI、数据序列化、服务器通讯，等等。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-09-132105.jpg)





###  Observable state(可观察的状态)

MobX 为现有的数据结构(如对象，数组和类实例)添加了可观察的功能。 

通过使用 **`@observable`** 装饰器 (ES.Next )来给你的类属性添加注解就可以简单地完成这一切。

```react
import { observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```





###  Computed values(计算值)

使用 MobX， 你可以定义在相关数据发生变化时自动更新的值。 

通过  [`@computed`](http://cn.mobx.js.org/refguide/computed-decorator.html)  装饰器或者利用 `(extend)Observable` 时调用 的getter / setter 函数来进行使用。

(当然，这里也可以再次使用 `decorate` 来替代 `@` 语法)  。

```react
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```

当添加了一个新的 todo 或者某个 todo 的  `finished`  属性发生变化时，MobX 会确保 `unfinishedTodoCount` 自动更新。

每当只有在需要它们的时候，它们才会自动更新。



### Reactions(反应)

Reactions 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。 

简而言之，reactions 在 [响应式编程](https://en.wikipedia.org/wiki/Reactive_programming)和[命令式编程](https://en.wikipedia.org/wiki/Imperative_programming)之间建立沟通的桥梁。





