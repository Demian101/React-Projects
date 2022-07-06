// Tour.js
import React, { useState } from 'react';

const Tour = ({ id, image, info, name, price, removeTour }) => {  // 对 object 对象解包
  const [readMore, setReadMore] = useState(false);  // 是否要展开阅读 ?
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>                          
          <h4 className="tour-price">${price}</h4> 
        </div>
        <p>
          {readMore ? info : info.substring(0, 200)}  
          
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </button>

        </p>
        // 移除 Tour 卡片不是 Tour 的 property ,故不在这里实现.
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;