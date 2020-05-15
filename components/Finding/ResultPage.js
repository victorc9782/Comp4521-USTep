import React from 'react'
import { ScrollView, View,Text, Image, StyleSheet, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon, SearchBar} from 'react-native-elements';
import ProfileMiniCard from '../Profile/ProfileMiniCard'; 

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
  }, resultContainer: {
      width: '99%',
  }, titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }, title: {
    color: '#47525E',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
},
});  

export const ResultPage = ({ route, navigation }) => {
    
  return (
    <View style={styles.contentContainer}>
        <SearchBar
          placeholder="Search User Name or ID ..."
          lightTheme={true}
          platform='android'
        />
      <View style={styles.titleContainer}> 
        <Text style={styles.title}> 20 results found .. </Text>
      </View>
      <View style={styles.resultContainer}>
        <FlatList
            data = {[
                {name: 'Chan Kin Lok', description: 'Engineering Freshman' ,image: require('../../assets/gallery1.jpg'),id: '1'},
                {name: 'Tai Man Ho', description: 'HKU Exchanger' ,image: require('../../assets/gallery2.jpg'),id: '2'},
                {name: 'Lee Ka Shing', description: 'Elec Lover' ,image: require('../../assets/gallery3.jpg'),id: '3'},
                {name: 'Ho Ka Chiu', description: 'CPEG Year4 Student' ,image: require('../../assets/gallery4.jpg'),id: '4'},
                {name: 'Ip Tse Chun', description: 'Math2011 retaker' ,image: require('../../assets/gallery5.jpg'),id: '5'},
                {name: 'Yu Sheung Lam', description: 'CS student' ,image: require('../../assets/gallery6.jpg'),id: '6'},
                {name: 'Johnny James', description: 'American' ,image: require('../../assets/gallery7.jpg'),id: '7'},
                {name: 'Li Sum', description: 'Student Union committee' ,image: require('../../assets/gallery8.jpg'),id: '8'},
                {name: 'Chan Tai Man', description: '',image: require('../../assets/gallery9.jpg'),id: '9'},
            ]}
            keyExtractor={(item) => item.id}
            numColumns={2}

            renderItem={({item} ) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 0 }}>
                <ProfileMiniCard 
                  name={item.name} 
                  description={item.description} 
                  id={item.id} 
                  icon={item.image}
                  onClickProfile={()=> {navigation.navigate('Profile',{ 
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    icon: item.image
                  })}} />
            </View>
            )}
        />
      </View>
      </View>
  );
}