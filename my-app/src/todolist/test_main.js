import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './mainpage.css';
const Main = () => {
    const [value, setValue] = useState(new Date());
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState("");
    const [content, setContent] = useState(""); 
    const onChange = (newValue) =>{
        setValue(newValue);
    };

    const renderSchedules = () =>{
        return data.map((item) => {
            const formattedDate=moment(item.cdate).format("YYYY-MM-DD")
            if(formattedDate===moment(value).format("YYYY-MM-DD")){
                return(
                    <div key={item.id}>
                        <h3 className='dbtitle'>{item.todo}</h3>
                        <p className='dbcontent'>{item.content}</p>
                        <p className='dbsuccess'>{item.success}</p>
                    </div>
                );
            }
        })
    }

    const handleaddSubmit = async(event) =>{
        event.preventDefault();
        try {
          const response = await fetch("http://localhost:8080/api/insertone", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ value }),
          });
          const data = await response.json();
          console.log(data);
          // 받아온 데이터를 화면에 출력하는 코드 작성
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

    const handleClick = async (value) => {
        try {
          const response = await fetch("http://localhost:8080/api/model");
          const data = await response.json();
          console.log('ddddd', data)
          setData(data)
        } catch (error) {
          console.error(error);
        }
    };
    return(
        
        <div>
            <h1>Todolist</h1>
            <button>등록</button>
            <div className='calendar_container'>
                <Calendar onChange={onChange} value={value} onClickDay={(value) => handleClick(moment(value).format("YYYY-MM-DD"))}/>
                    <div className="dDate">
                        {moment(value).format("YYYY년 MM월 DD일")} 
                    </div>
            </div>    

            <div className='dschedule'>
                {renderSchedules()}
            </div>
            <div>
                <form onSubmit={handleaddSubmit}>
                <label>
                    <input type="text" name="todo" onChange={handlechange}></input>
                </label>
                <label>
                    <input type="text" name="content" onChange={handlechange}></input>
                </label>
                    <button type="submit">등록</button>
                </form>

            </div>

        </div>
    )
}
export default Main