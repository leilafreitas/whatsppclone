import React from 'react';
import Api from '../Api';
import './Login.css';
export default({onReceive})=>{
    const handleFacebookLogin =async()=>{
        let result =await Api.fbPopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Error!");
        }
    }
    return(
        <div className='login'>
            <button onClick={handleFacebookLogin}>Logan com Facebook</button>
        </div>
    )
}