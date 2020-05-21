import React, { Component } from "react";
import * as ImagePicker from 'expo-image-picker';
import {View, Text, Image } from "react-native";
import { Button } from 'react-native-elements'

export default class PhotoPickerScreen extends Component {
 constructor(props) {
    super(props);
    this.state = {
    }
 }
 
 _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: false,
     aspect: [16, 9]
    });
    if (!result.cancelled) {
     this.setState({ image: result.uri });
     this.props.updateImagePath(result.uri.toString());
    }
   }

 render() {
    let { image } = this.state;
   
    return (
    <View>
    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        {image && 
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontWeight:'bold'}}> {this.props.title} </Text>
        <Image source={{ uri: image }} style={{
          width: 85, 
          height: 85, 
          borderRadius: 85 / 2, 
          }} />
        </View>}
    </View>
     <Button 
       onPress={this._getPhotoLibrary.bind(this)} 
       title= {"Upload " + this.props.title }
       type='clear'
     />
     </View>
   );
  
 }
}
