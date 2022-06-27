import React, {useReducer, useState} from 'react';
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Cart from "./components/Cart/Cart";
import MEALS_DATA from './data'

const cartReducer = (state, action) => {
    // 复制购物车， 这里的 action 接收 2 个参数 { type: (ADD|REMOVE|CLEAR), meal: '具体添加或删除的汉堡 item'}
    const newCart = {...state};

    switch (action.type){
        default:
            return state;
        case 'ADD':
            // 增加一个事物到购物车里，我们需要知道具体是哪个食物： 所以需要向 action 对象里传入 meal。
            if (newCart.items.indexOf(action.meal) === -1) {
                newCart.items.push(action.meal);
                action.meal.amount = 1;
            } else {
                action.meal.amount += 1;
            }
            newCart.totalAmount += 1;
            newCart.totalPrice += action.meal.price;
            return newCart;
        case 'REMOVE':
            action.meal.amount -= 1;
            if (action.meal.amount === 0) {
                newCart.items.splice(newCart.items.indexOf(action.meal), 1);
            }
            newCart.totalAmount -= 1;
            newCart.totalPrice -= action.meal.price;
            return newCart;
        case 'CLEAR':
            newCart.items.forEach(item => delete item.amount);
            newCart.items = [];
            newCart.totalAmount = 0;
            newCart.totalPrice = 0;
            return newCart;
    }
};

const App = () => {

    // 创建一个state用来存储食物列表
    const [mealsData, setMealsData] = useState(MEALS_DATA);

    // state Reducer， 用来保存购物车的状态数据
    const [cartData, cartDispatch] = useReducer(cartReducer,{
        items: [],      // 1. 商品 [] items
        totalAmount: 0, // 2. 商品总数（totalAmount）
        totalPrice: 0   // 3. 商品总价（totalPrice） 
    })

    // 创建一个过滤meals的函数
    const filterHandler = (keyword) => {
        const newMealsData = MEALS_DATA.filter(item => item.title.indexOf(keyword) !== -1);
        setMealsData(newMealsData);
    };

    // 向购物车中添加商品
    const addItem = (meal) => {
        const newCart = {...cartData};
        // 判断购物车中是否存在该商品
        if (newCart.items.indexOf(meal) === -1) {
            // 将meal添加到购物车中
            newCart.items.push(meal);
            // 修改商品的数量
            meal.amount = 1;
        } else {
            // 已在购物车里存在，只需增加商品的数量
            meal.amount += 1;
        }

        /* 增加总数
        newCart.totalAmount += 1;
        newCart.totalPrice += meal.price;*/

        // 重新设置购物车
        // setCartData(newCart);
        setCartData( (oldCart) => ({
            ...newCart, 
            totalAmount: oldCart.totalAmount + 1 , 
            totalPrice: oldCart.totalPrice + meal.price 
        }));
    };

    //减少商品的数量
    const removeItem = (meal) => {
        const newCart = {...cartData};

        // 减少商品的数量
        meal.amount -= 1;

        // 检查商品数量是否归0
        if (meal.amount === 0) {
            // 从购物车中移除商品
            newCart.items.splice(newCart.items.indexOf(meal), 1);
        }

        /* 复制购物车 ,修改商品总数和总金额
        const newCart = {...cartData};
        newCart.totalAmount -= 1;
        newCart.totalPrice -= meal.price; */

        setCartData( (oldCart) => ({
            ...newCart, 
            totalAmount: oldCart.totalAmount - 1 , 
            totalPrice: oldCart.totalPrice - meal.price 
        }));
    };

    const clearCart = () => {

        const newCart = {...cartData};
        // 将购物车中商品的数量清0
        newCart.items.forEach(item => delete item.amount);
        newCart.items = [];
        newCart.totalAmount = 0;
        newCart.totalPrice = 0;

        setCartData(newCart);
    };

    return (
        // <CartContext.Provider value={{...cartData, addItem, removeItem, clearCart}}>
        <CartContext.Provider value={{...cartData, cartDispatch}}>
        
            <div>
                <FilterMeals onFilter={filterHandler}/>
                <Meals
                    mealsData={mealsData}
                />
                <Cart/>

            </div>
        </CartContext.Provider>
    );
};

export default App;
