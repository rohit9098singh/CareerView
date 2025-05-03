import dynamic from "next/dynamic";
import Navbar from "../Navbar/Navbar";

const Settings=dynamic(()=>import("./Settings"))

export const SettingsHOC=()=>{
    return(
        <div>
            <Navbar/>
            <Settings/>
        </div>
    ) 
}


