import React from "react";
import { Dimensions, View, TouchableOpacity, StyleSheet, Modal } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: 150,
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    }
})

export default function ModalPicker({changeModalVisibility}) {
    return (
        <TouchableOpacity activeOpacity={1} style={styles.contentContainer} onPress={() => changeModalVisibility(false)}>
            <View style={[styles.modal, { width: SCREEN_WIDTH - 80 }]}>
                
            </View>
        </TouchableOpacity>
    )
}