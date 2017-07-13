import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
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

    var icon = this.props.active ? require(params.image) : require('../resources/test.png');
    var title = params.title;

    return (
      <View style={styles.container}>
        <Image source={icon} style={styles.image}/>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.title}>{title.toUpperCase()} {params.date}</Text>
          <Text style={styles.description}>{params.description}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height: 200,
    alignSelf:'center',
  },
  descriptionContainer:{
    flex: 1,
    marginTop: 20,
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ceceb7',
  },
  description:{
    fontSize: 16,
    marginTop: 5,
  }
});

export default ViewNoteComponent;
