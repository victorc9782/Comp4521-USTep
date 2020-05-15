import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import { database } from '../../config/config';

const windowWidth = Dimensions.get('window').width;
const getChatRecordInterval = 3000;
const inputChatroomId = '001';
export default class Chatroom extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    messages: [],
  }

  componentDidMount() {
    this.getChatRecord(inputChatroomId)
    this._interval = setInterval(()=>{this.getChatRecord(inputChatroomId)},getChatRecordInterval)
    
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
  async getChatRecord(chatroomId){
    console.log("getChatRecord")
    //console.log(new Date);
    let messages = []
    await database.ref('/chatroom/'+chatroomId).once('value',  snap => {
      console.log(snap);
      snap.forEach(
          child => {
            let message = child.val();
            //console.log(child.val());
            let formattedMessage = {
              _id: message._id,
              text: message.text,
              createdAt: new Date(message.createdAt),
              user: {
                _id: message.user._id,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
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
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    var newId = this.state.messages.length-1
    console.log(messages)
    var currentDate = new Date()
    console.log(currentDate)
    database.ref('/chatroom/' + inputChatroomId+'/'+messages[0]._id+'/')
        .set({
          _id: messages[0]._id,
          text: messages[0].text,
          createdAt: ""+currentDate,
          user:messages[0].user,
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
