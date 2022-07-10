import './index.css'
import { useStore } from '../store'
import { observer } from 'mobx-react-lite'
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers'
import React, {useState} from 'react'
import uuid from 'react-uuid'

function Task() {
  // useStore
  const {taskStore} = useStore()

  // 单选受控,每一个列表都有自己的状态， mobx Store 去维护状态
  // input 只需要把 e.target.value 交给 store 让它来进行修改, 改完之后再反向影响视图
  const onChange = (id, e) => {
    console.log(id, e.target.checked)
    taskStore.singleCheck(id, e.target.checked)  
  }
  
  // 全选
  const allChange = (e) => {
    taskStore.allCheck(e.target.checked)
  }

  // Del Todo task
  const delTask = (id) =>{
    taskStore.delTask(id)
  }

  // Add new Todo
  const [taskValue, setTaskValue] = useState('')
  const addTask = (e) => {
    console.log("e.keyCode",e.keyCode)
    if (e.keyCode === 13  && taskValue !==''){   // 回车
      taskStore.addTask(
        {
          id: uuid(),
          name: taskValue,
          isDone: false
        }
      )
      setTaskValue('')
    }
  }

  const aaa = taskStore.isAll
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        {/* Add Todo input */}
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          value = {taskValue}
          onChange={(e) => setTaskValue(e.target.value,e) }
          onKeyUp={addTask} // 为啥这里不能传入 e ？
          placeholder="What needs to be done?"
        />
      </header>
      <section className="main">
        {/* 全选 icon */}
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}  // 只有所有 item 都满足 true 才能使此处的 checked 为 true
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {/* completed 类名标识 */}
          {
            taskStore.list.map((item) => (
              <li
              className={item.isDone ? "todo completed" : "todo"}
              key = {item.id}
            >
              <div className="view">
                {/* 单选框 ——「完成、未完成」 */}
                <input className="toggle" type="checkbox" 
                  checked={item.isDone}  // 是否选中
                  onChange = {(e) => onChange(item.id, e) }
                  />
                <label > {item.name} </label>
                <button className="destroy"
                  onClick={ () => delTask(item.id) }></button>
              </div>
            </li>
            ))
          }

        </ul>
      </section>

      <footer className='footer'>
        <span className='todo-count'>
          任务总数:{taskStore.list.length} , 已完成 {taskStore.isFinishedLength}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)  // 包裹之后才是一个响应式数据，才能引起视图变化