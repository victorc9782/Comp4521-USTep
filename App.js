import React, { Component } from 'react';
import { Platform, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Main from './components/Main'
import { HomeScreen } from './components/Home/HomeScreen'
import { ProfileScreen } from './components/Profile/ProfileScreen'
import {ChatroomListPage} from './components/Chat/ChatroomListPage'
import {ChatroomPage} from './components/Chat/ChatroomPage'
import { NotificationScreen } from './components/Notification/NotificationScreen'
import firebase from 'firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
function ChatScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatroomList" component={ChatroomListPage} />
      <Stack.Screen name="Chatroom" component={ChatroomPage} />
    </Stack.Navigator>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}
//let store = createStore(rootReducer, window.STATE_FROM_SERVER)

export default class App extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
        <Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
