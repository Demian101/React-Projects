import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';
const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        {/* Attention ！  categories 是 List 类型 ， filterItems 是一个函数,  */}
        {/* 这两个被封装成一个 obj 传递到组件 */}
        <Categories categories = {categories} filterItems = {filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
