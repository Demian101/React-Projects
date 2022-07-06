import React from 'react'
import { useState, useReducer } from "react"

// import { useReducer } from "react";

// export default function App() {
//   const [value, dispatch] = useReducer(
//     (state = 0, action: { type: "add" | "min" }) => {
//       switch (action.type) {
//         case "add":
//           state++;
//           break;
//         case "min":
//           state--;
//           break;
//       }
//       return state;
//     },
//     0,
//     (state) => {
//       return state + 1;
//     }
//   );
//   return (
//     <>
//       <div>
//         {value}
//         <button onClick={() => dispatch({ type: "add" })}>加</button>
//         <button onClick={() => dispatch({ type: "min" })}>减</button>
//       </div>
//     </>
//   );
// }

import { useGlobalContext } from './context'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
// items

function App() {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
