import React from "react";
import sm_left_circle from '../assets/sm_left_circle.svg'
import Counter from "./components/UI/Counter";
import Foodtomato from "./svg/food-tomato.svg";

export default function Todolist (){
  const itemlis = ['学习 React','学习 Vue','学习 Angular'];
  return(
    <div className="grid grid-cols-1 justify-between  text-center relative md:p-20  mx-20 gap-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="bold"> Proj name </div>    
        <div> input Tomato Times </div>    
        <hr /> <hr />
        {
          itemlis.map((item,index)=>{
            return (<>
            <div key={index}>{item}</div>
            <div> 
            <Counter>webpack learn </Counter>
          </div></>)
          })
        }
      </div>


      <div>
        <img src={sm_left_circle} className="absolute bottom-0 md:bottom-20 -left-10 -z-10" alt=".."/> 
      </div>
    </div>

  )
}
