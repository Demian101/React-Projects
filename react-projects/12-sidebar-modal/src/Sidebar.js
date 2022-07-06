import React from 'react';
import logo from './logo.svg';
import { useGlobalContext } from './context';
import { FaTimes } from 'react-icons/fa';
import { social, links } from './data';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    // isSidebarOpen 为 true : className='sidebar show-sidebar'  显示侧边栏
    // isSidebarOpen 为 false: className='sidebar'  不显示侧边栏
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}> {/* false */} 
      <div className='sidebar-header'>
        <img src={logo} className='logo' alt='coding addict' />
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />    {/*  `×` : 表示关闭 sidebar 边栏 */}
        </button>
      </div>
      <ul className='links'>  {/* sidebar 显示的内容 */}
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
                {icon}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className='social-icons'>
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
