import React, { Component } from 'react';
import { Platform, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import firebase from 'firebase';
import { combinedStore } from '../reducers/index'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { HomeScreen } from './Home/HomeScreen'
import { ProfileScreen } from './Profile/ProfileScreen'
import ChatroomListPage from './Chat/ChatroomListPage'
import { ChatroomPage } from './Chat/ChatroomPage'
import { Event } from './Event/Event'

import NotificationPage from './Notification/NotificationPage'
import FriendRequestPage from './Notification/FriendRequestPage'

import { ResultPage } from './Finding/ResultPage'
import { MatchPage } from './Finding/MatchPage'

import { LoginScreen } from './Login/LoginScreen'
import { UpdateInfoScreen } from './UpdateInfo/UpdateInfoScreen'

import { updateUserInfoState } from '../reducers/userInfo'
import { database, auth } from '../config/config';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
function ChatScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatroomList" component={ChatroomListPage} initialParams={{id:auth.currentUser.uid}}/>
      <Stack.Screen name="Chatroom" component={ChatroomPage} />
    </Stack.Navigator>
  );
}
function NotificationScreen({ navigation, route }){
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator>
          <Stack.Screen name="Notification" component={NotificationPage} initialParams={{id:auth.currentUser.uid}}/>
          <Stack.Screen name="FriendRequest" component={FriendRequestPage} />
      </Stack.Navigator>
  )
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

function FindingScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Finding" component={MatchPage} />
      <Stack.Screen name="FindingResult" component={ResultPage} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function ProfileAndUpdateScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{id:auth.currentUser.uid}}/>
      <Stack.Screen name="UpdateInfo" component={UpdateInfoScreen} />
    </Stack.Navigator>
  );
}

function LoginAndUpdateScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} initialParams={{login: route.params?.login}}/>
      <Stack.Screen name="UpdateInfo" component={UpdateInfoScreen} initialParams={{login: route.params?.login}}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

/*<Provider store={store}>*/
/*</Provider>*/
class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      login: auth.currentUser != null?true:false, 
    }
    this.updateLogin = this.updateLogin.bind(this)
  }

  updateLogin(isLogged){
    this.setState({login: isLogged});
  }

  async updateUserInfo() {
    const { updateUserInfoHandler } = this.props;
    let userInfo = []
    console.log("Read /users");
    console.log(database.ref('/users'));
    await database.ref('/users').once('value', snap => {
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
  /*
  componentDidMount(){
    if (!this.props.userInfoStore.userInfo){
      this.updateUserInfo()
    }
      
  }
  */
  render() {
    const store = createStore(combinedStore, applyMiddleware(thunk));
    return (
      <Provider store={store}>
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
            {this.state.login&&
            <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="forum-outline" color={color} size={size} />
                ),
              }}
            />
            }
            {this.state.login&&
            <Tab.Screen
              name="Event"
              component={Event}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="calendar-text-outline" color={color} size={size} />
                ),
              }}
            />
            }
            {this.state.login&&
            <Tab.Screen
              name="Notification"
              component={NotificationScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={size} />
                ),
              }}
            />
            }
            <Tab.Screen
              name="CreatePost"
              component={CreatePostScreen}
            />
            <Tab.Screen
            name="Finding"
            component={FindingScreen}
          />
            {this.state.login?
              <Tab.Screen
                name="Profile"
                component={ProfileAndUpdateScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                  ),
                }}
              />
            :
              <Tab.Screen
              name="Login"
              component={LoginAndUpdateScreen}
              initialParams={{login: this.updateLogin}}
              />
            }
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
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
export default Main;