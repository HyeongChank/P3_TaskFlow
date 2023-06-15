import { useState } from "react";

const SenAnal = ({sentianal}) =>{
    const [getsentidata, setGetsentidata] = useState();

    const todosentianal=async()=>{
        try{
                const response = await fetch('http://127.0.0.1:5000/api/sentimentAnal', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sentianal:sentianal
                    }),
                });
                if(!response.ok){
                    throw new Error('error');
                }
                const result = await response.json();
                for(const [key, value] of Object.entries(result)){
                    console.log(`key: ${key}, value: ${value}`);
                }
                setGetsentidata(result)
 
            } catch(error){
                // console.error(error);
            }
        }
    return(
        <div>
            <button className='Bt_anal' onClick={todosentianal}>시작버튼</button>
            <div className="todowordpage">
                <p id="topwordsP">일자별 작성 Todolist 감정분석 결과</p>
                <p>감정분석이란, 텍스트에 나타난 긍정적 혹은 부정적 감정을 분석하는 방법을 말합니다.<br/>0을 기준으로 -1에 가까울수록 부정(negative)을, 1에 가까울수록 긍정(positive)를 의미합니다.</p>
                {getsentidata && 
                    <table id="wordtable">
                        <thead>
                            <tr>
                                <th id="rank_index">Date</th>
                                <th id="rank_words">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.entries(getsentidata).map(([key, value])=>{
                           return( <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                            </tr>
                           )
                        })}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
export default SenAnal;