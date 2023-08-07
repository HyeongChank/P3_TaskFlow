import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './mainpage.css';
import "regenerator-runtime/runtime";


const Blonginjwt = () =>{
    const navigate = useNavigate();
    const localhost = 8080;
    const [memberid, setMemberid] = useState();
    const [memberpw, setMemberpw] = useState();    
    const logintool = async(event) => {
        event.preventDefault();
        console.log(memberid);
        try{
          const response = await fetch(`http://localhost:${localhost}/api/login`, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mid: memberid,
              password: memberpw,
            }),
          });
          if(!response.ok){
            throw new Error('login error');
          }
          const result = await response.json();
      
          // '로그인 성공' 대신 토큰을 확인하는 방법으로 변경합니다.
          // 토큰이 응답에 포함되어 있는지 확인합니다.
          if (result.token) {
            // 토큰을 localStorage에 저장합니다.
            window.localStorage.setItem('jwtToken', result.token);
      
            // 이동하려는 페이지로 navigate합니다.
            navigate('/p', { state: { mid: `${memberid}` }});
          } else {
            throw new Error('login error');
          }
        } catch(error){
          alert('Id, Password 가 잘못되었습니다. 다시 입력해 주세요')
          // console.log(error);
        }
      };
    
       
    const loginbasic = (e) =>{
        if (e.target.name === "mid") {
            setMemberid(e.target.value);
          } else if (e.target.name === "password") {
            setMemberpw(e.target.value);
          }        
    }

    const findloginInf = () =>{
        navigate('/f');
    }
    return(
        <div className="loginpage">
            <form onSubmit={logintool}>
                <label>
                    <p className="loginp">ID</p>
                    <input className="inputbox" type="text" name="mid" onChange={loginbasic}></input>
                </label>
                <label>
                    <p className="loginp">PASSWORD</p>
                    <input className="inputbox" type="password" name="password" onChange={loginbasic}></input>
                </label>
                    <button className="loginBt3d" type="submit"><span className="sp1">Click</span><span>기사용자 입장</span></button>
                    <p className="forgot">If you forgot ID or PW</p>
                    <button className="loginBt3d" onClick={findloginInf}><span className="sp1">Click</span><span>Find ID, PW</span></button>
            </form>


        </div>
    )
}
export default Blonginjwt;