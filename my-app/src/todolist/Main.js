import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Main = () => {
    const [value, onChange] = useState(new Date());
    return(
        
        <div>
            <h1>Todolist</h1>
            <button>등록</button>
            달력
            <Calendar onChange={onChange} value={value} />
        </div>
    )
}
export default Main