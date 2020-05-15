import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native'; 
import { SocialIcon } from 'react-native-elements'

export default class SoicalMediaLoginPanel extends Component {
    render() {
      return (
        <View>
            <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            />

            <SocialIcon
            title='Sign In With Twitter'
            button
            type='twitter'
            />

            <SocialIcon
            button
            title='Sign In with Google'
            type='google'
            />
        </View>
      );
    }   
  } 
  