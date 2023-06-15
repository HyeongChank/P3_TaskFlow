import RouteHome from "./RouteHome";
import RouteNv from "./RouteNv";
import Ttest from './Ttest';

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
<<<<<<< HEAD
            <Route path="/Ttest" element={<Ttest/>}/>
=======
            <Route path="/f" element={<Findlogin/>}/>
            <Route path="/da" element={<DA/>}/>
>>>>>>> 88d701557e03b510056b5081391e7644dd525844


        </Routes>
        </>
    )
}
export default Routemain;
