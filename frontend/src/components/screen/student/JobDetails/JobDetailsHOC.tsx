import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const JobDetails = dynamic(() => import("./JobDetails"));

export const JobDetailsHOC = () => {

    return (
        <div>
            <Navbar />
            <JobDetails />
        </div>
    )
};

