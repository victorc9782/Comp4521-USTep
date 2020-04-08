import React from 'react'
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import Calendar from 'dayjs/plugin/calendar';
import dayjs from 'dayjs';

const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: WINDOW_WIDTH * 0.02,
        marginLeft: WINDOW_WIDTH * 0.01,
    },
    avatar: {
        width: WINDOW_WIDTH * 0.12,
        height: WINDOW_WIDTH * 0.12,
        borderRadius: WINDOW_WIDTH * 0.12 / 2,
        marginTop: WINDOW_WIDTH * 0.02
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: WINDOW_WIDTH * 0.02
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
        marginBottom: WINDOW_WIDTH * 0.02
    },
    info: {
        fontSize: 11,
        color: '#EC4C9D',
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: WINDOW_WIDTH * 0.02
    }
});

const EventItem = ({ title, description, date, location, image_url }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.container_text}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={[styles.wrapper]}>
                        <Text style={styles.info}>{dateTranslate(date)} • </Text>
                        <Text style={styles.info}>{location}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Image style={styles.avatar} source={{ uri: image_url }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


function dateTranslate(date) {
    var datetime = dayjs(date);
    dayjs.extend(Calendar);
    var calendartime = datetime.calendar(dayjs(), {
        sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
        nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
        nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
        lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
        lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
        sameElse: 'ddd, D MMM [at] h:mm A' // Everything else ( Sun, Mar 12 at 2:30 AM )
    });
    return (calendartime);
}
export default EventItem;