import React, { useState, useEffect } from 'react';
import { ScrollView, View,Text, Button, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { database, storage, auth } from '../../config/config';

var num_of_views = '154420';
var loading = true ;
var user = false;

const THIS_USER_ID = 3;

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
    },
    description: {
        color: '#8492A6',
        fontSize: 16,
    },
    audience: {
        color: '#8492A6',
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

    database.ref('/users/' + _id).once('value',  snap => {
        //console.log(snap.val()['name']);
        userData.push(snap.val()['name']);
        userData.push(snap.val()['description']);
        userData.push(snap.val()['department'])
    });

    return userData;
}

async function downloadImg (ref) {
    let imageLink = await ref.getDownloadURL();
    return imageLink.toString() 
} 

async function getWallpaperImage(_id) {
    const wallpaper_ref = storage.ref('user/' + _id + '/wallpaper/wallpaper.jpg');
    const promises = [];

    promises.push(downloadImg(wallpaper_ref));
    
    return Promise.all(promises);
}


async function getIconImage(_id) {
    const icon_ref = storage.ref('user/' + _id + '/icon/icon.jpg');
    const promises = [];

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
    const galleryArray = [];
    let wallpaper_image = 'https://www.logomyway.com/logos_new/8189/hkust_cse_department_20120531_02_747208955000.png';
    let icon_image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcReoRR0DLnFfhOnpHrH-QYXTJ8vFmjPKXrndXOc1q_tacP9Zx8X&usqp=CAU';

    let userData = getUserData(user_id);

    await getWallpaperImage(user_id).then( result => {
        wallpaper_image =  result[0];
    }).catch ( err => {
        console.log(err)
    });

    await getIconImage(user_id).then( result => {
        icon_image = result[0];
    }).catch ( err => {
        console.log(err)
    });

    await getGalleryImage(user_id).then( result => {
        let counter = 0;

        result.forEach( link => {
            galleryArray.push({image: {uri: link}, id : counter});
            counter ++;
        })
    });

    console.log('-- Finished Loading -- ');

    return [true, wallpaper_image, icon_image, galleryArray, userData];
}


export const ProfileScreen = ({ route, navigation }) => {

    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Setting a timer'];

    const [data, setData] = useState({
        loaded: false,
        wallpaper: '',
        icon: '',
        gallery: [],
        detail: '',
    });

   let user_id = '';
      
    if(route.params?.id != null || route.params?.id != undefined) {
        console.log([route.params?.id])
        user_id = [route.params?.id]
    } else if(auth.currentUser.uid) {
        user_id = auth.currentUser.uid.toString();
        user = true;
    } else {
        user_id = THIS_USER_ID;
    }

    
    if(loading) {
        loadData(user_id).then( result => {
            loading = false;
            setData({
                loaded: result[0],
                wallpaper: result[1],
                icon: result[2],
                gallery: result[3],
                detail: result[4],
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
                    <Text style={styles.audience}>{data['detail'][2]}  | {num_of_views} views</Text>
                    {   
                        user?
                        <View style={styles.buttonContainer}>
                        <Button
                            title="Update Profile"
                            style={styles.button}
                            onPress={() => navigation.navigate('UpdateInfo')}
                        />
                        <Button
                            title="EDIT GALLERY"
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
