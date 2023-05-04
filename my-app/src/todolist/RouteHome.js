import { Link, useNavigate } from "react-router-dom";
import BClock from "./BClock";
import BLongin from "./BLogin";
import Enrollmember from "./Enrollmember";

const RouteHome = (props) =>{
    const navigate = useNavigate();

    const loginbasic = async(e) =>{
        e.preventDefault();
        const data = {
            id: e.target.id.value,
            password: e.target.password.value,
          };
        try{
            const response = await fetch('/api/login', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
            

            if(!response.ok){
                throw new Error('login error');
            }
            const result = await response.text();
            if(result === '로그인 성공'){
                console.log('success');
                props.onSuccess();
            } else{
                console.log('failure');
            }
        } catch(error){
            console.error(error);
        }

    };    
    const goPage1 = () =>{
        navigate('/p1');
    }   
    
    return(
        <div className='Tmain'>
        <div className='ifif'>
            <h3>일정관리 웹 서비스</h3>
            <h1>Todolist</h1>
            <div><BClock/></div>
            <div className='loginArea'>

                <>
                <div className='loginBt'><BLongin/></div>
                {/* <div className='loginBt'><Login/></div> */}
                <div className='loginBt'><Enrollmember/></div>
                </>

            </div>
        </div>
        </div>
    )
}
export default RouteHome;