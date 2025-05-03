import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const PostJob = dynamic(() => import("./PostJob"));

export const PostJobHOC = () => {

    return (
        <div>
            <Navbar />
            <PostJob />
        </div>
    )
};

