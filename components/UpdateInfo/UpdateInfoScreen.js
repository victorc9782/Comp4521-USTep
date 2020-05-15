import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet , Dimensions, ImageBackground, Text} from 'react-native'
import { database, storage } from '../../config/config';

import UpdateInfoCard  from './UpdateInfoCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer'];

const styles = StyleSheet.create({
    content: {
        height: windowHeight * 2,
        alignItems: 'center',
        backgroundColor: 'white' 
    }, 
    wallpaper: {
        width: windowWidth,
        height: 200,
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }, 
    title : {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    card : {
        width: windowWidth,
}
}); 

export const UpdateInfoScreen = ({ route, navigation }) => {

    return(
        <ScrollView>
            <View style={styles.content}>
                <View style={styles.wallpaper}>
                    <ImageBackground source={require('../../assets/info.jpg')} style={styles.backgroundImage}>
                        <Text style={styles.title}> Enjoy Your USTep Life ! </Text>
                    </ImageBackground>
                </View>
                <View style={styles.card}>
                   <UpdateInfoCard uid={route.params?.uid} navigation={navigation}/>
                </View>
            </View>
        </ScrollView>
    );
};
