
import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  buttonContainer: {
      flex: 1,
      backgroundColor: 'white',
      padding: 2
  },
  acceptButtonStyle: {
    borderRadius: 15,
    padding: 5
  },
  declineButtonStyle:{
    borderRadius: 15, 
    backgroundColor:'gray',
    padding: 5
  },
  buttonText:{
    fontSize:18
  }
})

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
      <View>
        <ListItem
          title={item.info.name}
          leftAvatar={{ source: { uri: item.info.avatar_url } }}
          //subtitle={item.subtitle}
          chevron
          onPress={()=>{this.props.onClickUser(item)}}
        />
        <View 
          style={{flexDirection: "row",}}
        >
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.acceptButtonStyle}
              titleStyle={styles.buttonText}
              title="Confirm"
              onPress={()=>this.props.onAcceptFriendRequest(item)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.declineButtonStyle}
              titleStyle={styles.buttonText}
              title="Delete"
              onPress={()=>this.props.onDeclineFriendRequest(item)}
            />
          </View>
        </View>
      </View>
    )
  render() {
      if (this.props.userInfo && this.props.userInfo["friendRequests"]){
        console.log("Info")
          console.log(this.props.userInfo)
        console.log("FriendRequestList")
        var requestList = Object.keys(this.props.userInfo["friendRequests"]).reduce((array, key) => {
            return [...array, {id: key, value: this.props.userInfo["friendRequests"][key], info: this.props.allUser[key]}]
        }, [])
        console.log(requestList)
        return (
          <SafeAreaView>
            <Text>You got {requestList.length} friendRequests</Text>
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
        <Text>You got no new notification</Text>
        </SafeAreaView>
      );
  }   
} 
export default FriendRequestList;
