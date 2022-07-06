import React, { useEffect } from 'react';

// Alert 会在页面上方 render 一个警示栏，持续 3s 后消失
const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();   // 3 s 后调用 removeAlert 移除 Alert 。
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
