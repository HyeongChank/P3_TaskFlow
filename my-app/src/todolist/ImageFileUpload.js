import { useState } from "react"

const ImageFileUpload = () =>{
    const [selectedFile, setSelectedFile] = useState();

    const fileSelectedHandler = event =>{
        setSelectedFile(event.target.files[0]);
    };
    const fileUploadHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        try{
            const response = await fetch("http://localhost:8080/api/insertimage", {
                method: "POST",
                body:formData,
                
            });
            if(!response.ok){
                throw new Error('error')
            }
            else{
                const data = await response.json();
                // console.log(data);
            }
        }
        catch (error){
            // console.log('error' + error)
        }
    }

    return(
        <div>
            <input type = 'file' onChange={fileSelectedHandler}/>
            <button onClick={fileUploadHandler}>Upload</button>            
        </div>
    )
}
export default ImageFileUpload