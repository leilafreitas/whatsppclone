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
export default()=>{
  const [chatList,setChatList] = useState([
    {chatId:1,title:'fulano',image:'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId:2,title:'cicle',image:'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId:3,title:'cul',image:'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId:4,title:'kaka',image:'https://www.w3schools.com/howto/img_avatar2.png'}

  ]);
  const [activeChat,setActiveChat]=useState({});
  const [newChat,setNewChat]=useState(false);
  const [user,setUser]=useState({
    id:1234,
    avatar:'https://www.w3schools.com/howto/img_avatar2.png',
    name:'Leila F'
  });
  const handleNewChat=()=>{
    setNewChat(true);
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
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro/>
        }
        
      </div>
    </div>
  )
}
