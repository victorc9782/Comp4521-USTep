import React from 'react'
import { ScrollView, View,Text, Image, StyleSheet, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon, SearchBar} from 'react-native-elements';
import ProfileMiniCard from '../Profile/ProfileMiniCard'; 
import SearchBarView from './SearchBar';

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
  }
});  

export const ResultPage = ({ route, navigation }) => {
  
  return (
    <ScrollView>
    <View style={styles.contentContainer}>
        <View style={styles.searchBar}>
        <SearchBarView navigation={navigation}/>
        </View>
      <View style={styles.titleContainer}> 
        <Text style={styles.title}> {route.params.list.length} results found .. </Text>
      </View>
      <View style={styles.resultContainer}>
        <FlatList
            data = { route.params?.list}
            keyExtractor={(item) => item.id}
            numColumns={2}

            renderItem={({item} ) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 0 }}>
                <ProfileMiniCard 
                  name={item.name} 
                  description={item.description} 
                  icon={item.image}
                  onClickProfile={()=> {navigation.navigate('Profile',{ 
                    id: item.uid,
                  })}} />
            </View>
            )}
        />
      </View>
      </View>
      </ScrollView>
  );
}