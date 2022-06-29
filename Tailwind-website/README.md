# Preview

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-144156.png" style="zoom:40%;" />

运行项目：

```bash
yarn
yarn dev
or yarn preview
```

打包：
```bash
yarn build
```



# 重点知识



# 模块介绍

## 1. header

header 由以下 2 part 组成 

1. 左边的 logo  (  .png  格式 )
2. 右边 2 个 btn : 
   1. 登录是一个  `<a>` 
   2. 注册由 `<a>` +  `<svg>` 的右箭头标签 组成

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-144304.png" style="zoom:50%;" />

直接看代码 : 

```react
import React from "react";
import RightArrow from "./svg/RightArrow"
// import Logo from "../logo.svg";
import logo from "../assets/favicon.png"

export default function Header() {
  return (
    <header className="flex justify-between items-center h-20">
      <img src={logo} alt="" className="w-8 h-8" /> 
      <nav className="flex items-center">
        <a href="#">登录</a>
        <a href="#"
          className="ml-8 bg-gray-700 px-4 py-2 rounded text-blue-50 flex items-center"
        >
          注册
          <RightArrow className="h-4 w-4 ml-1 fill-neutral-400" />
        </a>
      </nav>
    </header>
  );
};
```



### tailwind 讲解

>  直接在 VS Code 里看代码比较好 , 点击悬浮都能显示原标签 .....

`<nav>` : nav 元素定义了一组导航链接 (  一组 `<a>`)

`flex item-center` : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-152100.png" style="zoom:50%;" />

`flex justify-between`  : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-22-014631.png" style="zoom:50%;" />

故 `flex justify-between` 的 2 个 item 是

1. `<img>` logo
2. `<nav>` 标签 ( 里面有 2 个 `<a>` , nav 里的 2 个 `<a>` 用 `flex item-center` :  保持竖直居中









### React 引入 svg

如果不想把 SVG 直接放到代码里的话 , 就像这样 : 

```react
<a href="#"
   className="ml-8 bg-gray-700 px-4 py-2 rounded text-blue-50 flex items-center"
  >
   注册
   {/* <RightArrow className="h-4 w-4 ml-1 fill-neutral-400" /> */}
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-1 fill-neutral-300"
    viewBox="0 0 20 20"
    fill="currentColor"
   >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
</a>
```

可以把 SVG 封装成一个组件 , 直接引用 : 

- ```react
  import RightArrow from "./svg/RightArrow"
  ...
   .. <RightArrow className="h-4 w-4 ml-1 fill-neutral-400" /> .. 
  ```



如下 ,是封装成 React 组件的 SVG 文件 :

```react
// ./widgets/svg/RightArrow.js
import React from "react";

const RightArrow = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-1 fill-neutral-300"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  )
}
export default RightArrow;
```



> PS : `<RightArrow/ >`  是一个 svg 图片 , 只需要渲染一次就够了 , 不知道有没有优化的空间 ? 





## 2. Hero

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-152511.png" style="zoom:40%;" />

```react
import React from "react";
import Video from "../assets/production_ID_4167404.mp4";
import play_button from '../assets/play_button.svg'
import big_right_circle from '../assets/big_right_circle.svg'
import sm_left_circle from '../assets/sm_left_circle.svg'


export default function Hero() {
  return (
    <div className="grid justify-items-center gap-8 pb-28 relative">
      <p className="text-4xl md:text-6xl font-black text-center leading-normal md:leading-normal">
        打造充满创造力的网站
      </p>
      <p className="text-xl text-gray-700 md:w-1/2 text-center"> 这是一个完美的工具 </p>
      <div>
        <button className="rounded bg-blue-500 text-base text-white py-3 px-8">
          立即试用
        </button>
        <button className="rounded bg-gray-900 text-base text-white py-3 px-8 ml-3">
          了解更多
        </button>
      </div>
      <div className="relative w-full h-5 ">
        <img src={big_right_circle} width="256" height="256"
          viewBox="0 0 256 256" className="absolute right-0 -z-10" />
      </div>
      <div className="relative grid justify-items-center">
        <video
          src={Video}
          controls
          className="w-[768px] h-[432px] object-cover object-top rounded"
        ></video>
        <div className="flex absolute rounded-full bg-white -bottom-7 px-5 py-4 drop-shadow-xl">
          <img src={play_button} />
          查看2分钟演示视频
        </div>
      </div>
      <img src={sm_left_circle} className="absolute bottom-0 md:bottom-20 -left-10 -z-10" alt=".."/>
    </div>
  );
};
```



### tailwind 讲解 

relative 相对定位 : 

- 如果想让子元素相对于父元素绝对定位 , 使用子绝父相 ; 
- 如果子元素和父元素都是 relative , 那么都是相对于文档流来定位, 互不影响

```react
      <div className="relative w-full h-5 ">
        <img src={big_right_circle} width="256" height="256"
          viewBox="0 0 256 256" className="absolute right-0 -z-10" />
      </div>
这里的 big_right_circle 相对于 div 父元素绝对定位
div 父元素遵循文档流 ,在上一个 div 的下面自然出现 ;
```



  

`grid justify-items-center` : 

上下分别是 无 `justify-items-center`  和 有 `justify-items-center`  的区别 : 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-020406.png)





