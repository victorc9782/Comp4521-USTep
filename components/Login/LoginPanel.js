import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';   
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input, Card, Button} from 'react-native-elements';

import { auth } from '../../config/config';

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.state={
      email: null,
      password: null,
      loading: false,
      error: '',
    }
  }

  createUser(email, password, navigation) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('UpdateInfo', {uid : auth.currentUser.uid})
      })
      .catch(err => {
        this.setState({ error : err.code })
        this.setState({loading:false})
      });
  }

  signIn(email, password, navigation) {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign-In Success');
        //updateUser(auth.currentUser);
        console.log(auth.currentUser.uid)
        this.props.updateLogin(true);
        navigation.navigate('Profile', {uid : auth.currentUser.uid});
      })
      .catch( err => {
        this.setState({ error : err.code })
      }
    )
  }

  render() {

    if(this.props.signOut == true) {
      this.props.updateLogin(false);
    }

    return (
      <View>
        <Input
          placeholder="Email"
          onChangeText={value => this.setState({ email: value })}
        />

        <Input 
          placeholder="Password" 
          onChangeText={value => this.setState({ password: value })}
          secureTextEntry={true} 
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.error}
        />

        <View style={styles.buttonGroup}>
          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Login'
            type='clear'
            onPress = {() => {
              if(this.state.email == null || this.state.password == null) {
                this.setState({ error : 'Email / Password cannot be empty'})
              } else {
                this.signIn(this.state.email, this.state.password, this.props.navigation)}
            }
            }
            />

          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Register'
            type='clear'
            loading={this.state.loading}
            onPress = {() => {
              //this.props.navigation.navigate('UpdateInfo', {uid : 'RiIvCRJ0fghZwZGgd4SWHxfEqjo2'});
              if(this.state.email == null || this.state.password == null) {
                this.setState({ error : 'Email / Password cannot be empty'})
              } else {
                this.setState({loading : true})
                this.createUser(this.state.email, this.state.password, this.props.navigation);
              }
            }
              }
            />
        </View>
      </View>
    );
  }   
} 
