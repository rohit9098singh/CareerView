import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const AdminProfile = dynamic(() => import("./AdminProfile"))

export const AdminProfileHOC = () => {
      return (
            <div>
                  <Navbar />
                  <AdminProfile />
            </div>
      )
}