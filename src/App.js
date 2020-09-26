import React,{useState,useEffect} from 'react';
import "./App.css";
import ChatWindow from './components/ChatWindow';
import ChatListItem from './components/ChatListItem';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ChatIntro from './components/ChatIntro';
import NewChat from './components/NewChat';
import Login from './components/Login'
import Api from './Api';
export default()=>{
  const [chatList,setChatList] = useState([]);
  const [activeChat,setActiveChat]=useState({});
  const [newChat,setNewChat]=useState(false);
  const [user,setUser]=useState(null);
  useEffect(()=>{
    if(user!=null){
      let unsub= Api.onChatList(user.id,setChatList);
      return unsub;
    }
  },[user]);
  const handleNewChat=()=>{
    setNewChat(true);
  }
  const handleLoginData = async(u)=>{
    let newUser ={
      id: u.uid,
      name:u.displayName,
      avatar:u.photoURL
    }
    await Api.addUser(newUser);
    setUser(newUser);
  }
  if(user===null){
    return (<Login onReceive={handleLoginData}/>)
  }
  return(
    <div className="app-window">
      <div className='sidebar'>
        <NewChat
          chatList={chatList}
          user={user}
          show={newChat}
          setshow={setNewChat}
        />
        <header>
          <img className="header--avatar" src={user.avatar}/>
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color:'#919191'}}/>       
            </div>
            <div className="header--btn" onClick={handleNewChat}>
              <ChatIcon style={{color:'#919191'}}/>       
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color:'#919191'}}/>       
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{color:"#919191"}}/>
            <input type="search" placeholder="Procurar ou começar uma conversa"/>
          </div>
        </div>
        <div className="chatlist">
          {chatList.map((item,key)=>(
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId===item.chatId}
              onClick={()=>setActiveChat(item)}
            />
          ))}
        </div>
      </div>
      <div className='contentarea'>
        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
            data={activeChat}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro/>
        }
        
      </div>
    </div>
  )
}
