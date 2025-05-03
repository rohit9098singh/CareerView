import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const Applicants = dynamic(() => import("./Applicants"))

export const ApplicantsHOC = () => {
    return (
        <div>
            <Navbar />
            <Applicants />
        </div>
    )



}



