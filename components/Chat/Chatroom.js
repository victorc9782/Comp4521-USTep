import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
const windowWidth = Dimensions.get('window').width;
export default class Chatroom extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    messages: [],
  }

  componentDidMount() {
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
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
