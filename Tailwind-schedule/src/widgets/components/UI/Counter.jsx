import React, {useContext} from 'react';
// import classes from './Counter.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
// import CartContext from "../../../store/cart-context";


<FontAwesomeIcon icon="fa-solid fa-circle-plus" />
/*
*   引入FontAwesome
*       - 安装依赖
*           npm i --save @fortawesome/fontawesome-svg-core
            npm i --save @fortawesome/free-solid-svg-icons
            npm i --save @fortawesome/free-regular-svg-icons
            npm i --save @fortawesome/react-fontawesome@latest

            yarn add @fortawesome/react-fontawesome@latest @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons

        - 引入组件
               import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
        - 引入图标
                import {faPlus} from "@fortawesome/free-solid-svg-icons";
        - 使用组件
                <FontAwesomeIcon icon={faPlus}/>
*
* */

// 计数器的组件
const Counter = (props) => {

    /*
    // 获取cartContext
    const ctx = useContext(CartContext);

    // 添加购物车的函数
    const addButtonHandler = () => {
        ctx.cartDispatch({type: 'ADD', meal: props.meal});
    };

    // 减少食物个数的函数
    const subButtonHandler = () => {
        ctx.cartDispatch({type: 'REMOVE', meal: props.meal});
    };
    */

    return (
        <div>
            { // 不显示 sub ➖ 组件
                (1 === 1) ? (
                    <>
                           {/* onClick={subButtonHandler}
                            // className={classes.Sub} */}
                        <button>
                            <FontAwesomeIcon icon={faMinus}/></button>
                        <span> 2 </span>  {/* className={classes.count} */}
                    </>
                ) : null
            }
            {/* 显示 add ➕ 组件 */}
            <button>
                <FontAwesomeIcon icon="fa-solid fa-plus" />
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
        
    );
};

export default Counter;
