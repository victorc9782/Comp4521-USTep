
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { db } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
  
export default class ChatroomList extends Component {
  constructor(props) {
    super(props)
  }
    keyExtractor = (item, index) => index.toString()
    
    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        //subtitle={item.subtitle}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        bottomDivider
        chevron
        onPress={()=>{this.props.onClickChatRoomUser(item)}}
      />
    )

  render() {
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={this.keyExtractor}
          //data={this.props.chatList}
          data={this.props.chatList}
          renderItem={this.renderItem}
          style={{width:windowWidth}}
        />
      </SafeAreaView>
    );
  }   
} 
