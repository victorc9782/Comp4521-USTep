import React from 'react'
import { ScrollView, View,Text, Button, Image, StyleSheet, FlatList } from 'react-native'
import { SearchBar, Avatar} from 'react-native-elements';
import SearchBarView from './SearchBar'

var icon = require('../../assets/tap.png');

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
      },
    avatarcontainer: {
        paddingTop: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: 30,
        color: '#47525E',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    }
  });  

export const MatchPage = ({ route, navigation }) => {
    
    return (
        <View style={styles.contentContainer}>
        <SearchBarView onSearch={()=>{navigation.navigate('FindingResult')}}/>
        <View style={styles.avatarcontainer}>
            <Avatar
                containerStyle={styles.avatar}
                size="xlarge"
                rounded
                onPress={() => navigation.navigate('FindingResult')}
                source={icon}
            />
            <Text style={styles.title}> Meet New Friends! </Text>
        </View>
        </View>
    );
}