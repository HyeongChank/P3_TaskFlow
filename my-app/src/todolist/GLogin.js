import {GoogleLogin} from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GLogin = () => {
    const clientId = '755071857432-smn8kt6gc6g5le7tb5nci5ikkiuei124.apps.googleusercontent.com';

    const onSuccess = (response) =>{
        console.log(response);
    }
    const onFailure = (error) =>{
        console.log(error);
    }


    return(
        <div>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                 onSuccess={onSuccess}
                 onFailure={onFailure}
                />

            </GoogleOAuthProvider>
        </div>
    );
};
export default GLogin;