// import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLeaf, IoLogoOctocat } from "react-icons/io";
import { FaCat } from "react-icons/fa";
import { GiCat, GiHollowCat } from "react-icons/gi";
import { AptosConnect } from "./AptosConnect";

// import { useLocation} from "react-router-dom";

function Layout() {
  // const [isRevert,setIsRevert] = useState(false)
  // setIsRevert((preValue) => !preValue)
  const navigate = useNavigate()
  const ClickHandle = () => {
    navigate('/')  // 直接导航到 ”/“
  }

  return (
    // {/* <div className="h-8 flex justify-between w-full container mx-auto rounded-sm mt-6"> */}
    <div className="flex justify-between w-full container mx-auto rounded-sm mt-6 h-8 ">
      <AptosConnect />
      <div className="flex bg-grey-500 text-3xl border-b ml-4">
        <button onClick={ClickHandle} type="button"> <IoIosLeaf /> </button>
        <div className="flex space-x-4 text-lg mt-3 justify-between ml-20"> <FaCat /> <GiCat /> <GiHollowCat /> <IoLogoOctocat /> </div>
      </div>

      <ul className="repo-nav border-b flex items-center pt-2 space-x-4 font-serif">
        <li> <Link className="hover:border-b-4 hover:border-b-gray-250" to="/"> Mainpage </Link> </li>
        <li> <Link className="hover:border-b-4 hover:border-b-gray-250" to="/mint"> Mint </Link> </li>
        <li> <Link className="hover:border-b-4 hover:border-b-gray-250" to="/about"> About </Link> </li>
        <li> <Link className="hover:border-b-4 hover:border-b-gray-250" to="/connect-us"> Connect </Link> </li>
        {/* 登录则显示 Manage Button，未登录则不显示 */}
      </ul>
    </div>
  )
}
export default Layout;