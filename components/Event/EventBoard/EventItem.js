import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { translateDateOnEventBoard } from './helperFunctions';
import { storage } from '../../../config/config';


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

const EventItem = ({ navigation, event }) => {

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
        <TouchableOpacity onPress={() => { navigation.navigate('Event Details', { event: event, hostProfileURL }) }}>
            <View style={styles.container}>
                <View style={styles.container_text}>
                    <Text style={styles.title}>{event.eventName}</Text>
                    <Text style={styles.description}>{event.description}</Text>
                    <View style={[styles.wrapper]}>
                        <Text style={styles.info}>{translateDateOnEventBoard(event.startDateTime)} • </Text>
                        <Text style={styles.info}>{event.location}</Text>
                    </View>
                    {<View style={styles.wrapper}>
                        <Image style={styles.avatar} source={{ uri: hostProfileURL }} />
                    </View>}
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default EventItem;