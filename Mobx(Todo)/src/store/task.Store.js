
import {  makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
class TaskStore {
  list = [
    {
      id:1,
      name: '学习react',
      isDone: true
    },
    {
      id:2,
      name: '搞定mobx',
      isDone: false
    }
  ]
  constructor() {
    makeAutoObservable(this)
    console.log("..", this.list)
  }

  // 单选操作
  singleCheck(id, isDone){
    // 按 id 查找, 不是 React，所以不用 filter .. 原地修改即可
    const item = this.list.find(item => item.id === id )
    item.isDone = isDone
    // console.log("item.isDone,isDone", item.isDone,isDone)
  }

  // 全选操作： 把所有项的 isDone 属性都按照传入的最新的状态修改
  allCheck(checked) {
    this.list.forEach(item => {
      item.isDone = checked
    })
  }
  // 计算属性： 只有所有子项都是选中的时候，才是选中的状态
  // list.every 会检查每一个数组元素是否满足条件表达，只有都满足才返回 true
  get isAll(){
    console.log("this.list.every(item => item.isDone)", this.list.every(item => item.isDone))
    return this.list.every(item => item.isDone) // true of flase 
  }

  get isFinishedLength(){
    return this.list.filter(item => item.isDone).length
  }
  // Delete Todo
  delTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }

  // Add new Todo
  addTask = (task) => {
    this.list.push(task)
  }
}
export default TaskStore