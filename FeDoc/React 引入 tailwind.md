# React 中使用 tailwind 样式框架

 官网：https://www.tailwindcss.cn/

 框架( react + antd ) : https://ant.design/docs/react/introduce-cn

https://www.programminghunter.com/article/65032441029/

 

1. 创建react 项目：

```
npx create-react-app antd-demo-ts --template typescript
```

 

 开发方式建议使用：npm

 

2. 进入项目

初始化 Tailwind CSS，安装 Tailwind 以及其它依赖项: 

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

 

由于 Tailwind 不会自动添加浏览器引擎前缀到生成的 CSS 中，我们建议您安装 autoprefixer 去处理这个问题，就像上面的代码片段所展示的那样。

官网安装的是postcss7兼容版本，我这里直接安装`postcss8`





\3. 安装和配置 CRACO

由于 Create React App 不能让您覆盖原生的 PostCSS 配置，所以我们还需要安装 CRACO 才能配置 Tailwind。

```
npm i @craco/craco@7.0.0-alpha.3
```


官网的命令是npm install @craco/craco，这样会导致craco版本不够新，也就是运行报错的关键，所以使用我这边的命令，安装最新版本的craco

安装完毕后，更新 package.json 文件中的 scripts，将 eject 以外的所有脚本都用 craco 代替 react-scripts。

```
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
},
```



 

\4. 在项目根部创建一个 craco.config.js，并添加 tailwindcss 和 autoprefixer 作为 PostCSS 插件。

```
// craco.config.js
module.exports = {
  style: {
    postcssOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
```

>  注意这里把官网里的postcss改成了postcssOptions

 

\5. 创建您的配置文件接下来，生成您的 tailwind.config.js文件：

```
npx tailwindcss-cli@latest init
```

 


这将会在您的项目根目录创建一个最小化的 tailwind.config.js 文件：

```
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

 


\6. 配置 Tailwind 来移除生产环境下没有使用到的样式声明
在您的 tailwind.config.js 文件中，配置 purge 选项指定所有的 components 文件，使得 Tailwind 可以在生产构建中对未使用的样式进行摇树优化。

```
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

 

 

\7. 在您的 CSS 中引入 Tailwind
打开 Create React App 默认为您生成的 ./src/index.css 文件 并使用 @tailwind 指令来包含 Tailwind的 base、 components 和 utilities 样式，来替换掉原来的文件内容。

```
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```


Tailwind 会在构建时将这些指令转换成所有基于您配置的设计系统生成的样式文件。

阅读我们的文档添加基础样式，提取组件，和添加新的功能类，以获得用您自己的自定义 CSS 扩展 Tailwind 的最佳实践。

最后，确保您的 CSS 文件被导入到您的 ./src/index.js文件中。

```
import './App.css'; 
```



您已经完成了所有步骤！现在，当您运行 npm run start, Tailwind CSS 就可以在您的 Create React App 项目中使用了。 









# 讲道理不需要这么复杂...

https://medium.com/codingthesmartway-com-blog/how-to-use-tailwind-css-with-react-9dd78bbdc0e0

Medium 这篇 , 很简易地就可以使用 tailwind 了..



```
$ npx create-react-app react-app-with-tailwind
$ cd react-app-with-tailwind

$ npm install -D tailwindcss postcss autoprefixer

$ npx tailwindcss init -p
```



```react
// tailwind.config.js
module.exports = {
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
     extend: {},
   },
   plugins: [],
 }


// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


// src/App.js
function App() {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <p className="text-gray-500 text-lg">
        React and Tailwind CSS in action
      </p>
    </div>
  );
}
export default App;
```



```
$ npm run start
```

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220602215700920.png" alt="image-20220602215700920" style="zoom:50%;" />