import React from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import { database } from '../../config/config';
import { createStackNavigator } from "@react-navigation/stack"

import NotificationPage from './NotificationPage'
const Stack = createStackNavigator();

const  myId="Mr2kGP1Qa8XE6BvgpEtZMpuEWvs2";
export const NotificationScreen= () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notification" component={NotificationPage} />
        </Stack.Navigator>
    )
}