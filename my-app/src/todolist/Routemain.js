import RouteHome from "./RouteHome";
import RouteNv from "./RouteNv";


import { Route, Routes} from "react-router-dom";
import RoutePage1 from "./RoutePage1";



const Routemain =()=>{

    return(
        <>
        <RouteNv/>
        <Routes>
            <Route path="/" element={<RouteHome/>}/>
            <Route path="/p" element={<RoutePage1/>}/>


        </Routes>
        </>
    )
}
export default Routemain;
