
import BClock from "./BClock";
import BLongin from "./BLogin";
import Backdisplay from "./Backdisplay";
import Enrollmember from "./Enrollmember";


// props를 main페이지로부터 받음
const RouteHome = (props) =>{
    // const navigate = useNavigate();

    // const loginbasic = async(e) =>{
    //     e.preventDefault();
    //     const data = {
    //         id: e.target.id.value,
    //         password: e.target.password.value,
    //       };
    //     try{
    //         const response = await fetch('/api/login', {
    //             method:'POST',
    //             headers:{
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //             })
            

    //         if(!response.ok){
    //             throw new Error('login error');
    //         }
    //         const result = await response.text();
    //         if(result === '로그인 성공'){
    //             console.log('success');
    //             props.onSuccess();
    //         } else{
    //             console.log('failure');
    //         }
    //     } catch(error){
    //         console.error(error);
    //     }

    // };    
    
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