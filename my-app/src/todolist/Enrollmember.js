import { useState } from "react";
import './mainpage.css';

const Enrollmember = () => {

    const [memberid, setMemberid] = useState();
    const [memberpw, setMemberpw] = useState();

    const enrollmembers = async(event) =>{
        event.preventDefault();
        try {
          const response = await fetch("http://localhost:8080/api/insertMembers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                mid: memberid,
                password: memberpw,
              }),
          });
          if(!response.ok){
            alert('기 등록된 ID 입니다')
            throw new Error('enroll error');
        }
        const result = await response.text();
        if(result === '등록 성공'){
            console.log('success');
           
        }
          // 받아온 데이터를 화면에 출력하는 코드 작성
        } catch (error) {
          console.log(error);
        }
    }
    const getMember = (e) =>{
        console.log(e)
        if (e.target.name === "mid") {
            setMemberid(e.target.value);
          } else if (e.target.name === "password") {
            setMemberpw(e.target.value);
          }        
    }
    return(
        <div className="loginpage">
            <form onSubmit={enrollmembers}>
            <label>
                <p className="loginp">ID</p>              
                <input className="inputbox" type="text" name="mid" onChange={getMember}></input>
            </label>
            <label>
                <p className="loginp">PASSWORD</p>              
                <input className="inputbox" type="password" name="password" onChange={getMember}></input>
            </label>
                <button className="loginBt3d" type="submit"><span>Click</span><span>신규 사용자 등록</span></button>
            </form>    
      </div>
    )
}
export default Enrollmember;



