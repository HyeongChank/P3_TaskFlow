import { useNavigate } from "react-router-dom";
import './mainpage.css';

const BLongin = (props) =>{
    const navigate = useNavigate();
    const loginbasic = async(e) =>{
        e.preventDefault();
        const data = {
            mid: e.target.mid.value,
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
                navigate(`/p?mid=${data.mid}`);
                // navigate('/p');                
            } else{
                console.log('failure');
            }
        } catch(error){
            console.error(error);
        }

    };       
    return(
        <div className="loginpage">
            <form onSubmit={loginbasic}>
                <label>
                    <p className="loginp">ID</p>
                    <input className="inputbox" type="text" name="mid"></input>
                </label>
                <label>
                    <p className="loginp">PASSWORD</p>
                    <input className="inputbox" type="password" name="password"></input>
                </label>
                    <button className="loginBt3d" type="submit"><span>Click</span><span>기사용자 입장</span></button>
            </form>
        </div>
    )
}
export default BLongin;