一般在使用axios时，会用到拦截器的功能，一般分为两种：请求拦截器、响应拦截器。

1. 请求拦截器
    在请求发送前进行必要操作处理，例如添加统一cookie、请求体加验证、设置请求头等，相当于是对每个接口里相同操作的一个封装；
2. 响应拦截器
    同理，响应拦截器也是如此功能，只是在请求得到响应之后，对响应体的一些处理，通常是数据统一处理等，也常来判断登录失效等。



关于拦截，这里只说原理，前端的请求，最终还是离不开 ajax，像 vue 的 vue-resource 、axios，都只是对 ajax 进行了统一的封装，它暴露出来的拦截器，其实就是写了一个方法，把 ajax 写在这个方法里面，（我们先说请求拦截器哈）在执行这个方法的时候，先将请求时要添加给请求头的那些数据（token、后端要的加密码…具体要看实际情况）先执行一遍，都赋值给一个变量，然后再统一传给 ajax ，接下来就是执行 ajax ，这就是所谓的请求拦截，其实就是先执行要添加的数据，然后再执行 ajax ，如果把这个添加数据的过程抽出来，就成了所谓的请求拦截器；



响应拦截器： 响应拦截器的作用是在接收到响应后进行一些操作，例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页。

响应拦截器也是一样如此，就是在请求结果返回后，先不直接导出，而是先对响应码等等进行处理，处理好后再导出给页面，如果将这个对响应码的处理过程抽出来，就成了所谓的响应拦截器；





### 创建axios实例

```jsx
// 引入axios
import axios from 'axios'

// 创建实例
let instance = axios.create({
    baseURL: 'xxxxxxxxxx',
    timeout: 15000  // 毫秒
})
```



### 请求拦截器

```react
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，例如加入token
    .......
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```



### 响应拦截器

```react
axios.interceptors.response.use(function (response) {
    // 在接收响应做些什么，例如跳转到登录页
    ......
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```



