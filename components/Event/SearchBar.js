import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Dimensions, Animated, View, Text, Modal } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import ModalPicker from './ModalPicker'

const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        backgroundColor: '#597fab',
        zIndex: 2,
    },
    filterContainer: {
        paddingLeft: 10,
        height: 40,
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 15,
        color: 'white'
    }
})

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }

    changeModalVisibility = (bool) => {
        this.setState({ isModalVisible: bool });
    }

    render() {
        return (<Animated.View>
            <View style={styles.container}>
                <Animated.View>
                    <View style={styles.filterContainer}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.changeModalVisibility(true)}>
                            <MaterialIcons
                                name='expand-more'
                                size={30}
                                color='#ffff00'
                                style={{ color: 'white' }}
                            />
                            <Text style={styles.buttonText}>Test</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Modal transparent={true} animationType='fade' visible={this.state.isModalVisible} onRequestClose={() => this.changeModalVisibility(false)}>
                    <ModalPicker changeModalVisibility={this.changeModalVisibility} />
                </Modal>
            </View>
        </Animated.View>);
    }
}

export default SearchBar;