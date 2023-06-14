import { useState } from "react";


const TodoWordAnal = ({wordanal}) =>{
    const [getdata, setGetdata] = useState();
    console.log('wordanalpage', wordanal);
    const todowordanal=async()=>{
    try{
            const response = await fetch('http://127.0.0.1:5000/api/todoWordAnal', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wordanal:wordanal
                }),
            });
            if(!response.ok){
                throw new Error('getsuccess error');
            }
            const result = await response.json();
            setGetdata(result)
            console.log('get', result); 
        } catch(error){
            // console.error(error);
        }
    }
    
   
    return(
        <div>
            <button onClick={todowordanal}>버튼</button>
            {getdata && getdata.map((i)=>
            <div>{i}</div>)}
        </div>
    )
}
export default TodoWordAnal;