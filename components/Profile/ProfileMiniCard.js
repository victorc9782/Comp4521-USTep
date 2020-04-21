import React, { Component } from 'react';
import { View , StyleSheet, FlatList } from 'react-native';
import { Card, Button, Text, Avatar } from 'react-native-elements';

import ProfileScreen from './ProfileScreen';

const styles = StyleSheet.create({
  cardContainer: {
      backgroundColor: 'white',
      alignItems: 'center',
    },    
    title: {
      color: '#47525E',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
  },
  description: {
      paddingTop: 7, 
      color: '#8492A6',
      fontFamily: 'Roboto',
      fontSize: 12,
  },buttonGroup: {
    flexDirection: 'row'
  }
});  

export default class ProfileMiniCard extends Component {

    render() {
        return (
          <Card>
            <View style={styles.cardContainer}>
            <Avatar
              source={this.props.icon}
              rounded
              size='large'
            />
            <Text style={styles.title}>
              {this.props.name}
            </Text>
            <Text style={styles.description}>
              {this.props.description}
            </Text>
            <View style={styles.buttonGroup}>
            <Button
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='+ Friend' 
              type="clear"
              />

            <Button
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Profile' 
              type="clear"
              onPress={this.props.onClickProfile}/>
            </View>
            </View>
          </Card>
        );
      }   
}