
import BClock from "./BClock";
import BLongin from "./BLogin";
import Backdisplay from "./Backdisplay";
import Enrollmember from "./Enrollmember";




// props를 main페이지로부터 받음
const RouteHome = (props) =>{

    
    return(
        
        <div className='Tmain'>

        <div className='secondmain'>
            <h2>일정관리 웹 서비스</h2>
            <h1>Todolist</h1>
            <div className="loginclock"><BClock/></div>
            <div className="logintotal">
                    <div className="loginleft"><BLongin/></div>
                    <div className="loginright"><Enrollmember/></div>
            </div>
        </div>
        <Backdisplay/>
        </div>
    )
}
export default RouteHome;