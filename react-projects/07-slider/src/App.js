import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import data from './data';

export default function App() {
  const [people, setPeople] = useState(data);     // setPeople 没用到
  console.log(people)    // 老生常谈，  (4) [{}, {}, {}, {}]  people 是具有 4 个 obj 的 List
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);  //  index 或 people 只要有一个改变, 就会触发本 useEffect

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span> reviews </span> 
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {  // people 是 List， person 是 obj，personIndex 是 0 ~ n
          const { id, image, name, title, quote } = person;
          console.log("personIndex, name：", personIndex, name)   //Attention
          let position = 'nextSlide';  // translateX(100%)  
          if (personIndex === index) {
            position = 'activeSlide';  // translateX(0%)
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';  // translateX(-100%)
          }

          return (  // people List 里的每个 obj 都会 render <article> 元素出来
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
            </article>
          );
        })}

        {/* 左 右 切换轮播按钮 */}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}