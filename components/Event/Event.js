/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import EventBoard from "./EventBoard/EventBoard";
import { CreateEvent } from "./CreateEvent/CreateEvent";
import EventDetails from "./EventDetails/EventDetails";

const Stack = createStackNavigator();

export const Event = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Event Board" component={EventBoard} />
            <Stack.Screen name="Create Event" component={CreateEvent} />
            <Stack.Screen name="Event Details" component={EventDetails} />
        </Stack.Navigator>
    )
}