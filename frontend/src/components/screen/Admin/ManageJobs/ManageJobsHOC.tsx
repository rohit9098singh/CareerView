import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const ManageJobs = dynamic(() => import("./ManageJobs",))

export const ManageJobsHOC = () => {
    return (
        <div>
            <Navbar />
            <ManageJobs />

        </div>
    )


}