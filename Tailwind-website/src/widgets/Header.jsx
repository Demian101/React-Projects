import {React} from "react";
import RightArrow from "./svg/RightArrow"
// import Logo from "../logo.svg";
import logo from "../assets/favicon.png"

export default function Header() {
  return (
    <header className="flex justify-between items-center h-20">
      <img src={logo} alt="" className="w-8 h-8" /> 
      <nav className="flex items-center ">
        <a href="#">登录</a>
        <a href="#"
          className="ml-8 bg-gray-700 px-4 py-2 rounded text-blue-50 flex items-center"
        >
          注册
          <RightArrow className="h-4 w-4 ml-1 fill-neutral-400" />
        </a>
      </nav>
    </header>
  );
};