
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { db } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
  
class ChatroomList extends Component {
  constructor(props) {
    super(props)
    this.state={
      userInfo: null
    }
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
    async updateUserInfo(){
      const {updateUserInfoHandler} = this.props;
      let userInfo = []
      console.log("Read /users");
      console.log(db.ref('/users'));
      await db.ref('/users').once('value',  snap => {
          console.log(snap);
          snap.forEach(
              child => {
              
              userInfo.push(child.val());
              }
          )
      })
      this.setState({userInfo: userInfo})
    }
  componentDidMount(){
    //this.updateUserInfo()
  }
  render() {
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.chatList}
          //data={this.state.userinfo}
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
