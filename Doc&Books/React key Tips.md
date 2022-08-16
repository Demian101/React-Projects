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





数据状态管理: DRY 原则

1. 能计算得到的状态就不要单独存储
2. 组件尽量无状态,所需数据通过props获取







### Object 在 return 中的遍历

```react
export default function Sidebar() {
  const componentsPath = {
    'xx' : 3,
    'yy' : 4,
  }

  return (
    <div>
      {/* 对象插入 React 中的遍历方法 */}
      { Object.keys(componentsPath).map((key, value) => {
        return (<button key={key} > {value} </button>)
      }) }
    </div>
  )
}
```

