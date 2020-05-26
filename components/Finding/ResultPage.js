import React, { useState } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon, SearchBar, Overlay } from 'react-native-elements';
import ProfileMiniCard from '../Profile/ProfileMiniCard';
import SearchBarView from './SearchBar';
import { database, auth } from '../../config/config';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    height: 2000
  },
  resultContainer: {
    width: '99%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#47525E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    paddingTop: 25,
  },
  overlayBox:{
	  height: "10%",
	  borderWidth: 3,
	  borderRadius: 20,
	  justifyContent: "center",
	  alignItems: "center",
	  borderColor:"#29a2cf"
	},
	overlayBoxText:{
		fontSize: 20,
		textShadowColor: "#FFFF00",
		textShadowRadius: 3,
		color: "#29a2cf"
	}
});


export const ResultPage = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const sendFriendRequest = (targetUserUID) => {
	toggleOverlay()
    //database.ref('/users/' + auth.currentUser.uid).child('/friends/' + targetUserUID).set(true)
    database.ref('/users/' + targetUserUID + '/friendRequests/' + auth.currentUser.uid).set(true)
  }

  return (
    <ScrollView>
		<Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayBox}>
			<Text style={styles.overlayBoxText}>New Friend Request Sent!</Text>
		</Overlay>
      <View style={styles.contentContainer}>
        <View style={styles.searchBar}>
          <SearchBarView navigation={navigation} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> {route.params.list.length} results found .. </Text>
        </View>
        <View style={styles.resultContainer}>
          <FlatList
            data={route.params?.list}
            keyExtractor={(item) => item.id}
            numColumns={2}

            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 0 }}>
                <ProfileMiniCard
                  name={item.name}
                  description={item.description}
                  icon={item.image}
                  uid={item.uid}
                  onClickProfile={() => {
                    navigation.navigate('Profile', {
                      id: item.uid,
                    })
                  }}
                  onClickSendFriendRequest={sendFriendRequest}
                />
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}