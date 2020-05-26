/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { translateDateOnEventDetails, translateTimeOnEvent } from '../helperFunctions';
import { database, auth } from '../../../config/config';
import { updateUserInfo } from '../../../reducers/userInfo';
import { connect } from 'react-redux';
import ParticipantPile from './ParticipantPile';


function EventDetails({ users, route, navigation }) {
    const { event, hostProfileURL } = route.params;

    const [joinedThisEvent, setJoinedThisEvent] = useState(false);
    const joinEvent = () => {
        database.ref('/events/' + event.uid + '/participants/' + auth.currentUser.uid).set(true);
        Alert.alert("Join Event",
            "You have successfully joined the event: " + event.eventName,
            [
                { text: "I will arrive on time", onPress: () => console.log("OK Pressed") }
            ]
        )
        navigation.navigate("Event Board")
    }
    const leaveEvent = () => {
        database.ref('/events/' + event.uid + '/participants/' + auth.currentUser.uid).remove();
        Alert.alert("Leave Event",
            "You have left the event: " + event.eventName,

            [
                { text: "I will join next time", onPress: () => console.log("OK Pressed") }
            ]
        )
        navigation.navigate("Event Board")
    }
    if (event.participants && !joinedThisEvent) {
        participant_uids = Object.keys(event.participants);
        for (let i = 0; i < participant_uids.length; i++) {
            if (auth.currentUser.uid == participant_uids[i]) {
                setJoinedThisEvent(true)
                break;
            }
        }
    }
    return (
        <>
            <ScrollView style={{
                backgroundColor: 'white',
                height: '100%',
            }}
                contentContainerStyle={{ paddingBottom: Dimensions.get('window').height * 0.1, }}
            >
                <Image source={{ uri: event.image_url }} style={{ width: '100%', height: Dimensions.get('window').height * 0.3, opacity: 0.85 }} />
                <View style={{ paddingHorizontal: Dimensions.get("window").width * 0.05 }}>
                    <View style={{ marginTop: Dimensions.get("window").height * 0.035 }}>
                        <Text style={{
                            fontSize: Dimensions.get("window").fontScale * 26,
                            fontWeight: "700",
                        }}>{event.eventName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: Dimensions.get("window").height * 0.035 }}>
                        <View style={{ flex: 2.3 }}>
                            <View style={{ flex: 5, paddingLeft: Dimensions.get("window").width * 0.01 }}>
                                <AntDesignIcon name='clockcircleo' size={30} />
                            </View>
                            <View style={{ flex: 5 }}>
                            </View>
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={{ flex: 5, fontSize: Dimensions.get("window").fontScale * 18 }}>{translateDateOnEventDetails(event.startDateTime)}</Text>
                            <Text style={{ flex: 5, fontSize: Dimensions.get("window").fontScale * 18 }}>{translateTimeOnEvent(event.startDateTime)} - {translateTimeOnEvent(event.endDateTime)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Dimensions.get("window").height * 0.035 }}>
                        <View style={{ flex: 2.3 }}>
                            <MaterialIcon name='location-on' size={38} />
                        </View>
                        <View style={{ flex: 10 }}>
                            {event.live_url == null ? <Text style={{ flex: 5, fontSize: Dimensions.get("window").fontScale * 18 }}>{event.location}</Text>
                                : <Text style={{ flex: 5, fontSize: Dimensions.get("window").fontScale * 18, color: '#5aa6ed', textDecorationLine: 'underline' }}
                                    onPress={() => Linking.openURL(event.live_url)}
                                >{event.live_url}</Text>}
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: Dimensions.get("window").height * 0.035,
                        paddingBottom: Dimensions.get("window").height * 0.04,
                        borderBottomColor: 'grey',
                        borderBottomWidth: Dimensions.get("window").height * 0.001
                    }}>
                        <View style={{ flex: 3 }}>
                            <Image style={{
                                width: Dimensions.get("window").width * 0.17,
                                height: Dimensions.get("window").width * 0.17,
                                borderRadius: Dimensions.get("window").width * 0.17 / 2,
                                marginTop: Dimensions.get("window").width * 0.02
                            }} source={{ uri: hostProfileURL }} />
                        </View>
                        <View style={{ flex: 10 }} >
                            <Text style={{
                                flex: 5,
                                fontSize: Dimensions.get("window").fontScale * 18,
                                textAlignVertical: "center"
                            }}>
                                Hosted by {(users != null && users != undefined && users.length > 0) ? '' : users[event.host].name}</Text>
                        </View>
                    </View>
                    <ParticipantPile participants={event.participants} />
                    <View style={{ marginTop: Dimensions.get("window").height * 0.035 }}>
                        <Text style={{
                            fontSize: Dimensions.get("window").fontScale * 18,
                            fontWeight: "700",
                        }}>Details:</Text>
                        <Text style={{
                            fontSize: Dimensions.get("window").fontScale * 16,
                            fontWeight: "200",
                            paddingLeft: Dimensions.get("window").width * 0.05,
                        }}>{event.description}</Text>
                    </View>
                </View>
            </ScrollView>
            {event.host != auth.currentUser.uid && !joinedThisEvent && <TouchableOpacity
                style={{
                    position: "absolute",
                    elevation: 4,
                    shadowOpacity: 1,
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#2a8eeb',
                    height: Dimensions.get("window").height * 0.07,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => joinEvent()}
            ><Text
                style={{
                    color: 'white',
                    fontSize: Dimensions.get("window").fontScale * 18,
                    fontWeight: '500',
                }}>Join</Text></TouchableOpacity>
            }
            {event.host != auth.currentUser.uid && joinedThisEvent && <TouchableOpacity
                style={{
                    position: "absolute",
                    elevation: 4,
                    shadowOpacity: 1,
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'grey',
                    height: Dimensions.get("window").height * 0.07,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => leaveEvent()}
            ><Text
                style={{
                    color: 'white',
                    fontSize: Dimensions.get("window").fontScale * 18,
                    fontWeight: '500',
                }}>Leave</Text></TouchableOpacity>
            }
        </>)

}
const mapState = state => ({
    users: state.userInfo,
})

const mapDispatch = dispatch => {
    dispatch(updateUserInfo());
    return {};
}

export default connect(mapState, mapDispatch)(EventDetails);