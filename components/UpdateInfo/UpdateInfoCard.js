import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native'; 
import { SocialIcon, Card, Button, Input, ButtonGroup, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

import { db, storage } from '../../config/config'
import * as firebase from 'firebase';

import UploadImageButton from './UploadImageButton'

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    text: {
        justifyContent: "center"
    },
    error: {
        color: 'red'
    }
}); 

const metadata = {
    contentType: 'image/jpeg'
}

export default class UpdateInfoCard extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uid: this.props.uid,
            profilePath: null,
            firstName: null,
            lastName: null,
            description: null,  
            sexType: null,
            downloadLink: 'https://img.icons8.com/windows/32/000000/user.png',
            errorMessage: ['','','',''],
        }
        this.updateSex = this.updateSex.bind(this)
        this.updateProfilePath = this.updateProfilePath.bind(this)
      }

    updateSex(sex) {
        this.setState({sex})
        if(sex == 0) {
            this.setState({sexType: "Male"})
        } if(sex == 1) {
            this.setState({sexType: "Female"})
        } 
    }

    updateProfilePath(path) {
        this.setState({ profilePath : path });
    }

    component1 = () => <Text>Male</Text>
    component2 = () => <Text>Female</Text>

    uploadPhotoAsync = async (uri, fileName) => {
        return new Promise( async (resolve, reject) => {
            const response = await fetch(uri);
            const blob = await response.blob();

            let upload = storage.ref('/user/' + this.state.uid + fileName).put(blob);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    reject(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    this.setState({downloadLink: url});
                    resolve(url);
                    
                }
            )
        })
    }

    async submitInfo(_uid, firstName, lastName, description, sex) {

        await this.uploadPhotoAsync(this.state.profilePath, '/icon/icon.jpg');
       
        db.ref('/users/' + _uid)
        .set({
            uid: _uid,
            avatar_url: this.state.downloadLink,
            firstName: firstName,
            lastName: lastName,
            name: firstName + ' ' + lastName,
            description: description,
            sex: sex,
        })
        .then(() => {
            console.log('-- Finish Creating User --');
            this.props.navigation.navigate('Profile', {id: _uid});
        })
        .catch(err => {
            console.log(err);
        });
    }
      
    render() {
        const buttons = [{ element: this.component1 }, { element: this.component2 }]
        const { sex } = this.state

      return (
          <View>

        <Card
            title='Finish Your Registation'
            >
            <Text style={styles.text}> First Name </Text>
            <Input
                placeholder="Required"
                onChangeText={value => this.setState({ firstName: value })}
                errorMessage={this.state.errorMessage[0]}
                />

            <Text style={styles.text}> Last name </Text>
            <Input
                placeholder="Required"
                onChangeText={value => this.setState({ lastName: value })}
                errorMessage={this.state.errorMessage[1]}
                />

            <Text style={styles.text}> Desciption </Text>
            <Input
                placeholder="Required"
                onChangeText={value => this.setState({ desciption: value })}
                errorMessage={this.state.errorMessage[2]}
                />
                
            <Text> Sex </Text>
            <ButtonGroup
                onPress={this.updateSex}
                selectedIndex={sex}
                buttons={buttons} 
            />
            <Text style={styles.error}> {this.state.errorMessage[3]} </Text> 
            <UploadImageButton updateProfilePath={this.updateProfilePath}/>
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Submit' 
                type='solid'
                onPress = {() => {
                    let newArray = new Array(4);

                    if(this.state.firstName == null) {
                        newArray[0] = 'First Name is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    if(this.state.lastName == null) {
                        newArray[1] = 'Last Name is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    if(this.state.desciption == null) {
                        newArray[2] = 'Description is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    if(this.state.sex == null) {
                        newArray[3] = 'Sex is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    this.submitInfo(this.props.uid, this.state.firstName, this.state.lastName, this.state.desciption, this.state.sexType);
                }}
            />
            </Card>
            </View>
      );
    }   
  } 