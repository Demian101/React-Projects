## 什么是打包 ? 

js作为一门脚本语言，**在没有node的时候**，只能通过 `<script>` 标签插进html去运行，单个的js文件离开了html他什么都不是。如果一个网站功能很多，我要按照功能划分写15个js文件，那我就要插入15个 `<script src="">` 去引那些js文件，还 tm 得注意引用顺序和插入的位置，一方面难以维护，一方面增加了网页加载时的请求数量（15个不算多，如果是200个js文件的话，那得多蛋疼）。

**自从有了node之后**，单个的js文件离开了html以后也可以在终端run起来了，我们前端可以和别的语言一样在命令行里玩编程！模块化标准实施之后，js就有了“引入”和“导出”的概念，**这带来的革命性变化便是**：当我们写业务的时候再也不用蛋疼地去在html里写15个 `<script src="">` 去运行js了。我只要插入一个作为入口的总的script标签，另外的14个js文件都作为模块导出，并导入到这个入口的js（通常叫`main.js`， 这 15 个 js 文件也可以互相导入导出什么的，毕竟在 node 环境下，每个 js 文件都是一个单独的模块）。

但问题在于，一旦 js 文件以 `<script src="">` 的形式插入 html，那么 require、export、import 之类的模块语法就会报错，因为**浏览器不支持模块化**，模块语法是建立在 node 的环境下才有的。webpack 等打包工具的一个作用就是让我们插入一个 script 标签的同时，还允许我们在 js 文件之间使用 export、import、require 这些语法，并且非常智能地把这些 js 模块合并压缩成1个（或2个或以上）大大的紧实的js文件。

总结：打包工具可以让我们在开发网页的时候使用 import export require，像后端程序员那样进行模块化开发。



## package.json

### scripts 

如果在 scripts 里面有配置

```
"scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "unit": "karma start test/unit/karma.conf.js --single-run",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
  },
```

运行 `npm run dev` 的时候执行的是 `build/dev-server.js`文件，

> dev 理解为开发环境，运行需要 node 与 npm环境，相当与在本地node中运行了一个前端服务器。

运行 `npm run build` 的时候执行的是 `build/build.js` 文件。

> build 可以理解为构建工具，可以将前端的静态资源以及 js 源码打包并压缩，打包成一个新的静态的 static 资源文件夹，放在Web容器（Tomcat / Ngnix）中即可运行。由于是静态资源，可以直接替换 web 容器的static资源文件就能达到升级效果。

- run prod   : 发布到生产环境



### dependencies & devDependencies

> 面试官：请讲讲 `dependencies`和`devDependencies`的区别？
>  

简单，

- dependencies是**生产**环境的依赖，安装包时执行`npm install -S xxx`；
- devDependencies 是**开发**环境的依赖， 安装包需要执行 `npm install -D xxx`

生产环境和开发环境指什么？如果不小心将 react 或 vue 这种依赖安装到 `devDependencies`列表中项目还能运行吗？



`dependencies`往往是指打包构建后依赖包的代码会被打进产物中，在生产环境运行中是不可缺少的。

`devDependencies`是指那些开发、构建过程中那些工具，如构建使用的webpack、代码检查的 eslint、代码转义的 babel 等都属于开发环境依赖。他们存在的目的是：帮助我们将开发的代码安全、便捷的转换成用户浏览器可执行的代码。但是部署到了服务器后, 对于用户来说, 已经完全不需要什么打包工具 / 代码检查了

