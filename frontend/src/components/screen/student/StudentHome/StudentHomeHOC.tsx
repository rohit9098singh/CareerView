import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const StudentHome = dynamic(() => import("./StudentHome"));

export const StudentHomeHOC = () => {
  return(
    <div>
    <Navbar />
    <StudentHome />;
</div>
  )
  
  
 
};
