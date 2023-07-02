// import Header from "@/pages/Header";
import { Outlet } from 'react-router-dom'
import Layout from "../../components/Layout"

function LayoutPage() {
  return (
    <div>
      <Layout />
      < Outlet />
    </div>
  )
};
export default LayoutPage;