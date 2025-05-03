import Footer from "@/components/custom/Footer/Footer";
import Navbar from "@/components/custom/Navbar/Navbar";
import dynamic from "next/dynamic";

const SavedJobs = dynamic(() => import("./SavedJobs"))

export const SavedJobsHOC = () => {
      return (
            <div>
                  <Navbar />
                  <SavedJobs />
                  <Footer/>
            </div>
      )
}