import RouteHome from "./RouteHome";
import RouteNv from "./RouteNv";


import { Route, Routes} from "react-router-dom";
import RoutePage1 from "./RoutePage1";
import Findlogin from "./Findlogin";
import DA from "./DA";



const Routemain =()=>{

    return(
        <>
        <RouteNv/>
        <Routes>
            <Route path="/" element={<RouteHome/>}/>
            <Route path="/p" element={<RoutePage1/>}/>
            <Route path="/f" element={<Findlogin/>}/>
            <Route path="/da" element={<DA/>}/>


        </Routes>
        </>
    )
}
export default Routemain;
