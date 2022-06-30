项目使用了大量复杂 Tailwinds 和看不懂的 Transactions , 感觉不适合 tailwind 入门使用

-----

Github 源地址 👉 https://github.com/cruip/tailwind-landing-page-template

设计文件在 Figma  👉 https://bit.ly/3HOZMpf

Credits :  [Nucleo](https://nucleoapp.com/)

> 没懂, Nucleo 是个图标库



<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-16-074827.png" style="zoom:50%;" />





## 项目启动:

This project was bootstrapped with [Vite](https://vitejs.dev/).  ( 用 Vite 引导的 )

```bash
## Project setup
npm install

## Compiles and hot-reloads for development
npm run dev

## Compiles and minifies for production
npm run build
```

Vite 自定义设置  Customize configuration 👉 :  https://vitejs.dev/guide/#overview



## 重点 Tips: 





AOS : 一个动画模块 , aos 脚本将会**在页面滚动时，在该元素上触发相应的动画**

useLocation :  来自 react-dom 的 hook , 可以获取当前页面的 url 的值 , 如  `pathname: "/signup"` 

useEffect 的 return：组件被移除时，移除监听



### PropTypes

proptypes 介绍 ☞ https://www.jianshu.com/p/d1207c6edc61

PropTypes 是 React 进行类型检查的工具

> 对于某些应用程序，您可以使用 Flow 或 TypeScript 等 JavaScript 扩展来检查整个应用程序。
>
> 除此之外, React 也有一些内置的类型检查能力。要对组件的 props 运行类型检查



`PropTypes.element` : 是一个 react 元素



`PropTypes.oneOfType ` : 在一定范围内的类型——可以是string，number，实例

`PropTypes.oneOf` : 只能特定的内容——比如字段内容只能是 'news' 或者 'photos'

```react
MyComponent.propTypes = {
    // 在一定范围内的类型 —— 可以是string，number，实例
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Message)
    ]),
  
    // 特定的内容——只能是news或者photos
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
}

```



`PropTypes.arrayOf/ objectOf` : 指定所有内容类型

```react
MyComponent.propTypes = {
   // 一个指定 number 为元素类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  
  // 一个指定 number 类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  
  // 指定属性及类型的对象——color必须是string 类型，fontSize是number类型
  optionalObjectWithShape: PropTypes.shape({
     color: PropTypes.string,
     fontSize: PropTypes.number
    }),
}
```



`isRequired` : 检测内容是否存在——没有的话会打印警告信息

```react
MyComponent.propTypes = {
    // 你也可以在任何 PropTypes 属性后面加上 `isRequired` 
    // 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
    requiredFunc: PropTypes.func.isRequired,

    // 任意类型, 但数据必须存在
    requiredAny: PropTypes.any.isRequired,
}
```







## 主页模块



## 登录模块



## 注册模块
