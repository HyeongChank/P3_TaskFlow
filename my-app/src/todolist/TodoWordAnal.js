import { useState } from "react";


const TodoWordAnal = ({wordanal}) =>{
    const [getdata, setGetdata] = useState();
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
            console.log('getdata', result); 
        } catch(error){
            // console.error(error);
        }
    }
    const nums = [1,2,3,4,5,6,7,8,9,10]
    return(
        <div>
            <button className='getdataBt' onClick={todowordanal}>시작버튼</button>
            <div className="todowordpage">
            <p id="topwordsP">출현 빈도 높은 Words Top 10</p>
            {getdata && 
                <table id="wordtable">
                    <thead>
                        <tr>
                            <th id="rank_index">Rank</th>
                            <th id="rank_words">Word</th>
                            <th id="rank_count">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getdata.map((i, index)=>
                            <tr key={index}>
                                <td id="rank_index">{nums[index]}</td>
                                <td id="rank_words">{i[0]}</td>
                                <td id="rank_count">{i[1]}개</td>
                            </tr>
                        )}
                    </tbody>
                </table>
             
            }
            </div>
        </div>
    )
}
export default TodoWordAnal;