import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import { database } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
const getChatRecordInterval = 3000;
//const inputChatroomId = '001';
export default class Chatroom extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    messages: [],
    chatroomId: ""
  }

  componentDidMount() {
    this.getChatRecord(this.props.myId, this.props.item)
    this._interval = setInterval(()=>{this.getChatRecord(this.props.myId, this.props.item)},getChatRecordInterval)
    
    /*
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
    */
  }
  componentWillUnmount(){
    clearInterval(this._interval);
  }
  async getChatRecord(myId, item){
    console.log("getChatRecord")
    console.log("myId:"+myId)
    console.log("item:"+item)
    console.log("fdId:"+item.uid)
    //console.log(new Date);
    let messages = []
    let friendList;
    await database.ref('/users/'+myId+'/friends').once('value',  snap => {
      //setMyFriendList(snap.value)
      friendList = snap.value
    }).then(async (friendList)=>{
      //chatroomId = inputChatroomId
      friendList.forEach(fdchild=>{
        console.log(fdchild.key+": "+fdchild.val())
        if (fdchild.key==item.uid){
          //chatroomId = fdchild.val()
          this.setState({chatroomId: fdchild.val()})
        }
        console.log("new chatroom id is: "+this.state.chatroomId)
      })
      console.log("Entering chatroom: "+this.state.chatroomId +"as user id: "+myId)
      await database.ref('/chatroom/'+this.state.chatroomId).once('value',  snap => {
       console.log(snap);
       snap.forEach(
           child => {
             let message = child.val();
             var messageUserInfo = {}
             if (message.user._id==this.props.myId){
              messageUserInfo = {
                _id: 1,
                name: 'My Name',
                avatar: 'https://placeimg.com/140/140/any',
              }
             }
             else{
              messageUserInfo = {
                _id: 2,
                name: 'Not Me',
                avatar: item.avatar_url,
              }
            }
             
             /*
             else if (this.props.myId!=1 && message.user._id=="1"){
              messageUserInfo = {
                _id: 2,
                name: 'Not Me',
                avatar: item.avatar_url,
              }
             }
             */
             //console.log(child.val());
             let formattedMessage = {
               _id: message._id,
               text: message.text,
               createdAt: new Date(message.createdAt),
               /*
               user: {
                 _id: message.user._id,
                 name: 'Not me',
                 avatar: 'https://placeimg.com/140/140/any',
               },
               */
              user: messageUserInfo,
             }
             //console.log(formattedMessage)
             messages.push(formattedMessage)
           }
       )
     })
     console.log("getChatRecord End")
     //console.log(messages)
     messages.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
     //messages.reverse()
     this.setState({messages: messages})
    })
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    var newId = this.state.messages.length-1
    console.log(messages)
    var currentDate = new Date()
    console.log(currentDate)
    console.log("Sending Message to :"+ this.state.chatroomId)
    database.ref('/chatroom/' + this.state.chatroomId+'/'+messages[0]._id+'/')
        .set({
          _id: messages[0]._id,
          text: messages[0].text,
          createdAt: ""+currentDate,
          user:{
            _id: this.props.myId,
            name: "My Name",
            avatar: 'https://placeimg.com/140/140/any',
          },
        })
        .then(() => {
            console.log('Sent a new message');
        })
        .catch(err => {
            console.log(err);
        });
      
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          textInputStyle={{width: windowWidth}}
        />
      </View>
    );
  }   
} 
