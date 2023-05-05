import { useNavigate, useSearchParams } from "react-router-dom";
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
                // navigate로 페이지 이동 시 파라미터 전달 방법 2가지
                // 1. url에 넣어서 보내기 : navigate(`/p?mid=${data.mid}`);
                // 2. state 로 보내기
                navigate('/p',{state:{
                    mid:`${data.mid}`
                }
            });                
            } 
        } catch(error){
            alert('Id, Password 가 잘못되었습니다. 다시 입력해 주세요')
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