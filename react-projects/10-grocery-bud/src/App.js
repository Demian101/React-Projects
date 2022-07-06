import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

// `window.localStorage` 允许在浏览器中长期存储 key/value 数据。
const getLocalStorage = () => {
  // list 是对象数组 [{id: "..", name: ".."}, {…}]
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {  return [];  }
};

export default function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();   // 阻止 submit 提交后自动 flush 页面
    if (!name) {   // 若用户未输入 就尝试提交，在顶部 show 这个 Alert
      showAlert(true, 'danger', 'please enter value');  // 
    } 
    else if (name && isEditing) {   // 用户处在 Edit 编辑状态，需要在 getLocalStorage 中获取 list 并改、写
      setList(  
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };   // 将找到的元素，设置为用户输入的 name
          }
          return item;  // list 中其他元素保持不变，原路返回（ item 是 obj {id:'..', title: '..'}）
        })
      );
      setName('');     // 把输入框清空
      setEditID(null);   // Edit 状态回到 false
      setIsEditing(false);  // Edit 状态回到 false
      showAlert(true, 'success', 'value changed');
    } 
    else {     // 新增记录
      showAlert(true, 'success', 'item added to the list');
      // id 据 now 的 Date() 生成, 确保独一无二
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);  // Push/update element at end of array of objects
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };
 
  const editItem = (id) => {
    // return 满足 ` === id` 的 list 中的第一个元素
    const specificItem = list.find((_i) => _i.id === id);  // 是 Any 类型
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>   
        {/* Alert 组件接收 ： { type, msg, removeAlert, list }    */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud 杂货店</h3>
        <div className='form-control'>
          <input       // text input 组件，接受用户输入
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => {setName(e.target.value)}}  // name 
          />
          {/* submit 类型的 Button，点击后触发母 form 的 onSubmit 事件 */}
          <button type='submit' className='submit-btn'> 
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}