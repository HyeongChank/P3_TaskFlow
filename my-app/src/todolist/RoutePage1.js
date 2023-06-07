import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './mainpage.css';
import { useNavigate } from "react-router-dom";

const RoutePage1 = () => {
    const location = useLocation();
    const mid = location.state.mid;

    const navigate = useNavigate();
    const [value, setValue] = useState(new Date());
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrl2, setImageUrl2] = useState(null);
    const [number1] = useState(1);
    const [number2] = useState(2);
    const [achieve, setAchieve] = useState();
    // const backgroundImageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg';
    // const appStyle = {
    //   backgroundImage: `url(${backgroundImageUrl})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   minHeight: '100vh',
    // }
    const localhost = 8080;

    const onChange = (newValue) =>{
        setValue(newValue);
    };
    const renderSchedules = () =>{
        const filterData = data.filter((item) => item.mid ===mid);
        return filterData
        .map((item) => {
            const formattedDate=moment(item.cdate).format("YYYY-MM-DD")
            if(formattedDate===moment(value).format("YYYY-MM-DD")){
                return(
                    <div key={item.id}>
                        <div className='btGroup'>
                            <h3 className='dbtitle'>TodoTitle : {item.todo}</h3>

                            <button className='Bt' onClick={() => updatetodo(item)}>수정</button>                            
                            <button className='Bt' onClick={() => deletetodo(item)}>삭제</button>
                            <button className='Bt' onClick={() => successtodo(item)}>달성</button>
                            <p>{achieve}</p>
                        </div>
                        <p className='dbcontent'>TodoContent : {item.content}</p>
                        {/* <p className='dbsuccess'>{item.success}</p> */}
                    </div>
                );
            }
        })
    }
    // 삭제 기능 추가    
    const deletetodo = async(item) =>{
        // console.log("delete", item)       
        try{
            const response = await fetch(`http://localhost:${localhost}/api/delete`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
              });
            const data = await response.json();
            // console.log(data)
            handleClick(value);
        } catch(error){
            // console.log(error);
        }
    }

    // 수정 기능 추가    
    const updatetodo = async(item) =>{
        // console.log("update", item)
        // console.log("updatedata", data)

        try{
            const response = await fetch(`http://localhost:${localhost}/api/update`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: item.id,
                    todo: todo,
                    content: content,
                  }),
              });
            const data = await response.json();
            // console.log(data)
            handleClick(value);
        } catch(error){
            // console.log(error);
        }
    }
    const successtodo = async(item) =>{
        // console.log(item)
        try{
            const response = await fetch(`http://localhost:${localhost}/api/success`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: item.id,
                    todo: item.todo,
                }),
            });
            if(!response.ok){
                throw new Error('getsuccess error');
            }
            const result = await response.text();
            if(result === 'success'){
                // console.log('success');
                successEvent()
                setAchieve("달성 완료")
            } else{
                // console.log('Ntime');
            }
        } catch(error){
            // console.error(error);
        }
    }
    const successEvent = () => {
        const message = 'Congratulation, Accomplish Task';
        const blinkInterval = 500; // 깜빡임 간격 (ms)
        const blinkCount = 10; // 깜빡임 횟수
      
                // 메시지 출력을 위한 DOM 요소 생성
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.style.fontSize = '40px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.position = 'absolute';
        messageElement.style.color = '#fff';
        messageElement.style.top = '15%';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(messageElement);

        // 도형 출력을 위한 SVG 요소 생성 및 다각형 도형 생성
        for (let i = 0; i < 400; i++) {
            const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgElement.setAttribute('width', '24');
            svgElement.setAttribute('height', '24');
            svgElement.style.position = 'absolute';
            svgElement.style.top = `${Math.floor(Math.random() * 100)}%`;
            svgElement.style.left = `${Math.floor(Math.random() * 100)}%`;
            svgElement.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(svgElement);

            const polygonElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygonElement.setAttribute('points', '6,0 8,4 12,4 9,7 10.5,11 6,8 1.5,11 3,7 0,4 4,4');
            polygonElement.style.fill = 'rgb(172, 2, 251)';
            polygonElement.style.stroke = '#f0ad4e';
            polygonElement.style.strokeWidth = '2';
            polygonElement.style.animation = 'blink 1s ease-in-out infinite';
            svgElement.appendChild(polygonElement);
        }     
        // 깜빡임 효과를 위한 함수
        const blink = (count) => {
        if (count === 0) {

        document.querySelectorAll('svg').forEach(el => el.remove());
        messageElement.remove();
        return;
        }
        document.querySelectorAll('svg').forEach(el => {
            el.style.top = `${Math.floor(Math.random() * 100)}%`;
            el.style.left = `${Math.floor(Math.random() * 100)}%`;
            el.style.visibility = el.style.visibility === 'hidden' ? 'visible' : 'hidden';
          });
        messageElement.style.visibility = messageElement.style.visibility === 'hidden' ? 'visible' : 'hidden';

        // 일정 시간 후에 다시 blink 함수 호출
        setTimeout(() => blink(count - 1), blinkInterval);
        };

        // 깜빡임 효과 시작
        blink(blinkCount);
      };

    // 일정추가등록 기능
    const handleaddSubmit = async(event) =>{
        event.preventDefault();
        try {
            // 서버와 연결하고 요청을 보내고, 응답을 받아서 response에 저장
          const response = await fetch(`http://localhost:${localhost}/api/insertone`, {
            // 서버에 전송할 데이터 형식 지정
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // json으로 변경하여 서버에 전달
            body: JSON.stringify({ 
                todo: todo,
                content: content,
                cdate: moment(value).format("YYYY-MM-DD"),
                mid: mid,
              }),
          });
            if(!response.ok){
                throw new Error('getsuccess error');
            }
            const result = await response.text();
            if(result === 'success'){
                console.log('success');
                alert("일정 등록 완료")
            } else{
                console.log('error');
            }

        } catch (error) {
        //   console.error(error);
        }
    };

    const handlechange = (e) => {
        if (e.target.name === "todo") {
          setTodo(e.target.value);
        } else if (e.target.name === "content") {
          setContent(e.target.value);
        }
      };
    // setdata 부분
    const handleClick = async (value) => {
        try {
          const response = await fetch(`http://localhost:${localhost}/api/model`);
          const data = await response.json();
        //   console.log('ddddd', data)
          setData(data)
        } catch (error) {
        //   console.log(error);
        }
    };

    const goPage1 = () =>{
        navigate('/');
    }
    // 이미지 db 저장 부분
    // 클라이언트에 저장되어 있는 이미지의 절대경로를 같이 서버로 보내는 건 불가능
    // 웹에서 사용자의 파일 시스템의 직접적인 접근을 허용하지 않음
    const fileSelectedHandler = event =>{
        setSelectedFile(event.target.files[0]);
    };
    const fileUploadHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('num', number1);
        formData.append('imageLoad', JSON.stringify({
            cdate: moment(value).format("YYYY-MM-DD"),
            mid: mid
        }));

        try{
            const response = await fetch(`http://localhost:${localhost}/api/insertimage`, {
                method: "POST",
                body:formData,
                // headers:{
                // }
            });
            if(!response.ok){
                throw new Error('error')
            }
            else{
                const data = await response.text();
                console.log(data);
            }
        }
        catch (error){
            console.log('error' + error)
        }
    }
    const fileSelectedHandler2 = event =>{
        setSelectedFile(event.target.files[0]);
    };
    const fileUploadHandler2 = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('num', number2);
        formData.append('imageLoad', JSON.stringify({
            cdate: moment(value).format("YYYY-MM-DD"),
            mid: mid
        }));

        try{
            const response = await fetch(`http://localhost:${localhost}/api/insertimage`, {
                method: "POST",
                body:formData,
                // headers:{
                // }
            });
            if(!response.ok){
                throw new Error('error')
            }
            else{
                const data = await response.text();
                console.log(data);
            }
        }
        catch (error){
            console.log('error' + error)
        }
    }

    const getImage1 = async() =>{
    try{
        const response = await fetch(`http://localhost:${localhost}/api/getImage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mid: mid,
                cdate: moment(value).format("YYYY-MM-DD"),
                num: 1

            }),
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
    }
    catch (error){
        console.log('error' + error)
    }};

    const getImage2 = async() =>{
        try{
            const response = await fetch(`http://localhost:${localhost}/api/getImage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mid: mid,
                    cdate: moment(value).format("YYYY-MM-DD"),
                    num: 2
    
                }),
            });
            const blob = await response.blob();
            const url2 = URL.createObjectURL(blob);
            setImageUrl2(url2);
        }
        catch (error){
            console.log('error')
        }};

    return(
       
        <div className='Tmain'>
        <div className='secondmain'>
            <span className="mainT">Todolist</span>
            <div className="clockLogout">
            <button className="logoutBt3d" onClick={goPage1}><span>Click</span><span>로그아웃</span></button>
            </div>
            <div className='calendar_container'>
                <p>Calendar</p>
                <Calendar onChange={onChange} value={value} onClickDay={(value) => handleClick(moment(value).format("YYYY-MM-DD"))}/>

            </div>    
            <div className='dvlist'>
                <div className="dDate">
                    {moment(value).format("YYYY년 MM월 DD일")} 일정
                </div>
                <div className='dschedule'>
                    {renderSchedules()}
                </div>
            </div>

            <div className='enrolllist'>
                <form className='enrolltodo' onSubmit={handleaddSubmit}>
                    <p className="loginp">일정명</p>
                    <label>
                        <input className="inputbox" type="text" name="todo" onChange={handlechange}></input>
                    </label>
                    <p className="loginp">내용</p>
                    <label>
                        <input type="text" className='textarea' name="content" onChange={handlechange}></input>
                    </label>
                        <button className='Bt' type="submit">등록</button>
                </form>
                <div>
                    <p>이미지 저장</p>
                    <form encType="multipart/form-data" onSubmit={fileUploadHandler}>
                        <span>{number1}</span>
                        <input type="file" name="file" onChange={fileSelectedHandler} />
                        <input type="submit" value="Upload" />
                    </form>
                    <div className="imagespot">
                        <button onClick={getImage1}>Get Image</button>
                        {imageUrl && <img src={imageUrl} alt="From server" />}
                    </div>
                    <form encType="multipart/form-data" onSubmit={fileUploadHandler2}>
                        <span>{number2}</span>
                        <input type="file" name="file" onChange={fileSelectedHandler2} />
                        <input type="submit" value="Upload" />
                    </form>
                    <div className="imagespot">
                        <button onClick={getImage2}>Get Image</button>
                        {imageUrl2 && <img src={imageUrl2} alt="From server" />}
                    </div>
                </div>
                </div>

        </div>
        </div>
  );
};
export default RoutePage1;


