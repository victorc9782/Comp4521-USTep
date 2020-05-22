import React from 'react';
import { View, Text } from 'react-native';

export const EventDetails = ({ route, navigation }) => {
    const { event } = route.params;
    return (<>
        <View><Text>{event.eventName}</Text></View>
        <View><Text>{event.location}</Text></View>
        <View>
            <Text>{event.startDateTime}</Text>
            <Text>{event.endDateTime}</Text>
        </View>
        <View><Text>{event.description}</Text></View>
    </>)

}