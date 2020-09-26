import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import firebaseConfig from './firebaseConfig';
const firebaseApp= firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
//TUDO RELACIONADO AO BD NESSE AQUIVO AQUI MESMO
//função que faz login com facebook
export default{
    fbPopup:async ()=>{
        const provider = new firebase.auth.FacebookAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(provider);
        return result;
    },
    addUser: async(u)=>{
        await db.collection('users').doc(u.id).set({
            name:u.name,
            avatar:u.avatar
        },{merge:true});
    },
    getList: async(userId)=>{
        let list=[];
        let results= await db.collection('users').get();
        results.forEach(result => {
            let data= result.data();
            if(result.id!== userId){
                list.push({
                    id:result.id,
                    name:data.name,
                    avatar:data.avatar

                })
            }
        });

        return list;
    },
    addNewChat: async(user,user2)=>{
        let dateUser = await db.collection('users').doc(user.id).get();
        let usuario= dateUser.data();
        let validInsert=true;

        if (usuario.chats.length > 0){
            for(let i of usuario.chats){

                if(i.title === user2.name){
                    
                    validInsert=false;
                   break;
                }
            }
        }
        if(validInsert === true) {
            let newChat = await db.collection('chats').add({
                messages:[],
                users:[user.id,user2.id]
            });
            //Informações para a collection users
            db.collection('users').doc(user.id).update({
                //update da lista de chats
                //adiciona esse item no array qye ja existe, sem subtituir todo o array
                chats:firebase.firestore.FieldValue.arrayUnion({
                    chatId: newChat.id,
                    title:user2.name,
                    image:user2.avatar,
                    with:user2.id
                })
    
            });
            db.collection('users').doc(user2.id).update({
                //update da lista de chats
                //adiciona esse item no array qye ja existe, sem subtituir todo o array
                chats:firebase.firestore.FieldValue.arrayUnion({
                    chatId: newChat.id,
                    title:user.name,
                    image:user.avatar,
                    with:user.id
                })
    
            });
        }
    },
    onChatList: (userId,setChatList)=>{
        return db.collection('users').doc(userId).onSnapshot((doc)=>{
            if(doc.exists){
                let data = doc.data();
                if(data.chats){
                    console.log(data.chats);
                    setChatList(data.chats);
                }
            }
        });
    },
    onChatContent: (chatId,setList,setUsers)=>{
        return db.collection('chats').doc(chatId).onSnapshot((doc)=>{
            console.log('verific');
            if(doc.exists){
                console.log('doc exist');
                let data= doc.data();
                console.log(data.messages);
                setList(data.messages);
                setUsers(data.users);
            }
        })
    },
    sendMessage:async (chatData,userId,type,body,users)=>{
        let now = new Date();
        db.collection('chats').doc(chatData.chatId).update({
            messages:firebase.firestore.FieldValue.arrayUnion({
                type,
                author:userId,
                body,
                date:now
            })
        })
        for (let i in users){
            let u =await db.collection('users').doc(users[i]).get();
            let uData= u.data();
            if(uData.chats){
                let chats=[...uData.chats];
                for(let e in chats){
                    if(chats[e].chatId == chatData.chatId){
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate= now;
                    }
                }
                await db.collection('users').doc(users[i]).update({
                    chats
                })
            }
        }
    }

}