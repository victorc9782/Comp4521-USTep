
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { ListItem, Button,Icon } from 'react-native-elements';
import { database } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
  
class ChatroomList extends Component {
  constructor(props) {
    super(props)
    this.state={
      showNoFriendNotification: true
    }
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
    toggleNotificationStatus(){
      this.setState({showNoFriendNotification: false})
    }
  render() {
    if (this.props.userInfo && this.props.userInfo["friends"]){
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
        {this.state.showNoFriendNotification&&
        <Button
          title="You are not having any friends now. Go meet some new friends."
          type="outline"
          icon={
            <Icon
              name='cancel'
              size={20}
              color="#2ca7d4"
            />
          }
          onPress={()=>this.toggleNotificationStatus()}
        />
        }
      </SafeAreaView>
    );
  }   
} 
export default ChatroomList;
