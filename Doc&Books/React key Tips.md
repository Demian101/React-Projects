### 事件绑定 :

1. 无需传递额外参数, 直接调用, 不需要加 ()

```react
// 注意不要写成 onClick={clickHandler()  }
<button onClick={clickHandler}>click me!</button>  
```



2. 想传递额外的参数 (如在循环中) 传递给事件处理程序, 需要写成箭头函数的形式 。

```react
<button onClick={ (e) => deleteRow(item.id, e)}>Delete Row</button>

或者省略 e : 

<button onClick={ (e) => deleteRow(item.id)}>Delete Row</button>
```

表示 React 事件的 e 参数将作为 ID 之后的第二个参数传递。





