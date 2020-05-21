import React, { useState, useEffect } from 'react';
import { View, Text , StyleSheet } from 'react-native';
import { Button, Overlay, Card, Badge, ListItem, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

import UploadImageButton from '../UpdateInfo/UploadImageButton'
import { storage,auth } from '../../config/config';

let set = false;

const styles = StyleSheet.create({
  cardContainer: {
      backgroundColor: 'white',
      alignItems: 'center',
    },    
    title: {
      color: '#47525E',
      fontSize: 16,
      fontWeight: 'bold',
  },
  description: {
      paddingTop: 7, 
      color: '#8492A6',
      fontSize: 12,
  },buttonGroup: {
    flexDirection: 'row'
  }
});  

const EditGallery = props => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [uploadImage, setUploadImage] = useState('');


    const listEX = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://firebasestorage.googleapis.com/v0/b/comp4521-5739d.appspot.com/o/user%2FMr2kGP1Qa8XE6BvgpEtZMpuEWvs2%2Fgallery%2Fgallery1.jpg?alt=media&token=d00f0f7f-1d76-4c45-8155-c85cd898e644',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
    ];

    const _getPhotoLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: false,
         aspect: [16, 9]
        });
        if (!result.cancelled) {
            setUploadImage(result.uri);
        }
    }

    const uploadPhotoAsync = (uri, fileName, isDownload) => {
        return new Promise( async (resolve, reject) => {
            const response = await fetch(uri);
            const blob = await response.blob();
            let upload = storage.ref('/user/' + auth.currentUser.uid + fileName).put(blob);
            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    reject(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    resolve(url);
                }
            )
        })
    }

    const uploadImg = async (fn1) =>  {
        try {
        let first = await fn1;
        }catch(err) {
            throw ''
        }
        return 'Completed';
    }

    useEffect(() => {
        setList(props.gallery);
        setLoadedData(true)
        async function fetchData() {
            if(uploadImage != '') {
                let date = new Date().toLocaleString();
                await uploadImg(uploadPhotoAsync(uploadImage, '/gallery/' + date  , false))
            }
          }
          fetchData();
    
    }, [props.gallery, uploadImage]);

    return (
        <View>    
        <Overlay isVisible={props.open} onBackdropPress={()=>{
           // props.toggleEdit(!props.open)
        }}>
        <View style={{
            flexDirection:'row',
            justifyContent: 'flex-end'
        }}>
            <Badge value="Close" status="error" onPress={()=>{
                props.toggleEdit(!props.open)
            }
            }/>
        </View>
        <Card
            title="Editing Gallery"    
        >
            <Button 
            onPress={async()=>{
                setLoading(true);
                _getPhotoLibrary();
                setLoading(false);
            }} 
            title= {"Upload Images" }
            type='clear'
            loading = {loading}
            />
            <ScrollView style={{height : '72%'}}>
            { uploadImage != ''?
                <Text> Uploaded !</Text>:
                <View></View>
            }
            {   loadedData && 
                list.map((l, i) => (
                    <ListItem
                    key={i}
                    leftAvatar={{ source: { uri: l.image.uri } }}
                    bottomDivider
                    topDivider
                    title={"Image " + (i+1)}
                    subtitle={"Upload Date : \n2020 - 5 - 17 18:30:32"  }
                    subtitleStyle={{
                        fontSize:10
                    }}
                    checkBox={{
                        iconType:'material',
                        uncheckedIcon:'clear'
                    }}
                  />
                ))
            }
            </ScrollView>
        </Card>
        </Overlay>
        </View>
    );
    
       
}

export default EditGallery;