import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { translateDateOnEventDetails, translateTimeOnEvent } from '../EventBoard/helperFunctions';
import { database, auth, storage } from '../../../config/config';
import { updateUserInfo } from '../../../reducers/userInfo';
import FacePile from 'react-native-face-pile';
import { connect } from 'react-redux';


function EventDetails({ users, route, navigation }) {
    const { event, hostProfileURL } = route.params;

    const joinEvent = () => {
        database.ref('/events/' + event.uid + '/participants/' + auth.currentUser.uid).set(true);
    }

    return (
        <>
            <ScrollView style={{
                backgroundColor: 'white',
                height: '100%',
            }}>
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
                            <Text style={{ flex: 5, fontSize: Dimensions.get("window").fontScale * 18 }}>{event.location}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Dimensions.get("window").height * 0.035 }}>
                        <View style={{ flex: 2.3 }}>
                            <Image style={{
                                width: Dimensions.get("window").width * 0.12,
                                height: Dimensions.get("window").width * 0.12,
                                borderRadius: Dimensions.get("window").width * 0.12 / 2,
                                marginTop: Dimensions.get("window").width * 0.02
                            }} source={{ uri: hostProfileURL }} />
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={{
                                flex: 5,
                                fontSize: Dimensions.get("window").fontScale * 18,
                                textAlignVertical: "center"
                            }}>
                                Hosted by {users != null && users != undefined && users.length > 0 ? '' : users[event.host].name}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: Dimensions.get("window").height * 0.035 }}>
                        <Text style={{
                            fontSize: Dimensions.get("window").fontScale * 16,
                            fontWeight: "200",
                        }}>{event.description}</Text>
                    </View>
                </View>
            </ScrollView>
            {event.host != auth.currentUser.uid && <TouchableOpacity
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
                }}>Join</Text></TouchableOpacity>}
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