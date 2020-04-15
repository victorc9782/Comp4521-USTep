import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native';
import EventItem from './EventItem';
import EventFilter from './EventFilter';
import firebase from 'firebase';
import { db } from '../../config/config';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white'
    },
})


export function EventScreen({ route, navigation }) {
    let events = []
    db.ref('/events').on('value', snap => {
        console.log(snap);
        snap.forEach(
            child => {
                events.push(child.val());
            }
        )
    });


    const keyExtractor = (item, key) => key.toString();

    const renderItem = ({ item }) =>
        <EventItem
            title={item.title}
            description={item.description}
            date={item.date}
            image_url={item.image_url}
            location={item.location} />
    return (
        <SafeAreaView style={styles.container}>
            {/* <EventFilter/> */}
            <FlatList
                data={events}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
            />
        </SafeAreaView>
    );
}

const renderSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                backgroundColor: "#CED0CE",
            }}
        />
    );
};

function randomDate(start, days) {
    return new Date(start.getTime() + (Math.random() * days * 24 * 60 * 60 * 1000));
}