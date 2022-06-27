npm

```
npx create-strapi-app@latest my-project --quickstart
```

yarn

```
yarn create strapi-app my-project --quickstart
```

----

如果遇到 : `fatal error: 'vips/vips8' file not found`

可以试试: 

```bash
npm i sharp

或者复制 终端代理, 
再跑一遍 

npx create-strapi-app@latest my-project --quickstart
```



Strapi 启动 : 

```bash
npm run start
```





项目创建后会自动启动，浏览器会自动打开链接地址：http://localhost:1337/admin，由于是第一次启动项目，所以会弹出一个注册窗口，这里需要注册一个新的管理员账号。

对于我们来说API服务器仅仅会运行在本地服务器中，所以账号什么的其实没那么重要，随意注册一个即可。注册完成后，点击Let’s start即可进入到项目页面。



## 添加内容类型

Strapi是一个内容管理系统，何为内容呢？其实就是数据库中的数据类型。比如，一个用户信息就是一个内容、一件商品的信息也是一个内容，所以要想使用 API需 要先添加一个新的内容类型、然后再对齐添加对应的数据，最后才能够通过API访问到这些数据。下边我们尝试着添加一个新的类型students，用来存储学生的信息。

点击左侧导航栏中的Content-Type Builder，这是Strapi中的内容类型构建器，点击它可以进入类型定义的界面。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161232525.png)

点击创建一个新的Content Type进入到定义界面

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161346751.png)

在弹出的窗口中设置类型的名称，由于是学生信息所以命名为student，注意编写单数即可，Strapi会自动生成复数。填写后点击Continue。




<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161426917.png" alt="img" style="zoom:50%;" />

接下来会进入到字段的定义界面，该界面用来定义一个类型中需要包含哪些数据：

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161647586.png" alt="img" style="zoom:50%;" />

学生我们要设置4个字段，分别为姓名（文本）、性别（文本）、年龄（数字类型）和地址（文本类型），我们一个一个的添加。

姓名：

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516162411780.png" alt="img" style="zoom:67%;" />

性别：

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516162822469.png" alt="img" style="zoom:50%;" />

年龄和地址：

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163450219.png" alt="img" style="zoom:50%;" />

添加完成后，点击右上角的Save按钮保存操作，点击save后服务器会自动重启，稍等即可。





## 添加数据

创建类型后，点击左上角的Content Manager来向系统中添加学生信息：


![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163733988.png)

选中student，然后点击添加条目，尝试添加几条数据



<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163845649-1024x264.png" alt="img" style="zoom:50%;" />

保存后，点击发布按钮，数据才能正常访问，也可以在内容类型中设置自动发布。添加完成后列表中有如下的学生信息：

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516164113122-1024x195.png" alt="img" style="zoom:67%;" />

添加内容类型实际上相当于数据库的建表，添加数据相当于向数据库中插入数据，我们的操作在Strapi中实际上也会转换为对数据库的操作。



## 设置API权限

数据设置完了，我们还需要开发API的访问权限，分别点击settings –> roles –> public

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516170117749.png" alt="img" style="zoom:67%;" />

public中设置的是公共访问API的权限，也就是无需登录即可访问。然后选中student，开始设置student的权限，这里我设置了student的所有权限，实际开发中，可以根据实际情况设置。

<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516170307522.png" alt="img" style="zoom:67%;" />create表示创建，delete表示删除，find表示查询，findOne查询指定，update修改。设置权限后点击save即可正常开始使用API了。



## 测试

查询功能可以直接通过浏览器测试，查询API的路径为`/api/students`使用时还需要添加上服务器的路径即`http://localhost:1337/api/students`，直接在浏览器中访问该地址，如果API设置成功，应当可以看到JSON格式的数据。

创建需要发送post请求，删除需要发送delete请求，修改需要发送put请求，这些请求可以通过postman操作。

创建：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516172142493-1024x785.png)

删除：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516172252853.png)

修改：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516172533931.png)

## 总结

Strapi的使用起来并不复杂，大体步骤如下：

1. 创建项目
2. 注册用户
3. 修改语言
4. 创建内容类型
5. 添加数据
6. 设置权限

当然我们现在使用它的主要目的并不是将它使用到生产环境中，而是让它为我们测试React提供接口，所以它更多的功能我们暂且先放到一边，后边的课程中，我们会根据需要在对Strapi的相关知识进行扩充。