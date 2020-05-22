import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Platform, Button } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translateDateOnCreateEvent, translateTimeOnEvent } from '../EventBoard/helperFunctions';
import { database, auth } from '../../../config/config';

export const CreateEvent = ({ route, navigation }) => {

    const currentDateTime = new Date();
    const oneHourLater = new Date();
    oneHourLater.setHours(currentDateTime.getHours() + 1);
    const [eventName, setEventName] = useState(null);
    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState(null);
    const [startDateTime, setStartDateTime] = useState(currentDateTime);
    const [endDateTime, setEndDateTime] = useState(oneHourLater);
    const [target, setTarget] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }
    const showDatepicker = (mode) => (target) => {
        setTarget(target);
        showMode(mode);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        switch (target) {
            case 'startDateTime':
                setStartDateTime(currentDate);
                break;
            case 'endDateTime':
                setEndDateTime(currentDate);
                break;
            default:
                break;
        }
    }

    const postEvent = () => {
        const uid = new Date().toJSON().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        database.ref('/events/' + uid).set({
            startDateTime: startDateTime.toJSON(),
            endDateTime: endDateTime.toJSON(),
            eventName: eventName,
            location: location,
            host: auth.currentUser.uid,
            description: description,
            uid: uid,
        })
    }

    return (
        <>
            <ScrollView style={{
                elevation: 4,
                marginVertical: Dimensions.get('window').height * 0.03,
                marginHorizontal: Dimensions.get('window').width * 0.03,
                paddingVertical: Dimensions.get('window').height * 0.02,
                paddingHorizontal: Dimensions.get('window').height * 0.02,
                borderRadius: Dimensions.get('window').scale * 2,
                backgroundColor: 'white',
            }}>
                <Input placeholder='Event Name'
                    onChangeText={value => setEventName(value)}
                />
                <View style={{ paddingHorizontal: Dimensions.get('window').height * 0.01 }}>
                    <View style={{ width: '100%', flexDirection: "row", height: Dimensions.get('window').height * 0.07 }}>
                        <View style={{ flex: 1.5, justifyContent: "center" }}>
                            <MaterialIcon name='access-time' size={Dimensions.get("window").scale * 10} />
                        </View>
                        <View style={{ flex: 6, borderBottomColor: 'grey', borderBottomWidth: 1, justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => showDatepicker('date')('startDateTime')}>
                                <Text style={{ color: 'grey', fontSize: Dimensions.get("window").fontScale * 18 }}>{translateDateOnCreateEvent(startDateTime)}</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={{ flex: 4, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: Dimensions.get("window").width * 0.035, justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => showDatepicker('time')('startDateTime')}>
                                <Text style={{ color: 'grey', fontSize: Dimensions.get("window").fontScale * 18 }}>{translateTimeOnEvent(startDateTime)}</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: "row", height: Dimensions.get('window').height * 0.07 }}>
                        <View style={{ flex: 1.5, justifyContent: "center" }}>

                        </View>
                        <View style={{ flex: 6, borderBottomColor: 'grey', borderBottomWidth: 1, justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => showDatepicker('date')('endDateTime')}>
                                <Text style={{ color: 'grey', fontSize: Dimensions.get("window").fontScale * 18 }}>{translateDateOnCreateEvent(endDateTime)}</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={{ flex: 4, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: Dimensions.get("window").width * 0.035, justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => showDatepicker('time')('endDateTime')}>
                                <Text style={{ color: 'grey', fontSize: Dimensions.get("window").fontScale * 18 }}>{translateTimeOnEvent(endDateTime)}</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>
                <Input placeholder='Location'
                    onChangeText={value => setLocation(value)} />
                <Input placeholder='Details'
                    onChangeText={value => setDescription(value)} />
                <View style={{ paddingHorizontal: Dimensions.get('window').height * 0.01 }}>
                    <TouchableOpacity style={{
                        marginTop: Dimensions.get("window").height * 0.02,
                        backgroundColor: '#46ace3',
                        borderRadius: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: 4,
                        height: Dimensions.get("window").height * 0.06
                    }}
                        onPress={() => postEvent()}
                    >
                        <Text style={{
                            fontWeight: "500",
                            color: 'white',
                            fontSize: Dimensions.get("window").fontScale * 18
                        }}>Create Event</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={eval(target)}
                    mode={mode}
                    onChange={onChange}
                />
            )}
        </>
    )
}