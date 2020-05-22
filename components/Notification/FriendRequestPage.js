import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'

function FriendRequestPage({ route, navigation}) {
    return (
        <View >
            <Text>FriendRequestPage</Text>
            
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}
export default FriendRequestPage;