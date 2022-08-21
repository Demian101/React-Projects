# navi 导航栏

```css
  <nav
    class="
      bg-gray-900
      text-white
      ..
      item-center
      justify-between
    "
  >
```

`item-center` 和  `justify-between` 常在导航栏中使用 

- `item-center`  : 使用 items-center 沿容器横轴的中心对齐项目：
  - ![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-05-065246.png)
- `justify-between`  : 沿容器的主轴对齐项目，以使每个项目之间的空间相等
  - ![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-05-065503.png)



比如 github 的导航栏 : 

![image-20220705150129886](/Users/soda/Library/Application Support/typora-user-images/image-20220705150129886.png)

-  **左侧 div** 
  - Github Icon
  - input 
  - `Pull Requess` 、`Issues`、`Marketplace`、`Explore` 
- **右侧 div**
  - 三个 Icon



其代码如下 : 

```html
<div class="text-sm text-gray-900">
  <nav
    class="
      bg-gray-900 text-white px-4 py-3
      flex
      item-center 
      justify-between
    "
  >
    <!-- 左侧 div -->
    <div class="flex items-center space-x-4">  
      <!-- Github Icon -->
      <a href="#">
        <a class="w-6 fill-current hover:text-gray-200">
          <svg> </a> </a>  

      <!-- input text -->
      <div class="hidden lg:block relative">  <input>  </div>

      <!-- Pull Requests 等, 小屏 hidden  -->
      <ul class="hidden lg:flex items-center font-semibold space-x-4">
        <li> <a href="#" class="hover:text-gray-400">Pull Requests </a> </li>
        <li> <a href="#" class="hover:text-gray-400">Issues </a> </li>
        <li> <a href="#" class="hover:text-gray-400">Marketplace </a> </li>
        <li> <a href="#" class="hover:text-gray-400">Explore </a> </li>
      </ul>
    </div>

    <!-- 右侧 div -->
    <div class="flex items-center space-x-4 text-white h-full">
      <a href="#" class="relative hover:text-gray-400"> <svg>
      ...
        </svg>
      </a>
    </div>
  </nav>
</div>
```

- `space-x-4` : 使用 ` space-x-{amount}` 实用程序控制元素之间的水平间距
- `"hidden lg:block relative"` :  小屏都是 hidden 隐藏起来的 , 只能看到 github Icon,  只有 lg 及以上才是 block 能看到全部



# input 输入框

```html
<input
  type="text"
  class="
    rounded
    bg-gray-900
    border
    border-gray-600
    placeholder-gray-400     <!-- 驻留文字颜色-->
    w-72
    px-3
    py-1
  "
  placeholder="Search or jump to ..."   <!-- 驻留文字-->
/>
```

# button

一般来说，左右 padding 会略大于 上下 padding， 这样会更像 button 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-05-QQ20220705-195247-HD.gif)

```html
<button class="text-lg text-white 
               font-bold 
               bg-slate-800 
               rounded-full shadow-md 
               px-4 py-2 mt-4 
               transform hover:bg-slate-500 hover:scale-110 
               transition" > Shop Now </button>
```

- text-large
- font-bold 加粗
- rounded-full 圆角
- shadow-md  中等阴影
- transform : 准备应用一些动画效果
  - hover:scale-110  : hover 后变大为原来的 110%
  - transition : 给 transform 的动画添加渐变效果





# select 下拉框

```react 
<select type="checked" className="bg-black text-white text-center">
  <option value=""> 全部标签 </option>
  <option value="chocolate">Chocolate</option>
  <option value="strawberry">Strawberry。。。。。。。</option>
  <option value="vanilla">Vanilla</option>
</select>
```





# Dark Mode 暗色模式

https://codesandbox.io/s/ghifaco-tailwind-dark-mode-card-sbntwp?file=/index.html:1840-2138





# Apply 实例

## 卡片布局

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-05-120838.png" style="zoom:50%;" />

**css 回忆 :** 

- `container`  : 该类用于在元素的左侧和右侧添加 16px 填充
- `flex flex-col justify-center`  : 设置 flex-direction 为 column 竖直 
- `justify-center` 即 `justify-content: center` 让文本内容区域沿 column (上下) 居中
- transform : 准备应用一些动画效果
  - hover:scale-110  : hover 后变大为原来的 110%
  - transition : 给 transform 的动画添加渐变效果

**结构说明:** 

- 最外层是 container , 第二层给元素一些 padding 和阴影 , 圆角
- 第三层有 2 个 div 
  - 一 个占 3/5 是左侧文字部分
  - 另一个 2/5 是右侧图片

```html
<div class="container mx-auto">
  <div class="p-6 rounded-xl shadow-md">  <!-- 比较大的圆角 和中等大小的阴影 -->
    <div class="flex">
      <!-- 左 div -->
      <div class="w-3/5 flex flex-col justify-center">  <!-- 使文本区域上下居中-->
        <div> 
          <h2 class="text-2xl font-bold">iPhone 12 </h2>
          <p class="my-3">New Ultra Wide camera reveals more detail in the dark areas of your photos, New Wide camera captures 47% more light for better photos and videos , New sensor-shift optical image stabilization keeps shots steady even when you’re not. </p>
          <button class="text-lg text-white font-bold bg-slate-800 rounded-full shadow-md px-4 py-2 mt-4 transform hover:bg-slate-500 hover:scale-110 transition" > Shop Now </button>
        </div>
      </div>
      
      <!-- 右 div -->
      <div class="w-2/5 " >
        <img src="https://th.bing.com/th/id/R.37a37239e77fbf40237ed5bff4c96616?rik=FF6b4wYDrrlnHg&pid=ImgRaw&r=0"
      </div>
  </div>
</div>
```





