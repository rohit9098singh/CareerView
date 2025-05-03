import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const StudentProfile = dynamic(() => import("./StudentProfile"))

export const StudentProfileHOC = () => {
      return (
            <div>
                  <Navbar />
                  <StudentProfile />
            </div>
      )




}