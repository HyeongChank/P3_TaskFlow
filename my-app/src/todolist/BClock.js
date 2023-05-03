// npm install --save react-live-clock
import React from "react";
import LiveClock from 'react-live-clock';
const BClock = () =>{

    return(
        <div>
            <LiveClock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true}/>
        </div>
    )
}
export default BClock;