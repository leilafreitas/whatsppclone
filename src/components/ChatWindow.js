import React,{useState,useEffect,useRef} from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';
import MessageItem from './MessageItem';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
export default({user})=>{
    const body = useRef();
    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
    if (SpeechRecognition !== undefined){
        recognition = new SpeechRecognition();
    }
    const[emojiOpen,setEmjiOpens]= useState(false);
    const[text,setText]=useState('');
    const[listening,setListening]=useState(false);
    const[list,setList]=useState([
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
        {autor:123, body:'lalaalla'},
        {autor:123, body:'lalaalla2'},
        {autor:1234, body:'bla bla bla'},
    ]);
    useEffect(()=>{
        //SE a altura do conteuro for maior que a altura do body div, entao tem barra de rolagem
        if(body.current.scrollHeight > body.current.offsetHeight){
            //o incio da barra de rolagem vai a diferenca entre o cnteudo do body e altura da div
            body.current.scrollTop= body.current.scrollHeight-body.current.offsetHeight;
        }
    },[list]);
    const handleEmojiClick =(e,emojiObject)=>{
        setText(text+emojiObject.emoji);
    }
    const handleOpenEmoji =()=>{
        setEmjiOpens(true);
    }
    const handleCloseEmoji =()=>{
        setEmjiOpens(false);
    }
    const handleMicClick =()=>{
        if(recognition !== null){
            recognition.onstart=()=>{
                setListening(true);
            }
            recognition.onend=()=>{
                setListening(false);
            }
            recognition.onresult=(e)=>{
                setText(e.results[0][0].transcript);
            }
            recognition.start();
        }
    }
    const handleSendClick =()=>{

    }
    return(
        <div className='chatWindow'>
            <div className="chatWindow--header">
                <div className="chatWindow--headerinfo">
                    <img src='https://www.w3schools.com/howto/img_avatar2.png'/>
                    <div className='chatWindow--name'>Leila Freitas</div>
                </div>
                <div className='chatWindow--headerbuttons'>
                    <div className="chatWindow--btn">
                        <SearchIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{color:'#919191'}}/>
                    </div>

                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                {
                    list.map((item,key)=>(
                        <MessageItem
                        key={key}
                        data={item}
                        user={user}/>
                    ))
                }
            </div>
            <div className="chatWindow-emojiarea"
            style={{height: emojiOpen? '200px': '0px'}}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>
            <div className="chatWindow--footer">
                <div className="chatWindow-pre">
                    <div className="chatWindow--btn" onClick={handleCloseEmoji} style={{width: emojiOpen?40:0}}>
                        <CloseIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="chatWindow--btn" onClick={handleOpenEmoji} >
                        <InsertEmoticonIcon style={{color: emojiOpen? '#009688':'#919191'}}/>
                    </div>
                </div>
                <div className="chatWindow-inputarea">
                    <input text="text"
                    placeholder="Digite uma mensagem"
                    value={text}
                    onChange={e=>setText(e.target.value)}/>
                </div>
                <div className="chatWindow-pos">
                    {text === '' &&
                    <div className="chatWindow--btn" onClick={handleMicClick}>
                        <MicIcon style={{color:listening? '#126ece':'#919191'}}/>
                    </div>
                    }
                    {text !== '' && 
                     <div className="chatWindow--btn" onClick={handleSendClick}>
                         <SendIcon style={{color:'#919191'}}/>
                     </div>
                    
                    }
                </div>
            </div>
        </div>
    );
}