import React, { Component } from "react";
import { SearchBar } from 'react-native-elements';

function search(keywords){
    const list= [
    {name: 'Chan Kin Lok', description: 'Engineering Freshman' ,image: require('../../assets/gallery1.jpg'),id: '1'},
    {name: 'Tai Man Ho', description: 'HKU Exchanger' ,image: require('../../assets/gallery2.jpg'),id: '2'},
    {name: 'Lee Ka Shing', description: 'Elec Lover' ,image: require('../../assets/gallery3.jpg'),id: '3'},
    {name: 'Ho Ka Chiu', description: 'CPEG Year4 Student' ,image: require('../../assets/gallery4.jpg'),id: '4'},
    {name: 'Ip Tse Chun', description: 'Math2011 retaker' ,image: require('../../assets/gallery5.jpg'),id: '5'},
    {name: 'Yu Sheung Lam', description: 'CS student' ,image: require('../../assets/gallery6.jpg'),id: '6'},
    {name: 'Johnny James', description: 'American' ,image: require('../../assets/gallery7.jpg'),id: '7'},
    {name: 'Li Sum', description: 'Student Union committee' ,image: require('../../assets/gallery8.jpg'),id: '8'},
    {name: 'Chan Tai Man', description: '',image: require('../../assets/gallery9.jpg'),id: '9'},];

    let resultList = [];

    for(let target of list) {
        if(target.name === keywords || target.id === keywords) {
            resultList.push(target);
        }
    }

    this.props.onSearch;
}


export default class SearchBarView extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search User Name or ID ..."
        platform='android'
        onChangeText={this.updateSearch}
        value={search}
        onSubmitEditing={search}
      />
    );
  }
}