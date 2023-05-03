import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './mainpage.css';
// import Login from './GLogin';
import Enrollmember from './Enrollmember';
import BLogin from './BLogin';
import BClock from './BClock';

const Main = () => {
    const [value, setValue] = useState(new Date());
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState("");
    const [content, setContent] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const onChange = (newValue) =>{
        setValue(newValue);
    };



    const renderSchedules = () =>{
        return data.map((item) => {
            const formattedDate=moment(item.cdate).format("YYYY-MM-DD")
            if(formattedDate===moment(value).format("YYYY-MM-DD")){
                return(
                    <div key={item.id}>
                        <div className='btGroup'>
                            <h3 className='dbtitle'>{item.todo}</h3>
                            <button className='Bt' onClick={() => updatetodo(item)}>수정</button>                            
                            <button className='Bt' onClick={() => deletetodo(item)}>삭제</button>
                        </div>
                        <p className='dbcontent'>{item.content}</p>
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

    // 추가등록 기능
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
                cdate: moment(value).format("YYYY-MM-DD")
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
          console.log('ddddd', data)
          setData(data)
        } catch (error) {
          console.log(error);
        }
    };
    const handleLoginSuccess = () => {
        setIsAuthenticated(true); // isAuthenticated 상태 변수를 true로 설정하여 컴포넌트 내용을 보이도록 함
    }

    
    return(
        <div className='Tmain'>
        <div className='ifif'>
            <h3>일정관리 웹 서비스</h3>
            <h1>Todolist</h1>
            <div><BClock/></div>
            <div className='loginArea'>
                { !isAuthenticated &&
                <>
                <div className='loginBt'><BLogin onSuccess={handleLoginSuccess} /></div>
                {/* <div className='loginBt'><Login/></div> */}
                <div className='loginBt'><Enrollmember/></div>
                </>
                }
            </div>
            { isAuthenticated &&
            <>
            <div className='calendar_container'>
                <p>Calendar</p>
                <Calendar onChange={onChange} value={value} onClickDay={(value) => handleClick(moment(value).format("YYYY-MM-DD"))}/>
                <div className="dDate">
                    {moment(value).format("YYYY년 MM월 DD일")}
                </div>
            </div>    
            <div className='dvlist'>
                <p>Detail</p>
                <div className='dschedule'>
                    {renderSchedules()}
                </div>
            </div>
            <div className='new_list'>
            <div className='enrolllist'>
                <form onSubmit={handleaddSubmit}>
                    <p>일정명</p>
                    <label>
                        <input type="text" name="todo" onChange={handlechange}></input>
                    </label>
                    <p>내용</p>
                    <label>
                        <input type="text" className='testarea' name="content" onChange={handlechange}></input>
                    </label>
                        <button type="submit">등록</button>
                </form>


                </div>
                </div>
                </>
                }
        </div>
        </div>
    )
}
export default Main