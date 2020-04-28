import React from 'react'
import { View, Text, Button, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { ListItem } from 'react-native-elements';

import Chatroom from './Chatroom'
import ChatroomList from './ChatroomList'
import { db } from '../../config/config';


function keyExtractor(item, index){
    return index.toString()
}
export default function ChatroomListPage({ route, navigation}) {
  
  let localUserInfo = []
  console.log("ChatroomListPage Read ref")
  console.log(db.ref('/users'));
  db.ref('/users').once('value',  snap => {
    console.log(snap);
    snap.forEach(
        child => {
          console.log(child.val());
          localUserInfo.push(child.val());
        }
    )
  })
  console.log("ChatroomListPage Read ref end")
  
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
