import { useState } from "react";
import { async } from "regenerator-runtime";

const Findlogin = () =>{

    const [memberemail, setMemberemail] = useState();
    const [authorize, setAuthorize] = useState();
    const [showauthForm, setShowauthForm] = useState(false);
    const [updatemem, setUpdatemem] = useState(false);
    const [number, setNumber] = useState();
    const [memberid, setMemberid] = useState();
    const [memberpw, setMemberpw] = useState();
    const findbyemail = async(event) =>{
        event.preventDefault();
        try {
          const response = await fetch("http://localhost:8080/api/findlogin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                memail: memberemail,
              }),
          });
          if(!response.ok){
            alert('등록된 Email이 없음')
            throw new Error('findemail error');
        }
        const result = await response.text();
        if(result === 'mailsuccess'){
            alert("등록된 Email 주소로 로그인 정보를 전송하였습니다. Email을 확인해 주세요.")
            console.log(result)
            console.log('success');
           
        }
          // 받아온 데이터를 화면에 출력하는 코드 작성
        } catch (error) {
          console.log(error);
        }

    }
    const getMember = (e) =>{
        if (e.target.name === "memail") {
            setMemberemail(e.target.value);
          }        
        }
    const updateInfo = async(event) =>{
        event.preventDefault();
        setShowauthForm(true);
        try {
          const response = await fetch("http://localhost:8080/api/authenInfo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                memail: memberemail,
              }),
          });
          if(!response.ok){
            alert('등록된 Email이 없음')
            throw new Error('findemail error');
        }
    const result = await response.json();
        alert("등록된 Email 주소로 로그인 정보를 전송하였습니다. Email을 확인해 주세요.")        
        setAuthorize(result.key1);
        console.log(result.key1);


        } catch (error) {
          console.log(error);
        }        
    }
    const getnumber = (event) =>{
        console.log(event.target.value);
        setNumber(event.target.value);

    }
    const authorizePr = (event) =>{
        event.preventDefault();
        if(number === authorize){
            alert("yes")
            setUpdatemem(true);
        }

    }
    //수정영역
    const getinfo = (e) =>{
        if (e.target.name === "mid") {
            setMemberid(e.target.value);
          } else if (e.target.name === "password") {
            setMemberpw(e.target.value);
          } 
    }    
    const updateidpw = async(event) =>{
        console.log("updateidpw");
        console.log(memberemail);
        console.log(memberid);
        console.log(memberpw)
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/updateInfo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                  mid: memberid,
                  password: memberpw,
                  memail: memberemail,
                }),
            });
            if(!response.ok){
               throw new Error('update error');
          }
          const result = await response.text();
          if(result === '수정 성공'){
            alert("정상적으로 수정되었습니다.")
          }
 
          } catch (error) {
            // alert("동일한 ID가 존재합니다.")
            console.log(error);
          }
      }

    

    return(
        <div>
            <form onSubmit={findbyemail}>
            <label>
                <p className="emailp">email</p>              
                <input className="inputbox" type="text" name="memail" onChange={getMember}></input>
            </label>                
            <button className="loginBt3d" type="submit"><span>Click</span><span>등록정보 찾기</span></button>
            </form>
            <form onSubmit={updateInfo}>
            <label>
                <p className="emailp">email</p>              
                <input className="inputbox" type="text" name="memail" onChange={getMember}></input>
            </label>                
            <button className="loginBt3d" type="submit"><span>Click</span><span>등록정보 수정</span></button>
           
            </form>
            {showauthForm && (
            <form onSubmit={authorizePr}>
            <label>
                인증번호
                <input className="inputbox" type="text" name="authorize" onChange={getnumber}/>
                <button className="loginBt3d" type="submit"><span>Click</span><span>확인</span></button>
            </label>
            </form>
            )}
            {updatemem && (
            <form onSubmit={updateidpw}>
            <label>
                ID
                <input className="inputbox" type="text" name="mid" onChange={getinfo}/>
                PW
                <input className="inputbox" type="password" name="password" onChange={getinfo}/>
                <button className="loginBt3d" type="submit"><span>Click</span><span>확인</span></button>
            </label>
            </form>
            )}
        </div>
             
    )
}
export default Findlogin;