## 3. Solution 解决方案

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-021608.png" style="zoom:50%;" />

抽组件:  考虑上下 2 个粉色的部分 , 是通用的, 可以抽象成一个 `<SectionHeadeing>` 组件

```react
//  SectionHeading.jsx
import React from "react";

export default function SectionHeading({ title, subTitle }) {
  return (
    <div>
      <h2 className="text-[2.635em] font-black text-center">{title}</h2>
      <p className="text-xl mt-4 text-center text-gray-500">{subTitle}</p>
    </div>
  );
};
```

- `text-[2.635em] ` 使用了固定大小
- `<p leading-8>`  leading 设置行高



```react
// Solutions.jsx
import React from "react";
import SectionHeading from "./SectionHeading";
import Image1 from "../assets/pexels-photo-8348457.jpg";
import ThunderIcon from "./svg/ThunderIcon"


export default function Solutions() {
  return (
    <div>
      <SectionHeading
        title="解决方案"
        subTitle="解决方案.................."
      />
      <div className="grid lg:grid-cols-2 mt-20 gap-20">
        <div>
          <h3 className="mt-7 text-[32px] font-fold">强有力的工具</h3>
          <p className="mt-4 mb-8 text-gray-500">
            强有力的工具...................................................
          </p>
          <ul className="grid gap-3">
            {[1, 2, 3].map((v) => (
              <li
                key={v} className={`p-5 justify-between rounded border border-zinc-100 ${
                  v === 1 && "bg-zinc-200"
                }`}
              >
                <p className="text-lg font-bold">构建简单的生态系统</p>
                <div className="flex justify-between relative">
                  <p className="text-lg leading-7 mt-1">
                    构建简单的生态系统........................
                  </p>
                  <ThunderIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <img src={Image1} width="80%" alt="" />
      </div>
    </div>
  );
}
```

注意这里对不同的 `<li>` item 应用不同的 class : 

- `v === 1 && "bg-zinc-200"` 只有 v ===1 时 , 对其应用  `bg-zinc-200`







## 4.Howitwork

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-040409.png) 

```react
import React from "react";
import SectionHeading from "./SectionHeading";
import WorkIcon from "./svg/WorkIcon"

export default function HowItWorks() {
  return (
    <div>
      <SectionHeading
        title="工作流程"
        subTitle="如何工作如何工作....."
      />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <div key={v} className="grid justify-items-center gap-y-2">           
            <WorkIcon />
            <p className="text-xl font-bold">初步沟通</p>
            <p className="text-gray-500">
              初步沟通初步沟通初步沟通初步沟通初步沟通初步沟通
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
```





