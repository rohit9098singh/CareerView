import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const AdminHome = dynamic(() => import("./AdminHome"))

export const AdminHomeHOC = () => {
   return (
      <div>
         <Navbar/>
         <AdminHome />
      </div>
   )
}