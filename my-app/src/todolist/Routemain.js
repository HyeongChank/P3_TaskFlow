import RouteHome from "./RouteHome";
import RouteNv from "./RouteNv";
import Ttest from './Ttest';

import { Route, Routes} from "react-router-dom";
import RoutePage1 from "./RoutePage1";
import Findlogin from "./Findlogin";



const Routemain =()=>{

    return(
        <>
        <RouteNv/>
        <Routes>
            <Route path="/" element={<RouteHome/>}/>
            <Route path="/p" element={<RoutePage1/>}/>
<<<<<<< HEAD
            <Route path="/Ttest" element={<Ttest/>}/>
=======
            <Route path="/f" element={<Findlogin/>}/>
>>>>>>> ed62e137a5d78684b5fc7024f616bbdf149b9248


        </Routes>
        </>
    )
}
export default Routemain;
