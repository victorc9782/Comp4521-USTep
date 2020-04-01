import React from 'react'
import { View, Text, Button, Flatlist, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements';

import Chatroom from './Chatroom'
import ChatroomList from './ChatroomList'

function keyExtractor(item, index){
    return index.toString()
}

function renderItem ({ item }){
    return(
    <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        bottomDivider
        chevron
    />
    )
}
export function ChatScreen({ route, navigation }) {
    const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        }
        // more items
    ]
    return (
        <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chat Screen</Text>

            <ChatroomList/>
            
            
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}
/*

            <ScrollView>
            {
                    list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider
                    />
                    ))
            }
            </ScrollView>
             */