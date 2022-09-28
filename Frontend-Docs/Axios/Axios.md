1. 前端最流行的 ajax 请求库
2. react/vue 官方都推荐使用 axios 发 ajax 请求
3. 文档: https://github.com/axios/axios



<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-08-26-021453.png" style="zoom:50%;" />



快速搭建后端 API  :

```bash
npm install -g json-server

# Create a db.json file with some data
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}

# Start JSON Server
json-server --watch db.json
```

