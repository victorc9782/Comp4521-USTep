/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import { connect } from 'react-redux';
import { updateUserInfo } from '../../reducers/userInfo'
import { database } from '../../config/config';
import ChatroomList from './ChatroomList.js'
//const  myId="Mr2kGP1Qa8XE6BvgpEtZMpuEWvs2";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white'
    },
})

function ChatroomListPage({ route, navigation, userInfo }) {
    const myId = route.params?.id 
    const keyExtractor = (item, key) => key.toString();
    const renderItem = ({ item }) => (
        <Text>{item.val()}</Text>
    )
/*     console.log("ChatroomListPage")
    console.log(userInfo)
    console.log(userInfo[myId]) */
    //console.log(userInfo[myId]["friendRequests"])
    return (
        <View style={styles.container}>
            <ChatroomList
                userInfo={userInfo[myId]}
                allUser={userInfo}
                onAcceptFriendRequest={(item)=>onAcceptFriendRequest(item)}
                onDeclineFriendRequest={(item)=>onDeclineFriendRequest(item)}
                onClickChatRoomUser={(item)=> navigation.navigate("Chatroom",{ item: item, myId: myId})}
            />
            
        </View>
    );
}
const renderSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                backgroundColor: "#CED0CE",
            }}
        />
    );
};
const mapState = state => ({
    userInfo: state.userInfo,
})

const mapDispatch = dispatch => {
    /* dispatch(getEvents()); */
    dispatch(updateUserInfo());
    return {};
}

export default connect(mapState, mapDispatch)(ChatroomListPage);