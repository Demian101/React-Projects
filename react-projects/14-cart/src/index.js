import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context';
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App /> {/* <App /> 组件及其子组件都是 APPProvider 的 children   */}
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
