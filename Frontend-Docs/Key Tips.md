## 踩过的坑：

**子组件需要用到父组件 fetch 的数据**

比如 ： `<Main>` 组件 fetch 数据  **`data`** ， 传到 `<WordPreview>` 里面

但是因为  `<WordPreview>`  是同步渲染的，一开始会渲染一个空的 `<WordPreview>` 的组件（因为此时数据还没异步传输过来）

如果   **`data`**  变化不能引起 `<WordPreview>`  变化，那么就会出现`<WordPreview>`   不渲染的情况。



解决方案 —— 在 `<Main>` 中限制   **`data`**  出现后才渲染：

```	



### 父组件获取子组件数据：

如果子组件想向父组件传递某些值，或者是子组件在执行某一段逻辑后想执行父组件中的某一段逻辑，此时可以在父组件中写好对应的逻辑函数，通过props传递这个函数给子组件进行调用即可。

如果传递的函数需要进行昂贵的计算，需要优化的时候使用useCallback配合memo 。

```react
import React, { useState } from 'react';
import { Button } from 'antd';

// 父组件
const CallbackCom = () => {
    const [count, setCount] = useState(0);

    // 获取子组件传过来的value值并设置到count，val参数就是子组件的value值
    const getChildrenValue = (val) => {
        setCount(val);
    };

    return (
        <div>
            <h2>父组件</h2>
            <p>获取子组件传过来的值：{count}</p>
            {/* 这里是重要代码，向子组件传递getValue这个prop，它的值是一个回调函数 */}
            <ChildrenCom getValue={getChildrenValue} />
        </div>
    );
};

// 子组件
const ChildrenCom = (props) => {
    const [value, setValue] = useState(0);

    const addValue = () => {
        setValue(value + 1);
        // 向父组件传递每次递增的value值
        props.getValue(value + 1);
    };

    return (
        <div>
            <h4>子组件</h4>
            <Button onClick={addValue}>点击改变子组件的value值：{value}</Button>
        </div>
    );
};

export default CallbackCom;


```



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


// 调用的时候：
const deleteRow = (id) => {
  console.log('id', id )
}



```

表示 React 事件的 e 参数将作为 ID 之后的第二个参数传递。



3. **想传递额外的参数和 e：**

```react
<button onClick={ (e) => deleteRow(item.id, e)}>Delete Row</button>

const deleteRow = (id, e) => {
  console.log('id', id )
}
```





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



### Object 使用 Map

将对象转化为数组，就可以用 Map 了：

```react
// Object.entries() 把对象转换成数组
class App extends React.Component {
  render() {
    let obj = {
      a: 1,
      b: 2,
      c: 3
    }
    return (
      <ul>
        {
          Object.entries(obj).map(([key, value], index) => {   // item是一个数组，把item解构，写法是[key, value]
            return <li key={key}>{value}</li>
          }) 
        }
      </ul>
    )
  }
}

---- Console: ---- ---- ---- ---- 
obj = {'a':2, 'b':3}
Object.entries(obj)
> (2) [Array(2), Array(2)]
> 0 :   ['a', 2]
> 1 :   ['b', 3]
```





| 哈希算法  | 输出长度(bit) | 输出长度(字节) |
| :-------- | :------------ | :------------- |
| MD5       | 128 bit       | 16 bytes       |
| RipeMD160 | 160 bits      | 20 bytes       |
| SHA-1     | 160 bits      | 20 bytes       |
| SHA-256   | 256 bits      | 32 bytes       |
| SHA-512   | 512 bits      | 64 bytes       |

