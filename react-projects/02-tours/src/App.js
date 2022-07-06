import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'; 
import { ForceGraph2D, ForceGraph3D, ForceGraphAR, ForceGraphVR } from './dist/react-force-graph.module'
//import SpriteText from 'https://unpkg.com/three-spritetext@1.6.5/dist/three-spritetext.min.js'
import SpriteText from 'three-spritetext';
export default function App() {
  fetch('../datasets/miserables.json').then(res => res.json()).then(data => {
  ReactDOM.render(
    <ForceGraph3D
      graphData={data}
      nodeAutoColorBy="group"
      nodeThreeObject={node => {
        const sprite = new SpriteText(node.id);
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      }}
    />,
    document.getElementById('graph')
  );
});
}

// import React, { useState, useEffect } from 'react'
// import Loading from './Loading'
// import Tours from './Tours'
// // ATTENTION!!!!!!!!!!
// // I SWITCHED TO PERMANENT DOMAIN

// function App() {
//   const url = 'https://course-api.com/react-tours-project'
//   const [loading, setLoading] = useState(true)
//   const [tours, setTours] = useState([])

//   const removeTour = (id) => {
//     const newTours = tours.filter((tour) => tour.id !== id)
//     setTours(newTours)
//   }

//   const fetchTours = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch(url)
//       const tours = await response.json()
//       setLoading(false)
//       setTours(tours)
//     } catch (error) {
//       setLoading(false)
//       console.log(error)
//     }
//   }

//   useEffect(() => {  fetchTours() } , [])

//   if (loading) {
//     return (
//       <main>
//         <Loading />
//       </main>
//     )
//   }
//   if (tours.length === 0) {
//     return (
//       <main>
//         <div className='title'>
//           <h2>no tours left</h2>
//           <button className='btn' onClick={() => fetchTours()}>
//             refresh
//           </button>
//         </div>
//       </main>
//     )
//   }
//   return (
//     <main>
//       <Tours tours={tours} removeTour={removeTour} />
//     </main>
//   )
// }

// export default App
