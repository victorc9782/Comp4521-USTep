import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import { connect } from 'react-redux';
import { updateUserInfo } from '../../reducers/userInfo'
import FriendRequestList from './FriendRequestList.js'
const  myId="Mr2kGP1Qa8XE6BvgpEtZMpuEWvs2";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white'
    },
})

function NotificationPage({ route, navigation, userInfo }) {
    const keyExtractor = (item, key) => key.toString();
    const renderItem = ({ item }) => (
        <Text>{item.val()}</Text>
    )
    console.log("NotificationPage")
    console.log(userInfo)
    console.log(userInfo[myId])
    //console.log(userInfo[myId]["friendRequests"])
    return (
        <View style={styles.container}>
            <Text>Notification Page</Text>
            <FriendRequestList
                userInfo={userInfo[myId]}
            />
            
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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