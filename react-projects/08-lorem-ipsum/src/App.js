import React, { useState } from 'react';
import data from './data';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amt = parseInt(count);
    if (count <= 0) { amt = 1; }
    if (count > 8)  { amt = 8; }
    setText(data.slice(0, amt)); // amt
  };
  return (
    <section className='section-center'>
      <h3> Generate some text?</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='aamt'> counts:</label>
        <input
          type='number'  // 标识是数字加减的 Input
          name='amt'     
          id='aamt'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className='btn'> generate </button>
      </form>
      <article className='lorem-text'>
        {text.map((item, index) => {
          return <p key={index}> {item} </p>;
        })}
      </article>
    </section>
  );
}