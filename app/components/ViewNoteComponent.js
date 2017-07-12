import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class ViewNoteComponent extends Component {

  static navigationOptions = {
      title:'View Note',
      headerTitleStyle:{
        color: 'black',
      },
      headerStyle:{
        backgroundColor: '#688AFF',
      }
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <Image source={params.image} style={styles.image}/>
        <Text>{params.title}</Text>
        <Text>{params.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height: 200,
  }
});

export default ViewNoteComponent;
