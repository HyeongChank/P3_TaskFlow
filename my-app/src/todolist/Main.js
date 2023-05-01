import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './mainpage.css';
const Main = () => {
    const [value, setValue] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");
    const [schedules, setSchedules] = useState([
        { date: "2023-05-02", schedule: "React 스터디" },
        { date: "2023-05-03", schedule: "Vue 스터디" },
        { date: "2023-05-04", schedule: "Angular 스터디" },
      ]);




    const onChange = (newValue) =>{
        setValue(newValue);
        
    };

    const getSchedule = (date) => {
        console.log(date)
        const formattedDate = moment(date).format("YYYY-MM-DD");
        return schedules.filter((schedule) => schedule.date === formattedDate);
      };

    const renderSchedules = () => {
        const schedulesByDate = getSchedule(value);
        console.log(schedulesByDate)
        if (schedulesByDate.length > 0) {
            return (
            <ul>
                {schedulesByDate.map((schedule, index) => (
                <li key={index}>{schedule.schedule}</li>
                ))}
            </ul>
            );
        } else {
            return <div>해당 날짜에 일정이 없습니다.</div>;
        }
              

    };

    return(
        
        <div>
            <h1>Todolist</h1>
            <button>등록</button>
            달력
            <div className='calendar_container'>
            <Calendar onChange={onChange} value={value}/>
                <div className="dDate">
                   {moment(value).format("YYYY년 MM월 DD일")} 
                </div>
            </div>    
            <div>
                <h2>{selectedDate}</h2>
            </div>
            <div className='dschedule'>
                {renderSchedules()}
            </div>
        </div>
    )
}
export default Main