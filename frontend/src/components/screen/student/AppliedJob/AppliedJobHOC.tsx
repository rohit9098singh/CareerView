import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const AppliedJob = dynamic(() => import("./AppliedJob"))

export const AppliedJobHOC = () => {
    return (
        <div>
            <Navbar />
            <AppliedJob />
        </div>
    )



}
