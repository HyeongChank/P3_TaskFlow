import { useLocation, useParams } from "react-router-dom";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './mainpage.css';
import BClock from './BClock';
import { Link, useNavigate } from "react-router-dom";

const RoutePage1 = () => {
    const location = useLocation();
    const mid = new URLSearchParams(location.search).get('mid');
    console.log(mid)
    const navigate = useNavigate();
    const [value, setValue] = useState(new Date());
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState("");
    const [content, setContent] = useState("");

    const backgroundImageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg';
    const appStyle = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }


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
        console.log("delete", item)       
        try{
            const response = await fetch("http://localhost:8080/api/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
              });
            const data = await response.json();
            console.log(data)
            handleClick(value);
        } catch(error){
            console.log(error);
        }
    }

    // 수정 기능 추가    
    const updatetodo = async(item) =>{
        console.log("update", item)
        console.log("updatedata", data)

        try{
            const response = await fetch("http://localhost:8080/api/update", {
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
            console.log(data)
            handleClick(value);
        } catch(error){
            console.log(error);
        }
    }
    const successtodo = async(item) =>{
        console.log(item)
        try{
            const response = await fetch("http://localhost:8080/api/success", {
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
                console.log('success');
                successEvent()
            } else{
                console.log('Ntime');
            }
        } catch(error){
            console.error(error);
        }
    }
    const successEvent = () => {
        const message = 'Accomplish todays task';
        const blinkInterval = 500; // 깜빡임 간격 (ms)
        const blinkCount = 10; // 깜빡임 횟수
      
        // 도형 출력을 위한 SVG 요소 생성
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('width', '24');
        svgElement.setAttribute('height', '24');
        svgElement.style.position = 'absolute';
        svgElement.style.top = '50%';
        svgElement.style.left = '50%'; // 버튼 옆에 배치하기 위한 위치 조정
        svgElement.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(svgElement);

        // 메시지 출력을 위한 DOM 요소 생성
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.style.fontSize = '40px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.position = 'absolute';
        messageElement.style.color = 'rgba(0, 128, 0, 0.658)';
        messageElement.style.top = '15%';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(messageElement);
        // 다각형 도형 생성
        const polygonElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygonElement.setAttribute('points', '12,0 16,8 24,8 18,14 21,22 12,17 3,22 6,14 0,8 8,8');
        polygonElement.style.fill = '#f0ad4e';
        svgElement.appendChild(polygonElement);      
        // 깜빡임 효과를 위한 함수
        const blink = (count) => {
          if (count === 0) {

            svgElement.remove();
            messageElement.remove();
            return;
          }
          // 깜빡임 효과를 위해 메시지 요소의 가시성 속성을 토글
          svgElement.style.visibility = svgElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
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
          const response = await fetch("http://localhost:8080/api/insertone", {
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
          // 애초에 받아온 정보의 json형태 
          const data = await response.json();
          console.log("insert", data);

        } catch (error) {
          console.error(error);
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
          const response = await fetch("http://localhost:8080/api/model");
          const data = await response.json();
        //   console.log('ddddd', data)
          setData(data)
        } catch (error) {
          console.log(error);
        }
    };

    const goPage1 = () =>{
        navigate('/');
    }


    return(
        <div className='Tmain' style={appStyle}>
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


                </div>

        </div>
        </div>
  );
};
export default RoutePage1;


