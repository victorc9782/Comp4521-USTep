/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import React, { useState, useEffect } from 'react';
import { ScrollView, View,Text, Button, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { database, storage } from '../../config/config';
import LoginPanel from './LoginPanel';
import SoicalMediaLoginPanel from './SocialMediaLoginPanel'


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer'];

const styles = StyleSheet.create({
    content: {
        height: windowHeight,
        alignItems: 'center',
        backgroundColor: 'white' 
    }, panel: {
        width: '80%',
    }, logo: {
        paddingTop: 230,
        height: 130,
        width: 130,
        resizeMode: 'contain'
    }, socialMedia: {
        paddingTop: 20,
        width: '80%',
    }, 
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }

}); 

export const LoginScreen = ({ route, navigation }) => {
    return(
        <View style={styles.content}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
                />
            <Text style={styles.title}> Sign In </Text>
            <View style={styles.panel}>
                <LoginPanel navigation={navigation} updateLogin={route.params?.login} signOut={route.params?.signOut}/>
            </View>
        </View>
    );
};
