import React, { useEffect, useRef, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import TodoChart from './TodoChart';
import TodoWordAnal from './TodoWordAnal';
import SenAnal from './SenAnal';



const DA = () =>{
    const navigate = useNavigate();
    const [gettododata, setGettododate] = useState();
    const [countsuccess, setCountsuccess] = useState([]);
    const [counttodo, setCounttodo] = useState([]);
    const [successbydate, setSuccessbydate] = useState([]);
    const [countbydate, setCountbydate] = useState([]);
    const [totalSuccessCount, setTotalSuccessCount] = useState();
    const [totalTodoCount, setTotalTodoCount] = useState();
    const [countRatio, setCountRatio] = useState();
    const [visible, setVisible] = useState(false);
    const localhost = 8080;

    const todolist = Object.values(countbydate);
    const successlist = Object.values(successbydate);
    const datelist = Object.keys(countbydate);
    const startdate = datelist[0];
    const lastdate = datelist[datelist.length-1]
    const location = useLocation();
    const value = location.state.value;
    const mid = location.state.mid;
    const [wordanal, setWordanal] = useState();
    const [sentianal, setSentianal] = useState();

    console.log(value);
    console.log(mid);
    const gotodoPage = () =>{
        navigate('/p', {state:{mid:mid}})
    }
    const gohomepage = () =>{
        navigate('/');
    }
    const getdata = async(event) =>{
        event.preventDefault();
        setVisible(true);

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
            // console.log(result)
            setGettododate(result);

        } catch(error){
            // console.error(error);
        }
    }
    useEffect(()=>{
        if(gettododata){
            const todotitle = gettododata.map((i)=>i.todo)
            const todocontent = gettododata.map((i)=>i.content)
            const todocdate = gettododata.map((i)=>i.cdate)
            let todocombined = todotitle.map((item, index) => item + ' ' + todocontent[index])
        setWordanal([todotitle, todocontent])
        
        setSentianal({todocdate, todocombined})
        console.log('wordanal',wordanal)
        };
        // 날짜별 달성 일정 개수
        if(gettododata){
            const successcountBydate = gettododata.reduce((acc, item)=>{
                if(item.success ==='success'){
                    acc[item.cdate] = (acc[item.cdate] || 0) +1;
                }
                else{
                    acc[item.cdate] = 0;
                }
                return acc;
            }, {});
        setSuccessbydate(successcountBydate)
        }
        // 날짜별 일정 개수
        if(gettododata){
            const todocountBydate = gettododata.reduce((acc, item)=>{
                
                acc[item.cdate] = (acc[item.cdate] || 0) +1;
                
                return acc;
            }, {});
        setCountbydate(todocountBydate)
        }
        // 총 달성 개수
        if(gettododata){
            const successCount = gettododata.reduce((counts, item) =>{
                // console.log("item", item);
                if(item.success ==='success'){
                    // 해당 날짜에 없는 경우 처음 1 설정
                    if(!counts[item.mid]){
                        counts[item.mid] = 1;
                    }
                    else{
                        counts[item.mid] ++;
                    }
                }
                return counts
            }, {});
            // 총합 계산
            const totalSuccessCount = Object.values(successCount).reduce((a, b) => a + b, 0);
            setTotalSuccessCount(totalSuccessCount);
            setCountsuccess(successCount);
        }
        // 총 일정 개수
        if(gettododata){
            const todoCount = gettododata.reduce((counts, item) =>{
                // console.log("item", item);
                    // 해당 날짜에 없는 경우 처음 1 설정
                if(!counts[item.mid]){
                    counts[item.mid] = 1;
                }
                else{
                    counts[item.mid] ++;
                }
                return counts
            }, {});
            const totalCount = Object.values(todoCount).reduce((a,b) => a+b,0)

            setTotalTodoCount(totalCount)
            setCounttodo(todoCount);
            // 총 달성개수/일정개수 비율
            if(totalCount !==0){
                // 소수점 2자리까지 반올림하는 방법
                const ratio = Math.round((totalSuccessCount / totalTodoCount *100)*100)/100;
                setCountRatio(ratio);
            }
            else{
                setCountRatio(0);
            }
        }

    }, [gettododata])
    console.log(gettododata)
    console.log('successbydate', successbydate)
    console.log('length', Object.keys(successbydate).length)
    console.log('countBydate', countbydate)
    console.log('sentianal', sentianal)
    return(
        <div>
            <div>
                <button className='getdataBt' onClick={gotodoPage}>일정페이지 이동</button>
                <button className='getdataBt' onClick={gohomepage}>로그아웃</button>
            </div>
        <div className='dapage'>
            <div>
                <h1>Todolist Analysis</h1>
            </div>
            
            <div className='daDisplay'>
                <div className='datextArea'>
                    <button className='Bt_anal' onClick={getdata}>시작 버튼</button>
                    <p id="topwordsP">일자별 Todolist 및 달성 현황차트</p>
                    {visible && (<div>
                        <p id='analP'><span>- 기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간 : </span>
                        {startdate} ~ {lastdate}</p>
                    </div>)}
                {Object.keys(counttodo).map((key) =>(
                    <div key={key}>
                        <p id='analP'>- I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d : {key}</p>
                        <p id='analP'>- Count of Todo(개) : {counttodo[key]}</p>
                    </div>
                ))}
                {Object.keys(countsuccess).map((key) =>(
                    <div key={key}>
                        <p id='analP'>- Count of Success(개) : {countsuccess[key]}</p>
                    </div>
                ))}
                    {/* <div>{totalTodoCount}</div>
                    <div>{totalSuccessCount}</div> */}
                    {visible && (<div>
                        <p id='analP'><span>- 일정 달성률 : </span>{countRatio}%</p>
                    </div>)}
                </div>
                <div className='todoChart'>
                    <TodoChart datelist={datelist} countbydate={todolist} successbydate={successlist}/>
                </div>
                <div className='todoFrequent'>
                    <TodoWordAnal wordanal={wordanal}/>
                </div>
                <div className='todoFrequent'>
                    <SenAnal sentianal={sentianal}/>
                </div>

            </div>
        </div>
        </div>
    )
}
export default DA;