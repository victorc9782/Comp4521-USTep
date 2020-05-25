import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { translateDateOnEventBoard } from './helperFunctions';
import { storage, auth } from '../../../config/config';
import { updateUserInfo } from '../../../reducers/userInfo';
import { connect } from 'react-redux';


const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: WINDOW_WIDTH * 0.02,
        marginLeft: WINDOW_WIDTH * 0.01,
    },
    avatar: {
        width: WINDOW_WIDTH * 0.12,
        height: WINDOW_WIDTH * 0.12,
        borderRadius: WINDOW_WIDTH * 0.12 / 2,
        marginTop: WINDOW_WIDTH * 0.02
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: WINDOW_WIDTH * 0.02
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
        marginBottom: WINDOW_WIDTH * 0.02
    },
    info: {
        fontSize: 11,
        color: '#EC4C9D',
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: WINDOW_WIDTH * 0.02
    }
});

const EventItem = ({ users, navigation, event }) => {

    const [hostProfileURL, setHostProfileURL] = useState(null);

    useEffect(() => {
        storage.ref('user/' + event.host + '/icon/icon.jpg').getDownloadURL().then(
            data => {
                setHostProfileURL(data)
            }
        ).catch(
            error => console.log(error)
        )
    }, [])

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Event Details', { event, hostProfileURL }) }}>
            <View style={styles.container}>
                <View style={styles.container_text}>
                    <Text style={styles.title}>{event.eventName}</Text>
                    <Text style={styles.description}>{event.description}</Text>
                    <View style={[styles.wrapper]}>
                        <Text style={styles.info}>{translateDateOnEventBoard(event.startDateTime)} • </Text>
                        <Text style={styles.info}>{event.location}</Text>
                    </View>
                    {<View style={styles.wrapper}>
                        <Image style={styles.avatar} source={{ uri: (users != undefined && users.length > 0) ? '' : users[event.host].avatar_url }} />
                    </View>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const mapState = state => ({
    users: state.userInfo,
})

const mapDispatch = dispatch => {
    dispatch(updateUserInfo());
    return {};
}

export default connect(mapState, mapDispatch)(EventItem);