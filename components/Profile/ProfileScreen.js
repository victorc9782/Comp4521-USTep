import React, { useState, useEffect } from 'react';
import { ScrollView, View,Text, Button, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { db, storage } from '../../config/config';

var backgroundImage = require('../../assets/wallpaper.jpg');
var num_of_followers = '5215';
var num_of_views = '154420';
var loading = true ;
var user = false;

const windowHeight = Dimensions.get('window').height;

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer'];

const styles = StyleSheet.create({
    loading: {
        height: windowHeight,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    contentContainer: {
        paddingTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
      },
    jumbotron: {
        position: 'absolute',
        paddingTop: 0,
        width: '100%',
        height: 245,
    },
    icon: {
        marginTop: 200,
        width: 85, 
        height: 85, 
        borderRadius: 85 / 2,
    },
    title: {
        color: '#47525E',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    description: {
        color: '#8492A6',
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    audience: {
        color: '#8492A6',
        fontFamily: 'Roboto',
        fontSize: 12,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: 17.5,
    },
    image: {
        height: 150,
        width: '100%',
    },
    gallery: {
        width: '80%',
        paddingTop: 30,
    }

  }); 

function getUserData(_id) {
    let userData = [];

    db.ref('/users/' + _id).once('value',  snap => {
        //console.log(snap.val()['name']);
        userData.push(snap.val()['name']);
        userData.push(snap.val()['Description']);
    });

    return userData;
}

async function downloadImg (ref) {
    let imageLink = await ref.getDownloadURL();
    return imageLink.toString() 
} 


async function getAssetImage(_id) {
    const icon_ref = storage.ref('user/' + _id + '/icon/icon.jpg');
    const wallpaper_ref = storage.ref('user/' + _id + '/wallpaper/wallpaper.jpg');
    const promises = [];
    
    promises.push(downloadImg(wallpaper_ref));
    promises.push(downloadImg(icon_ref));

    return Promise.all(promises);
}

async function getGalleryImage(_id) {
    const gallery_ref = storage.ref('/user/' + _id + '/gallery');
    const promises = [];

    await gallery_ref.listAll().then(result=> {
        result.items.forEach( imageRef=> {
            promises.push(downloadImg(imageRef));
        });
    })

    return Promise.all(promises);
}

async function loadData(user_id) {
    const assetArray = []
    const galleryArray = [];

    console.log('Loading User Data...')

    let userData = getUserData(user_id);

    console.log(userData[0]);
    
    console.log('Loading Icon...')

    await getAssetImage(user_id).then( result => {
        result.forEach( link => {
            assetArray.push(link);
        })
    });

    console.log('Loading Gallery...')

    await getGalleryImage(user_id).then( result => {
        let counter = 0;

        result.forEach( link => {
            galleryArray.push({image: {uri: link}, id : counter});
            counter ++;
        })
    });

    console.log('-- Finished Loading -- ');

    return [true, assetArray, galleryArray, userData];
}


export const ProfileScreen = ({ route, navigation }) => {

    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Setting a timer'];

    var user_id = 3;

    //const user_id = [route.params?id];

    const [data, setData] = useState({
        loaded: false,
        wallpaper: '',
        icon: '',
        gallery: [],
        detail: '',
    });
    
    if(loading) {
        loadData(user_id).then( result => {
            loading = false;
            setData({
                loaded: result[0],
                wallpaper: result[1][0],
                icon: result[1][1],
                gallery: result[2],
                detail: result[3],
            })
        })
    }

    return (
        <ScrollView>
        {    !data['loaded']?
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#FF6600" />
                    <Text> LOADING . . . </Text>
                </View>
            :
                <View style={styles.contentContainer}>
                    <Image
                        style={styles.jumbotron}
                        source={{
                            uri: data['wallpaper']
                        }}
                    />
                    <Image 
                        style={styles.icon} 
                        source={{
                            uri: data['icon']
                        }}
                    />
                    <Text style={styles.title}> {data['detail'][0]} </Text>
                    <Text style={styles.description}> {data['detail'][1]} </Text>
                    <Text style={styles.audience}>{num_of_followers} followers | {num_of_views} views</Text>
                    {   
                        user?
                        <View style={styles.buttonContainer}>
                        <Button
                            title="UpLoad Image"
                            style={styles.button}
                            onPress={() => navigation.navigate('Chat')}
                        />
                        <Button
                            title="Chat with Friends"
                            style={styles.button}
                            onPress={() => navigation.navigate('Chat')}
                        />
                        </View>
                        :
                        <View style={styles.buttonContainer}>
                        <Button
                            title="Add Friend"
                            style={styles.button}
                            onPress={() => navigation.navigate('Chat')}
                        />
                        <Button
                            title="Send Message"
                            style={styles.button}
                            onPress={() => navigation.navigate('Chat')}
                        />
                        </View>
                    }   
                    <View style={styles.gallery}>
                        <FlatList
                            data = {data['gallery']}
                            keyExtractor={(item) => item.id}
                            numColumns={3}

                            renderItem={({item} ) => (
                            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                <Image
                                    style={styles.image}
                                    source={item.image}
                                />
                            </View>
                            )}
                        />
                    </View>
                </View>
        }
        </ScrollView>
        
    )};
