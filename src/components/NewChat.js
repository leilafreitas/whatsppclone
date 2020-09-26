import React, {useState,useEffect} from 'react';
import './NewChat.css';
import Api from '../Api';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChatWindow from './ChatWindow';

export default ({chatlist,user,show,setshow}) => {
    const[list,setList]=useState([]);
    useEffect(()=>{
       const getList = async()=>{
        if(user!== null){
            let results=await Api.getList(user.id);
            setList(results);
            console.log(results);
        }
       }
       getList();
    },[user]);
    const handleClose = ()=>{
        setshow(false);
    }
    const addNewChat =async(user2)=>{
        await Api.addNewChat(user,user2);
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
                        <div onClick={()=>addNewChat(item)} className="newChat--item">
                            <img src={item.avatar} alt=''/>
                            <div>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}