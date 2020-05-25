import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import EventItem from './EventItem';
import EventFilter from './EventFilter';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { watchEventsChanged, getEvents } from '../../../reducers/events'
import { database } from '../../../config/config';
import { connect } from 'react-redux';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white'
    },
})


function EventBoard({ route, navigation, events }) {
    const keyExtractor = (item, key) => key.toString();
    const renderItem = ({ item }) =>
        <EventItem
            event={item}
            navigation={navigation} />
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
            />
            <TouchableOpacity style={
                {
                    backgroundColor: "#f2359e",
                    position: "absolute",
                    elevation: 3,
                    width: Dimensions.get("window").width * 0.13,
                    height: Dimensions.get("window").width * 0.13,
                    borderRadius: 50,
                    bottom: Dimensions.get("window").height * 0.05,
                    right: Dimensions.get("window").width * 0.05,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => navigation.navigate("Create Event")}
                >
                <MaterialIcon name='playlist-add' size={30} color={"white"}/>
            </TouchableOpacity>
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

const mapState = state => ({
    events: state.events,
})

const mapDispatch = dispatch => {
    dispatch(watchEventsChanged());
    return {};
}

export default connect(mapState, mapDispatch)(EventBoard);