import React from 'react'
import { View, Text, Button, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { ListItem } from 'react-native-elements';

import Chatroom from './Chatroom'
import ChatroomList from './ChatroomList'
import { database } from '../../config/config';

const  myId=1;
function keyExtractor(item, index){
    return index.toString()
}
export default function ChatroomListPage({ route, navigation}) {
  
  let localUserInfo = []
  var myFriendList = []
  console.log("My friend list")
  database.ref('/users/'+myId+'/friends').once('value',  snap => {
    myFriendList = snap.value;
  }).then((myFriendList)=>{
      console.log("My friend list:\n"+myFriendList)
      myFriendList.forEach(child=>{
        console.log(child.key+": "+child.val())
        
      })
      console.log("ChatroomListPage Read ref")
      console.log(database.ref('/users'));
      database.ref('/users').once('value',  snap => {
        console.log(snap);
        snap.forEach(
            child => {
              var isFriend = false;
              console.log(child.val());
              
              myFriendList.forEach(fdchild=>{
                if (fdchild.key==child.key){
                  isFriend = true;
                }
              })

              if (isFriend){
                localUserInfo.push(child.val());
              }
            }
        )
      })
      console.log("ChatroomListPage Read ref end")
    }
  )
  
    return (
      <SafeAreaView style={{  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat Screen</Text>
        <ChatroomList 
        chatList={localUserInfo} 
        onClickChatRoomUser={(item)=> navigation.navigate('Chatroom',{ item: item})}
        />
  
        <Button title="Go to Chatroom" onPress={() => navigation.navigate('Chatroom')} />
      </SafeAreaView>
      
    );
}
