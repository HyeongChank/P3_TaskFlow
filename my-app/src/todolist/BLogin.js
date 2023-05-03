
const BLongin = (props) =>{

    const loginbasic = async(e) =>{
        e.preventDefault();
        const data = {
            id: e.target.id.value,
            password: e.target.password.value,
          };
        try{
            const response = await fetch('/api/login', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
            

            if(!response.ok){
                throw new Error('login error');
            }
            const result = await response.text();
            if(result === '로그인 성공'){
                console.log('success');
                props.onSuccess();
            } else{
                console.log('failure');
            }
        } catch(error){
            console.error(error);
        }

    };       
    return(
        <div>
            <form onSubmit={loginbasic}>
                <label>ID : 
                    
                    <input type="text" name="id"></input>
                </label>
                <label>PASSWORD : 
                    <input type="password" name="password"></input>
                </label>
                    <button type="submit">기사용자 확인</button>
            </form>
        </div>
    )
}
export default BLongin;