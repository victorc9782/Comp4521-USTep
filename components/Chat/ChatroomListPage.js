import React from 'react'
import { View, Text, Button, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { ListItem } from 'react-native-elements';

import Chatroom from './Chatroom'
import ChatroomList from './ChatroomList'
import { db } from '../../config/config';


function keyExtractor(item, index){
    return index.toString()
}
export function ChatroomListPage({ route, navigation }) {
  let userInfo = []
  
  db.ref('/users').once('value',  snap => {
    console.log(snap);
    snap.forEach(
        child => {
          userInfo.push(child.val());
        }
    )
  })
    return (
      <SafeAreaView style={{  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat Screen</Text>
        <ChatroomList 
        chatList={userInfo} 
        onClickChatRoomUser={(item)=> navigation.navigate('Chatroom',{ item: item})}
        />
  
        <Button title="Go to Chatroom" onPress={() => navigation.navigate('Chatroom')} />
      </SafeAreaView>
      
    );
}