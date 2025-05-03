import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const FindJob = dynamic(() => import("./FindJob"));

export const FindJobHOC = () => {
  return(
    <div>
    <Navbar />
    <FindJob />;
</div>
  )
  
  
};
