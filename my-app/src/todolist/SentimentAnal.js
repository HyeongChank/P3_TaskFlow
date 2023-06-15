
const SentimentAnal = ({SentimentAnal}) =>{
    console.log();
    // const todosentiment = async() =>{
    // try{
    //     const response = await fetch('http://127.0.0.1:5000/api/todoWordAnal', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             gettododata:gettododata
    //         }),
    //     });
    //     if(!response.ok){
    //         throw new Error('getsuccess error');
    //     }
    //     const result = await response.json();
       
    //     console.log('getdata', result); 
    // } catch(error){
    //     // console.error(error);
    // }
  
    // }
    return(
        <div>
            {/* <button onClick={todosentiment}>감정분석</button> */}
        </div>
    )
}
export default SentimentAnal();