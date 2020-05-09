import React, { useState } from 'react';
import { ScrollView, View,Text, Button, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { db, storage } from '../../config/config';

var backgroundImage = require('../../assets/wallpaper.jpg');
var num_of_followers = '5215';
var num_of_views = '154420';

const windowHeight = Dimensions.get('window').height;

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


export const ProfileScreen = ({ route, navigation }) => {

    const [icon, setIcon] = useState('');
    const [fetch, setFetch] = useState(false);

    var user_id = 3;
    var icon_ref = storage.ref('user/' + user_id + '/icon/icon.jpg');
    var gallery_ref = storage.ref('user/' + user_id + '/gallery/');

    icon_ref.getDownloadURL().then( url => {
        setIcon(url.toString());
        setFetch(true);
    })

    gallery_ref.listAll().then( result => {
        console.log(result.getDownloadURL().toString());
        result.listAll().then ( gallery => {
            console.log(gallery.getDownloadURL().toString());
        })
    })

    return (
        <ScrollView>
        {   fetch == false?
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            :
                <View style={styles.contentContainer}>
                    <Image
                        style={styles.jumbotron}
                        source={backgroundImage}
                    />
                    <Image 
                        style={styles.icon} 
                        source={{
                            uri: icon
                        }}
                    />
                    <Text style={styles.title}> {route.params?.name} </Text>
                    <Text style={styles.description}> {route.params?.description} </Text>
                    <Text style={styles.audience}>{num_of_followers} followers | {num_of_views} views</Text>
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
                    <View style={styles.gallery}>
                        <FlatList
                            data = {[
                                {image: require('../../assets/gallery1.jpg'), id: '1'},
                                {image: require('../../assets/gallery2.jpg'), id: '2'},
                                {image: require('../../assets/gallery3.jpg'), id: '3'},
                                {image: require('../../assets/gallery4.jpg'), id: '4'},
                                {image: require('../../assets/gallery5.jpg'), id: '5'},
                                {image: require('../../assets/gallery6.jpg'), id: '6'},
                                {image: require('../../assets/gallery7.jpg'), id: '7'},
                                {image: require('../../assets/gallery8.jpg'), id: '8'},
                                {image: require('../../assets/gallery9.jpg'), id: '9'},
                            ]}
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
    );
}