## 5. Client 客户关系

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-053401.png" style="zoom:50%;" />

```react
import React from "react";
import SectionHeading from "./SectionHeading";
import Facebook from "./svg/facebook";
import Tinder from "./svg/Tinder"
import Airbnb from "./svg/Airbnb"
import Hubspot from "./svg/Hubspot"
import Amazon from "./svg/Amazon"

export default function Clients() {
  return (
    <div>
      <SectionHeading
        title="被全球100000个客户信任"
        subTitle="被全球100000个客户信任"
      />
      {/* 各个公司 Icon */}
      <div className="flex flex-col lg:flex-row items-center md:justify-between gap-8 my-16">
        <Facebook />
        <Tinder />
        <Airbnb />
        <Hubspot />
        <Amazon />
      </div>
      <div className="grid justify-items-center border-2 rounded px-14 mt-28">
        <img
          alt=""
          className="w-24 h-24 rounded-full bg-gray-400 -translate-y-1/2"
        />
        <p className="mt-5 mb-4 text-xl font-medium">
          "我非常信任这家公司......"
        </p>
        <p className="text-lg font-bold">无名氏</p>
        <p className="text-gray-500 mb-8">
          XX 公司老总{" "}
          <a href="#" className="text-blue-500"> @Company</a>
        </p>
      </div>
    </div>
  );
};
```



## 6. Contact 联系我们

`over-hidden` : 溢出隐藏 , 文字超出的部分就看不到了

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-054459.png)

> 注意右侧几个气泡状的 SVG , 使用的是绝对定位 ( 子绝父相) ,  其父元素是 relative

```react
import React from "react";
import BackGroundCircleSVG from "./svg/BackGroundCircleSVG";

export default function Contact() {
  return (
    <div className="bg-black md:w-4/5 mx-auto relative overflow-hidden">
      <div className="w-full py-16 px-12">
        <h2 className="text-3xl text-white font-bold">来吧！强化你的公司！</h2>
        <p className="text-lg text-white mt-2 mb-6">
          这是增强信息
        </p>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <input
            type="text"
            name=""
            id=""
            className="bg-zinc-800 py-3 px-4 border border-zinc-700"
            placeholder="您的邮箱"
          />
          <button className="py-3 px-8 bg-blue-500 text-white text-base font-medium md:ml-2">
            立即开始
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-3">7天免费试用，无需支付</p>
      </div>
      <div className="absolute -right-10 bottom-0">
        <BackGroundCircleSVG />
      </div>
    </div>
  );
};
```





## 7. Footer 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-144058.png" style="zoom:50%;" />

```react
import React from "react";
import Logo from "../logo.svg";

export default function Footer() {
  return (
    <footer className="grid gap-8 md:gap-0 text-gray-500 md:w-4/5 mx-auto mt-32 md:grid-cols-5">
      <div>
        <img src={Logo} alt="" className="w-8 h-8" />
        <p>
          <a href="#">协议</a>.<a href="#">隐私</a>
        </p>
      </div>
      {[1, 2, 3].map((v) => (
        <nav key={v} className="grid gap-2">
          <p className="text-lg text-black">产品介绍</p>
          <a href="">产品介绍1</a>
          <a href="">产品介绍2</a>
          <a href="">产品介绍3</a>
        </nav>
      ))}
      <nav className="grid gap-2 content-start">
        <p className="text-base text-black">注册</p>
        <p>快来注册吧......</p>
        <input
          type="text"
          name=""
          id=""
          className="py-2 px-3 border"
          placeholder="您的邮箱"
        />
      </nav>
      <div className="col-span-full mt-12 border-t py-9 flex flex-col gap-4 justify-between md:flex-row">
        <p>
          由{" "} <a href="https://cruip.com/" className="text-blue-500">
            Cruip </a>{" "} 提供设计. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
```

