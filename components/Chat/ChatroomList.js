
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { database } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
  
class ChatroomList extends Component {
  constructor(props) {
    super(props)
  }
    keyExtractor = (item, index) => index.toString()
    
    renderItem = ({ item }) => (
      <ListItem
        title={item.info.name}
        //subtitle={item.subtitle}
        leftAvatar={{ source: { uri: item.info.avatar_url } }}
        bottomDivider
        chevron
        onPress={()=>{this.props.onClickChatRoomUser(item)}}
      />
    )
  render() {
    if (this.props.userInfo && this.props.userInfo["friends"]){
      console.log("userInfo")
      console.log(this.props.userInfo)
    //     console.log(this.props.allUser)
      var requestList = Object.keys(this.props.userInfo["friends"]).reduce((array, key) => {
        return [...array, {id: key, value: this.props.userInfo["friends"][key], info: this.props.allUser[key]}]
    }, [])
    return(
    <SafeAreaView>
      <FlatList
        keyExtractor={this.keyExtractor}
        //data={this.props.chatList}
        data={requestList}
        renderItem={this.renderItem}
        style={{width:windowWidth}}
      /> 
    </SafeAreaView>
    )
    }
    return (
      <SafeAreaView>
        <Text>You are not having any friends now. Go to meet some new friends.</Text>
      </SafeAreaView>
    );
  }   
} 
export default ChatroomList;
