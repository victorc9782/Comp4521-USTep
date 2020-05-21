
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
  
class FriendRequestList extends Component {
  constructor(props) {
    super(props)
    this.state={
      userInfo: null
    }
  }
    keyExtractor = (requestId, value) => index.toString()
    
    renderItem = ({item}) => (
      <ListItem
        title={item.id}
        //subtitle={item.subtitle}
        bottomDivider
        chevron
        //onPress={()=>{this.props.onClickChatRoomUser(item)}}
      />
    )
  render() {
      if (this.props.userInfo){
        console.log("Info")
          console.log(this.props.userInfo)
        console.log("FriendRequestList")
        var requestList = Object.keys(this.props.userInfo["friendRequests"]).reduce((array, key) => {
            return [...array, {id: key, value: this.props.userInfo["friendRequests"][key]}]
        }, [])
        console.log(requestList)
        return (
          <SafeAreaView>
            <FlatList
              //keyExtractor={this.keyExtractor}
              data={requestList}
              //data={this.state.userinfo}
              renderItem={this.renderItem}
              style={{width:windowWidth}}
            />
          </SafeAreaView>
        );
      }
      return (
        <SafeAreaView>
        </SafeAreaView>
      );
  }   
} 
export default FriendRequestList;
