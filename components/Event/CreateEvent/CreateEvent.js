import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Platform, Button, Image, ToastAndroid, ToolbarAndroid } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { translateDateOnCreateEvent, translateTimeOnEvent } from '../EventBoard/helperFunctions';
import { database, auth, storage } from '../../../config/config';


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
/*     const [imageURL, setImageURL] = useState(null); */
    const [image, setImage] = useState(require('../../../assets/wallpaper12.jpg'))

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

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset("Event created!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0, Dimensions.get("window").height * 0.3)
    }

    const postEvent = async () => {
        const uid = new Date().toJSON().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        const imageURL = await uploadImage();
        database.ref('/events/' + uid).set({
            startDateTime: startDateTime.toJSON(),
            endDateTime: endDateTime.toJSON(),
            eventName: eventName,
            location: location,
            host: auth.currentUser.uid,
            description: description,
            uid: uid,
            image_url: imageURL,
        })
        navigation.navigate('Event Board')
        showToastWithGravityAndOffset()
    }


    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            })
            if (!result.cancelled) {
                setImage({ uri: result.uri });
            }
        } catch (error) {
            console.log(error);
        };
    }

    const uploadImage = async () => {
        const retrievedImage = await fetch(image['uri'])
            .then(response => response.blob())
            .then(blob => {
                console.log(blob.type);
                return blob;
            });
        const uploadedImageURL = storage.ref('/event/gallery/'
            + new Date().toLocaleString()).put(retrievedImage)
            .then(snapshot => snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    return downloadURL;
                }));

        return uploadedImageURL;
    }

    return (
        <>
            <ScrollView style={{
                elevation: 4,
                marginVertical: Dimensions.get('window').height * 0.015,
                marginHorizontal: Dimensions.get('window').width * 0.03,
                paddingHorizontal: Dimensions.get('window').height * 0.02,
                borderRadius: Dimensions.get('window').scale * 2,
                backgroundColor: 'white',
            }}
                contentContainerStyle={{ paddingVertical: Dimensions.get('window').height * 0.02, }}
            >

                <TouchableOpacity style={{ marginVertical: Dimensions.get("window").height * 0.02, }} onPress={() => { pickImage() }}>
                    <Image source={image} style={{ width: '100%', height: Dimensions.get('window').height * 0.3, opacity: 0.85 }} resizeMode='cover' />
                </TouchableOpacity>

                <Input
                    placeholder='Event Name'
                    onChangeText={value => setEventName(value)}
                />
                <View style={{ marginTop: Dimensions.get("window").height * 0.02, paddingHorizontal: Dimensions.get('window').height * 0.01 }}>
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
                    multiline={true}
                    style={{ marginTop: Dimensions.get("window").height * 0.2 }}
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