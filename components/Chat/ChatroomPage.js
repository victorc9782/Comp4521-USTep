/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import React from 'react'
import { SafeAreaView, Text, Button, Flatlist, ScrollView, Dimensions,KeyboardAvoidingView } from 'react-native'
import { ListItem } from 'react-native-elements';
import Chatroom from './Chatroom';

const windowWidth = Dimensions.get('window').width;
export function ChatroomPage({ route, navigation }) {
  React.useEffect(() => {
    if (route.params?.item) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.item]);
    return (
      <SafeAreaView style={{  flex: 1, alignItems: 'stretch', justifyContent: 'center', width: windowWidth }}>       
        <ListItem
          title={route.params?.item.info.name}
          subtitle={route.params?.item.subtitle}
          leftAvatar={{ source: { uri: route.params?.item.info.avatar_url } }}
          bottomDivider
          chevron
          onPress={(item)=> navigation.navigate("Profile",{ id: route.params?.item.info.uid})}
        />
        <Chatroom
          ChatroomStyle={{width: windowWidth}}
          myId={route.params.myId}
          item={route.params.item.info}
        />
  
        {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        }
      </SafeAreaView>
      
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