## 头像框/文本

> https://codesandbox.io/s/tailwind-forked-1413oh?file=/src/App.js:998-1001

- `shadow-xl`  外框阴影
  - `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, or `shadow-2xl` ... 

- `bg-grey-50` 定制背景颜色

https://tailwind.wyz.xyz/docs/customizing-colors#aliasing-color-names

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-150418.png" width=70%>

- `bg-grey-50` 是最淡的灰色  ( 50 - 900 的值 可以调整)
- `sm:rounded-xl`  :  是只在 `small` screen 上生效
  - `p-14` : 是 padding , 周围间距
- `p{t|r|b|l}-{size}`    top / right / bottom / left
- `p{x|y}` 分别对应 **horizontal** padding  和 **vertical** padding

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-153317.png)

- `flex items-center` :   `flex` 和 `items{start|end|center|baseline|stretch}` 一般是连着用的

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220601233816369.png" alt="image-20220601233816369" width=50%>

- `flex justify-center` : 沿容器主轴的中心对齐项目

  - 如果去掉 `justify-center` , 会跑到上面去

  <img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-154056.png" width=60%>



- `flex-col ` :  position flex items vertically (垂直 ) :

  <img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-154331.png" width=50%>



- `m-auto`  : margin: auto;  自动边缘 ? 
  - 删了之后也没啥影响....



- `sm:w-auto `: 在小屏下放弃指定宽度,  而是自动 **width** 
- `w-screen` : 使用 w-screen 使元素跨越视口的整个宽度。 (span the entire **width** of the viewport.)
  - 下图是 保留 / 删除 `w-screen` 的前后对比
  - `h-screen` 和 `w-screen` 作用类似 , 如果删掉 `h-screen` 上下 2 部分的北京也会变黑

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-155119.png" width=50%;>

- `max-w-sm` :  最大宽度和边距实用程序（max-w-sm 和 mx-auto），用于限制卡片宽度并将其水平居中
  - 删了之后也没啥影响....

- `w-32 ` :  元素宽度 , `w-{24|32|40|48|64}` ....  
  - 设置为别的值, 会出现意外的大小效果, 不推荐随便设置
- `w-1/2`  也可以设置为这种分数宽度 : 
  - 效果还不错?

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-155907.png" width=70%>



- `mt-4 mb-2`  margin top /   margin bottom

```css
<div class="mt-6 ...">mt-6</div>
<div class="mr-4 ...">mr-4</div>
<div class="mb-8 ...">mb-8</div>
<div class="ml-2 ...">ml-2</div>
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-02-045607.png" width=50%>

- `text-center`
  - `text-{center|left|right|justify}`   一段文本的排列方式 , 居中 , 靠左 , 靠右 , justify 不知道有啥用

- `text-base`  字体大小
  - `text-{sm|base|lg|xl|2xl}`

- `location sm:grid grid-cols-2 gap-8`
  - 没看懂, 不管了



实际效果 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-01-155949.png" width=30%;>

```react
// index.js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const Home = () => {
  const [char, setChar] = useState();

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/1")
      .then((r) => r.json())
      .then(setChar);
  }, []);

  return <App char={char} />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(   // React 18
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  rootElement
);
```



```react
// App.js
import React from "react";

export default function App({ char }) {
  return (
    <>
      {char && (
        <section className="shadow-xl bg-gray-50 sm:rounded-xl p-12 flex items-center justify-center flex-col m-auto sm:w-auto w-screen sm:h-auto h-screen sm:max-w-sm">
          <img className="w-36 rounded-full" src={char.image} alt={char.name} />
          <div
            className={`status text-center mt-4 p-2 text-xs w-24 ${
              char.status === "Alive" ? "bg-green-300/50" : "bg-red-300/50"
            }`}
          >
            {char.status}
          </div>
          <h2 className="name text-lg text-gray-900 mt-4 mb-2">{char.name}</h2>

          <span className="text-base text-gray-600">{char.species}</span>
          <span className="mt-2">
            In {char.episode.length} episode
            {char.episode.length === 1 ? "" : "s"}
          </span>
          <div className="location sm:grid grid-cols-2 gap-8 text-center mt-4 text-sm">
            <span>
              <span className="font-bold block text-base">Origin</span>{" "}
              {char.origin.name}{" "}
            </span>
            <span className="mt-2 block sm:mt-0">
              <span className="font-bold block text-base">Lives</span>
              {char.location.name}{" "}
            </span>
          </div>
        </section>
      )}
    </>
  );
}

```







## 图片卡片

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-02-120841.png" width=35%>

```react
import React from "react";
import ReactDOM from "react-dom";

function ImageCard({ src }) {
  return (
    <div className="w-auto rounded overflow-hidden shadow-lg mb-6">
      <img className="w-full rounded-b" src={src} alt="loading failed" />
      <div className="px-6 py-4">
        <h1 className="text-xl mb-2 font-bold"> An Image </h1>
        <p className="text-grey-darker text-base">
          This is an image, it is and I' am not kidding you. Enjoy while it lasts
        </p>
      </div>
      <div className="px-6 py-4">
        <span className="px-3 py-1 text-sm text-grey-dark rounded-full bg-grey-lighter hover:bg-gray-300 hover:text-gray-600 border-grey-light border mr-2">
          Hello
        </span>
      </div>
    </div>
  );
}

function App() {
  const src = "https://picsum.photos/300/200";
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-l font-bold mb-5">InstaSplash</h1>
      <ImageCard src={src} />
      <ImageCard src={src} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

