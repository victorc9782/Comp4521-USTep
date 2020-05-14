import React, { useState, useEffect } from 'react';
import { ScrollView, View,Text, Button, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { db, storage } from '../../config/config';
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
        paddingTop: 220,
        height: 150,
        width: 350,
        resizeMode: 'contain'
    }, socialMedia: {
        paddingTop: 50,
        width: '80%',
    }

}); 

export const LoginScreen = ({ route, navigation }) => {

    return(
        <View style={styles.content}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
                />
            <View style={styles.panel}>
                <LoginPanel navigation={navigation}/>
            </View>
            <View style={styles.socialMedia}>
                <SoicalMediaLoginPanel />
            </View>
        </View>
    );
};
