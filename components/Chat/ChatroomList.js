
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
      userInfo: null,
      loadedUserData: false
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
          snap.forEach(
              child => {
                console.log("Push:" +child.val().id);
                userInfo.push(child.val());
              }
          )
      }).then(() => {
        this.setState({userInfo: userInfo})
      })
    }
  async componentDidMount(){
    await this.updateUserInfo().then(()=>{
      console.log("userInfo final:");
      console.log(this.state.userInfo);
      this.setState({loadedUserData: true})
      this.forceUpdate();
    })
  }
  render() {
    return (
      <SafeAreaView>
        {this.state.loadedUserData&&(
          <>
        <Button onPress={()=>console.log(this.state.userInfo)}>Test</Button>
        <FlatList
          keyExtractor={this.keyExtractor}
          //data={this.props.chatList}
          data={this.state.userinfo}
          renderItem={this.renderItem}
          style={{width:windowWidth}}
        />
        </>
        )
        }
      </SafeAreaView>
    );
  }   
} 
export default connect(
  state => ({ 
    userInfoStore: state.userInfo 
  })
)(ChatroomList);
