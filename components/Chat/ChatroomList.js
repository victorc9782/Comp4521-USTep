
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { db } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
  
class ChatroomList extends Component {
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
  componentDidMount(){
    console.log("ChatroomList componentDidUpdate()")
    console.log(this.props.userInfoStore.userinfo)
  }
  render() {
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={this.keyExtractor}
          //data={this.props.chatList}
          data={this.props.userInfoStore.userinfo}
          renderItem={this.renderItem}
          style={{width:windowWidth}}
        />
      </SafeAreaView>
    );
  }   
} 
export default connect(
  state => ({ 
    userInfoStore: state.userInfo 
  })
)(ChatroomList);
