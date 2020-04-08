import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventItem from './EventItem';
import EventFilter from './EventFilter';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white'
    },
})


export function EventScreen({ route, navigation }) {

    const location_list = ["Velen", "Crow's Perch", "Lindenvale", "Crow's Perch", "Blackbough", "Novigrad", "Kaer Morhen", "White Orchard"]
    const event_list = [{
        title: "The Nilfgaardian Connection",
        description: "Ask about the agent called Hendrik at the Inn at the Crossroads."
    },
    {
        title: "Bloody Baron",
        description: "Go to the baron's castle."
    },
    {
        title: "The King of the Wolves",
        description: "Kill the werewolf."
    },
    {
        title: "Family Matters",
        description: "Tell the baron what you've learned about Anna"
    },
    {
        title: "Pyres of Novigrad",
        description: "Look for thieves on the main square and carefully follow them."
    },
    {
        title: "Get Junior",
        description: "After learning that Dandelion was on the run from Whoreson Junior, and that the crime boss may know of the bard's whereabouts, he set out to find him."
    },
    {
        title: "The Battle of Kaer Morhen",
        description: "Geralt and Ciri had no choice but to teleport away from the Isle of Mists when the Wild Hunt threatened to attack."
    },
    {
        title: "Something Ends, Something Begins",
        description: "It ends in Temeria as well, with winter in full force, a blanket of snow wrapping the earth tight, and the witcher and his ward heading out to hunt rabbits."
    }];

    const list = []

    for (let index = 0; index < 8; index++) {
        list.push({
            date: randomDate(new Date(), 14),
            image_url: `https://randomuser.me/api/portraits/men/7${index}.jpg`,
            location: location_list[index],
            title: event_list[index].title,
            description: event_list[index].description,
        });
    }

    const keyExtractor = (item, index) => index.toString()

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
                data={list}
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