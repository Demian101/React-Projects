# 汉堡到家 App

```react
yarn start

F12 切换到手机浏览模式
```



<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220506173307498.png" style="zoom:40%;" />



<img src="https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220506213746650-1024x579.png" alt="img" style="zoom:75%;" />



主要学习目标 : 

- 遮罩层/情态框 的展示和不展示
- 层级之间的事件停止冒泡



----

2 个页面都需要用到 Meal 组件 ,但是页面 2 不想 show Meal 组件的某个属性 , 怎么办 ? 

```react
// Meal.js
//    在 Meal 组件这样写即可 : 
//    要不要 show meal.desc 取决于传入的参数 : "noDesc"
{ noDesc ? null : <p className={classes.Desc}>{meal.desc}</p>}


// Page 2 : 
const [noDesc,setNoDesc] = useState(flase);
<Meal noDesc key={item.id} meal={item}/>
```







## 静态资源

汉堡包这种商家可以自行修改的文件一般是放在后台 ( ./Public)

像是页面资源这种 8 辈子不会改一次的静态资源一般放在 CDN (?) 服务器,  减轻访问的负担 ( ./asset )





## 遮罩层

1. 先在 index.html 定义根节点 id 
   1. 如下是 `backdrop-root`  

```react
// .public/index.html
...
<body>
<noscript>您的浏览器不支持JS。</noscript>
<div id="root"></div>
<div id="backdrop-root"></div>
</body>
</html>
```



## useContext 存储购物车内的数据

1. 外部创建一个 Store 存储, 作为容器
2. 根组件中定义要向下传递的参数状态 ( 作为 Provider 提供 value )
3. 下层的组件使用 `const  `  ( 作为 Consumer 使用 value)

```react
├─ App.js   > 作为 Provider 向下提供 value,  useContext 可以向子树组件传递状态, 
├─ Store
│   └── cart-context.js  > 作为容器, 定义在其内存储的数据
├─ components
│   └── Cart.js
│      └── Cart.js   > 作为子组件, 使用
```



```react
// ./src/store/cart-context.js
import React from 'react';
const CartContext = React.createContext({   // 声明一下就好, 真正的数据在 App.js 里向下传递
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    addItem: () => { },
    removeItem: () => { },
    clearCart: ()=>{ }
});
export default CartContext;


// App.js
import CartContext from "./store/cart-context";
    ...
    return (
      // 把要往下传递的值在这里定义
      // 后面的子组件会根据就近原则原则合适的 Store 存储内容
      <CartContext.Provider value={{...cartData, addItem, removeItem, clearCart}}>
          <div>
              <FilterMeals onFilter={filterHandler}/>
              <Meals
                  mealsData={mealsData}
              />
              <Cart/>

          </div>
      </CartContext.Provider>
    );


// Cart.js
// 将导入的 CartContext 放入 useContext :  useContext(CartContext) 勾住
import CartContext from "../../store/cart-context";
const Cart = () => {  // 购物车组件
    const ctx = useContext(CartContext);
    if(ctx.totalAmount === 0){ ...  }   // 购物车已经被清空
    ...
}
```

