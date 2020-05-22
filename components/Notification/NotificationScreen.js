import React from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"

import NotificationPage from './NotificationPage'
import FriendRequestPage from './FriendRequestPage'
const Stack = createStackNavigator();

const  myId="Mr2kGP1Qa8XE6BvgpEtZMpuEWvs2";
export const NotificationScreen= () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notification" component={NotificationPage} />
            <Stack.Screen name="FriendRequest" component={FriendRequestPage} />
        </Stack.Navigator>
    )
}