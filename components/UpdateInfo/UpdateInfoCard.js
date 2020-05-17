import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native'; 
import { Card, Button, Input, ButtonGroup} from 'react-native-elements'
import { database, storage } from '../../config/config'
import UploadImageButton from './UploadImageButton'

import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    text: {
        justifyContent: "center",
        fontWeight: 'bold'
    },
    error: {
        color: 'red'
    }, 
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20
    }, content: {
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    imageCard: {
        paddingBottom: 50
    }
}); 

const schoolList = [               
    { label: 'School of Science (SSCI)', value: 'School of Science (SSCI)' },
    { label: 'School of Engineering (SENG)', value: 'School of Engineering (SENG)' },
    { label: 'School of Business and Management (SBM)', value: 'School of Business and Management (SBM)' },
    { label: 'School of Humanities and Social Science (SHSS)', value: 'School of Humanities and Social Science (SHSS)' },
    { label: 'Interdisciplinary Programs Office (IPO)', value: 'Interdisciplinary Programs Office (IPO)' },
];

const hobbyList = [
    { label: 'Football', value: 'football' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Hockey', value: 'hockey' },
    { label: 'Music', value: 'music' },
    { label: 'Movie', value: 'movie' },
    { label: 'Hockey', value: 'hockey' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Hiking', value: 'hiking' },
    { label: 'Swimming', value: 'swimming' },
];


export default class UpdateInfoCard extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uid: this.props.uid,
            profilePath: null,
            wallpaperPath: null,
            firstName: null,
            lastName: null,
            description: null,  
            sexType: null,
            hobbies: null,
            department: null,
            downloadLink: 'https://img.icons8.com/windows/32/000000/user.png',
            loading: false,
            errorMessage: ['','','',''],
        }
        this.updateSex = this.updateSex.bind(this)
        this.updateProfilePath = this.updateProfilePath.bind(this)
        this.updateWallpaperPath = this.updateWallpaperPath.bind(this)
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

    updateWallpaperPath(path) {
        this.setState({ wallpaperPath: path })
    }
    

    component1 = () => <Text>Male</Text>
    component2 = () => <Text>Female</Text>

    uploadPhotoAsync(uri, fileName, isDownload) {
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
                    if(fileName == '/icon/icon.jpg') {
                        this.setState({downloadLink: url});
                    }
                    resolve(url);
                }
            )
        })
    }

    async uploadImg(fn1, fn2) {
        try {
        let first = await fn1;
        let second = await fn2;
        }catch(err) {
            throw ''
        }
        return 'Completed';
    }

    async submitInfo(_uid, firstName, lastName, description, sex, hobbies, department) {

        await this.uploadImg(this.uploadPhotoAsync(this.state.profilePath, '/icon/icon.jpg', true), this.uploadPhotoAsync(this.state.wallpaperPath, '/wallpaper/wallpaper.jpg', false)).then( result => {
            console.log('--Finish uploading Images--')
            database.ref('/users/' + _uid)
            .set({
                uid: _uid,
                avatar_url: this.state.downloadLink,
                firstName: firstName,
                lastName: lastName,
                name: firstName + ' ' + lastName,
                description: description,
                sex: sex,
                hobbies: hobbies,
                department, department,
            })
            .then(() => {
                if(this.props.goHome == true) {
                    this.props.navigation.goBack()
                }else {
                    console.log('-- Finish Creating User --');
                    this.props.updateLogin(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }).catch(err=> {
            
        });
    }
      
    render() {
        const buttons = [{ element: this.component1 }, { element: this.component2 }]
        const { sex } = this.state

      return (
          <View>

            <Card 
                title="Edit Your Own Profile!"
                containerStyle={{ elevation: 0, borderColor: "white" }}>
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
                placeholder={this.state.description}
                onChangeText={value => this.setState({ desciption: value })}
                errorMessage={this.state.errorMessage[2]}
                />
                
            <Text style={styles.text}> Sex </Text>
            <ButtonGroup
                onPress={this.updateSex}
                selectedIndex={sex}
                buttons={buttons} 
            />
            <Text style={styles.error}> {this.state.errorMessage[3]} </Text> 
 
            <Text style={styles.text}> Department </Text>
            <RNPickerSelect
            onValueChange={(value) => this.setState({ department : value})}
            items={schoolList}
            />
            <Text style={styles.error}> {this.state.errorMessage[4]} </Text> 
            <Text style={styles.text}> Hobbies </Text>
            <RNPickerSelect
            onValueChange={(value) => this.setState({ hobbies : value})}
            items={hobbyList}
            />
            <Text style={styles.error}> {this.state.errorMessage[5]} </Text> 
            <Card 
                title="Photos"
                containerStyle={{ borderColor: 'white' }}
            >
                <View style={styles.buttonGroup}>
                <UploadImageButton updateImagePath={this.updateProfilePath} title='Icon'/>
                <UploadImageButton updateImagePath={this.updateWallpaperPath} title='Wallpaper'/>
                </View>
            <Text style={styles.error}> {this.state.errorMessage[6]} </Text> 
            </Card>
            <View style={{height: 20}}></View>
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Submit' 
                type='solid'
                loading={this.state.loading}
                raised
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
                    if(this.state.department == null) {
                        newArray[4] = 'Department is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    if(this.state.hobbies == null) {
                        newArray[5] = 'Hobbies is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    if(this.state.profilePath == null || this.state.wallpaperPath == null) {
                        newArray[6] = 'Icon & Wallpaper is required';
                        this.setState({errorMessage: newArray});
                        return;
                    }
                    this.setState({loading : true})
                    this.submitInfo(this.props.uid, this.state.firstName, this.state.lastName, this.state.desciption, this.state.sexType, this.state.hobbies, this.state.department);
                }}
            />
            </Card>
            </View>
      );
    }   
  } 