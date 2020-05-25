import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import { connect } from 'react-redux';
import { updateUserInfo } from '../../reducers/userInfo'
import { database } from '../../config/config';
import FriendRequestList from './FriendRequestList.js'
//const  myId="Mr2kGP1Qa8XE6BvgpEtZMpuEWvs2";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white'
    },
})

function gen4() {
    return Math.random().toString(16).slice(-4)
}

function simpleUniqueId(prefix) {
    return (prefix || '').concat([
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4()
    ].join(''))
}
function becomeFriends(userAid, userBid, chatroomId){
    database.ref('/users/'+userAid+'/friends/'+userBid).set(chatroomId)
    database.ref('/users/'+userBid+'/friends/'+userAid).set(chatroomId)
}
function onAcceptFriendRequest(item ,myId){
    console.log("onAcceptFriendRequest")
    console.log(item)
    var newChatroomId = simpleUniqueId("")
    becomeFriends(myId, item.id, newChatroomId)
    removeFriendRequest(item, myId)
}
function removeFriendRequest(item ,myId){
    console.log("removeFriendRequest")
    console.log("Remove "+item.id)
    database.ref('/users/'+myId+'/friendRequests/'+item.id).remove()
}
function NotificationPage({ route, navigation, userInfo }) {
    const myId = route.params?.id 
    console.log("myId from parms: "+myId)
    const keyExtractor = (item, key) => key.toString();
    const renderItem = ({ item }) => (
        <Text>{item.val()}</Text>
    )
    console.log("NotificationPage")
    /* console.log(userInfo)
    console.log(userInfo[myId]) */
    //console.log(userInfo[myId]["friendRequests"])
    return (
        <View style={styles.container}>
            <FriendRequestList
                userInfo={userInfo[myId]}
                allUser={userInfo}
                onAcceptFriendRequest={(item)=>onAcceptFriendRequest(item,myId)}
                onDeclineFriendRequest={(item)=>removeFriendRequest(item, myId)}
                onClickUser={(item)=> navigation.navigate("Profile",{ id: item.id})}
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

export default connect(mapState, mapDispatch)(NotificationPage);