import React, {useState} from 'react';
import './NewChat.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({chatlist,user,show,setshow}) => {
    const[list,setList]=useState([
        {id:123,    avatar:'https://www.w3schools.com/howto/img_avatar2.png',
        name:'Carlin'},
        {id:123,    avatar:'https://www.w3schools.com/howto/img_avatar2.png',
        name:'Carlin'},
        {id:123,    avatar:'https://www.w3schools.com/howto/img_avatar2.png',
        name:'Carlin'},
        {id:123,    avatar:'https://www.w3schools.com/howto/img_avatar2.png',
        name:'Carlin'},
    ])
    const handleClose = ()=>{
        setshow(false);
    }
    return(
        <div className='newChat' style={{left:show? 0:-415}}>
            <div className="newChat--head">
                <div className="newChat--backbutton" onClick={handleClose}>
                    <ArrowBackIcon style={{color:'#ffffff'}}/>
                </div>
                <div className="newChat--headTitle">
                    Nova Conversa
                </div>
            </div>
            <div className="newChat--list">
                {
                    list.map((item,key)=>(
                        <div className="newChat--item">
                            <img src={item.avatar} alt/>
                            <div>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}