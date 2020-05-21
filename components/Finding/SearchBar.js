import React, { Component } from "react";
import { SearchBar } from 'react-native-elements';
import { database } from '../../config/config';

export default class SearchBarView extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  search (keywords) {
    let resultList = [];

    Promise.all([
      database.ref("users/").orderByChild("firstName").equalTo(keywords).once('value').then( res => {
        res.forEach( snapshot => {
          resultList.push({uid: snapshot.val().uid, image: {uri: snapshot.val().avatar_url}, name: snapshot.val().name, description: snapshot.val().description})
        })
      }),
      database.ref("users/").orderByChild("lastName").equalTo(keywords).once('value').then( res => {
        res.forEach( snapshot => {
          resultList.push({uid: snapshot.val().uid, image: {uri: snapshot.val().avatar_url}, name: snapshot.val().name, description: snapshot.val().description})
        })
      }),
      database.ref("users/").orderByChild("name").equalTo(keywords).once('value').then( res => {
        res.forEach( snapshot => {
          resultList.push({uid: snapshot.val().uid, image: {uri: snapshot.val().avatar_url}, name: snapshot.val().name, description: snapshot.val().description})
        })
      }),
      database.ref("users/").orderByChild("uid").equalTo(keywords).once('value').then( res => {
        res.forEach( snapshot => {
          resultList.push({uid: snapshot.val().uid, image: {uri: snapshot.val().avatar_url}, name: snapshot.val().name, description: snapshot.val().description})
        })
      })
    ])
      .then(() => {
        console.log(resultList)
        this.props.navigation.navigate('FindingResult', {list: resultList})
      })
      .catch(err => {
        console.log(err)
      })
  }

static searchRandom (nav) {
    let resultList = [];

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

    Promise.all([
      database.ref("users/").orderByChild("hobbies").equalTo(hobbyList[0].value).once('value').then( res => {
        res.forEach( snapshot => {
          resultList.push({uid: snapshot.val().uid, image: {uri: snapshot.val().avatar_url}, name: snapshot.val().name, description: snapshot.val().description})
        })
      })
    ])
      .then(() => {
        console.log(resultList)
        nav.navigate('FindingResult', {list: resultList})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search User Name or ID ..."
        platform='android'
        onChangeText={this.updateSearch}
        value={search}
        onSubmitEditing={() => { 
          this.search(this.state.search)
        }}
      />
    );
  }
}