import {useState, useEffect} from "react";


const Todolist = () =>{

    const [data, setData] = useState();

    useEffect(() =>{
        fetch('http://localhost:8080/api/model')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error))
    }, []);
    return(

    <div>
        {/* data 가 없을 시를 고려해야 에러 안 남 */}
        {data ? data.map((item, index) => (
            <div className = 'd1' key={index}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
            </div>
        )) : <p>Loading...</p>}
    </div>
    )
}
export default Todolist