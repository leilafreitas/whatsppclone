import React from 'react';
import './MessageItem.css';
export default ({data,user}) => {
    return(
        <div className="messageLine"
        style={{
            justifyContent:user.id===data.autor ? 'flex-end':'flex-start'
        }}        
        >
            <div className="messageItem"
                style={{
                    backgroundColor:user.id===data.autor ? '#dcf8cc':'#fff'
                }} 
            >
                <div className="messagetxt">
                {data.body}
                </div>
                <div className="messagedate">
                19:00               
                </div>
            </div>
        </div>
    );
}