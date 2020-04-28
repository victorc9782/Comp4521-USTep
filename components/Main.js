import React, { Component } from 'react';
import { Platform, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Provider, connect } from 'react-redux';
import firebase from 'firebase';
//import createSagaMiddleware from 'redux-saga';

import { HomeScreen } from './Home/HomeScreen'
import { ProfileScreen } from './Profile/ProfileScreen'
import ChatroomListPage from './Chat/ChatroomListPage'
import {ChatroomPage} from './Chat/ChatroomPage'
import { EventScreen } from './Event/EventScreen'
import { NotificationScreen } from './Notification/NotificationScreen'

import {updateUserInfoState} from '../reducers/userInfo'
import { db } from '../config/config';

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
const Tab = createBottomTabNavigator();

      /*<Provider store={store}>*/
      /*</Provider>*/
class Main extends Component {

  constructor(props) {
    super(props)
  }

  async updateUserInfo(){
    const {updateUserInfoHandler} = this.props;
    let userInfo = []
    console.log("Read /users");
    console.log(db.ref('/users'));
    await db.ref('/users').once('value',  snap => {
        console.log(snap);
        snap.forEach(
            child => {
            
            console.log(child.val());
            userInfo.push(child.val());
            }
        )
    })
    console.log("Read /users End");
    console.log(userInfo)
    updateUserInfoHandler(userInfo);
    console.log("Main.js componentDidUpdate after store")
    console.log(this.props.userInfoStore.userInfo)
  }
  componentDidMount(){
    if (this.props.userInfoStore.userInfo == null){
      this.updateUserInfo()
    }
    
  }
  render() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              activeTintColor: '#e91e63',
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="forum-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Event"
              component={EventScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="calendar-text-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Notification"
              component={NotificationScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="CreatePost"
              component={CreatePostScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
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
export default connect(
    state => ({ 
      userInfoStore: state.userInfo 
    }),
    dispatch => ({
        updateUserInfoHandler: (infoList) => {
        dispatch(updateUserInfoState(infoList));
      },
    }),
  )(Main);