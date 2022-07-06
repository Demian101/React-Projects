import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, removeItem, editItem }) => {  // 老生常谈 不讲了
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        // console.log(item)  // {id: '1653313901723', title: 'Apple'}
        const { id, title } = item;
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => { console.log("1. title",title); editItem(id);}}  // 修改后触发渲染
              >
                <FaEdit />  {/* 导入的 Edit icon */}
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)} // 修改后触发渲染
              >
                 <FaTrash />  {/* 导入的 Delete icon */}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
export default List;
