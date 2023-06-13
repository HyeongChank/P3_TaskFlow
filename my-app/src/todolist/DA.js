import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, LinearScale, CategoryScale, LineElement, PointElement } from 'chart.js';
import { useLocation } from 'react-router-dom';

Chart.register(LineController, LinearScale, CategoryScale, LineElement, PointElement);

const DA = () =>{
    const [gettododata, setGettododate] = useState();
    const [countsuccess, setCountsuccess] = useState([]);
    const [counttodo, setCounttodo] = useState([]);
    const localhost = 8080;
    const chartRef = useRef(null);
    const todolist = useRef([]);
    const successlist = useRef([]);
    const datelist = useRef([]);
    const location = useLocation();
    const value = location.state.value;
    const mid = location.state.mid;
    console.log(value);
    console.log(mid);
    const getdata = async(event) =>{
        event.preventDefault();

        try{
            const response = await fetch(`http://localhost:${localhost}/api/processDA`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cdate: value,
                    mid: mid,
                }),
            });
            if(!response.ok){
                throw new Error('getsuccess error');
            }
            const result = await response.json();
            console.log(result)
            setGettododate(result);
            console.log("gettododata", gettododata[0].id)
            
        } catch(error){
            // console.error(error);
        }
    }
    useEffect(()=>{
        if(gettododata){
            const successCount = gettododata.reduce((counts, item) =>{
                console.log("item", item);
                if(item.success ==='success'){
                    // 해당 날짜에 없는 경우 처음 1 설정
                    if(!counts[item.cdate]){
                        counts[item.cdate] = 1;
                    }
                    else{
                        counts[item.cdate] ++;
                    }
                }
                return counts
            }, {});
            setCountsuccess(successCount);
        }
        if(gettododata){
            const todoCount = gettododata.reduce((counts, item) =>{
                console.log("item", item);
                
                // 해당 날짜에 없는 경우 처음 1 설정
                if(!counts[item.mid]){
                    counts[item.mid] = 1;
                }
                else{
                    counts[item.mid] ++;
                }
                
                return counts
            }, {});
            setCounttodo(todoCount);
        }
    }, [gettododata])
    console.log(gettododata)

    return(
        <div>
            <button className='getdataBt' onClick={getdata}>버튼</button>
            {Object.keys(counttodo).map((key) =>(
                <div key={key}>
                    <p>Id: {key}</p>
                    <p>Todo Count : {counttodo[key]}</p>
                </div>
            ))}
            {Object.keys(countsuccess).map((key) =>(
                <div key={key}>
                    <p>Date: {key}</p>
                    <p>Success Count : {countsuccess[key]}</p>
                </div>
            ))}
        </div>
    )
}
export default DA;