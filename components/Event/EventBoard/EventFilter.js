import React, { Component } from "react";
import { View, Animated, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        backgroundColor: 'blue',
    },
    stickyItem: {
        position: 'absolute',
        zIndex: 1,
        left: 10,
        paddingRight: 8,
        backgroundColor: 'blue',
    },
    stickyItemMask: {
        marginLeft: -8,
        borderRadius: 8,
        overflow: "hidden"
    }
})

class EventFilter extends Component {
    render() {
        return (
            <View>
                <View style={styles.stickyItem}>
                    <Animated.View style={styles.stickyItemMask}>
                        <Button title="test"/>
                    </Animated.View>
                </View>
            </View>)
    }
}

export default EventFilter;