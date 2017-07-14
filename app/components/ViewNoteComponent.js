import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from 'react-native';

import NoteDb from './../database/NoteDb';
import date from './../utils/date'

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

  state = {
    editNote: false,

    id: '',
    image: '',
    date: '',
    title: '',
    description: '',
  }

  render() {
    const {params} = this.props.navigation.state;

    // var icon = this.props.active ? require(params.image) : require('../resources/test.png');
    var icon = {
      uri:'file:///storage/emulated/0/Pictures/solar-eclipse-worldwide-015.jpg'
    };

    var title = params.title;

    if (this.state.editNote) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>

            <Image source={icon} style={styles.image}/>

            <View style={styles.descriptionContainer}>
              <TextInput style={styles.title}
                  onChangeText={(title) => this.setState({title})}
                  placeholder={title} placeholderTextColor='green' underlineColorAndroid='transparent'></TextInput>
              <TextInput style={styles.description}
                  onChangeText={(description) => this.setState({description})}
                  placeholder={params.description} placeholderTextColor='green' underlineColorAndroid='transparent'></TextInput>
            </View>

          </ScrollView>

          <TouchableOpacity onPress={()=>this.editNote(params)} style={styles.editBtn}>

            <Text style={styles.editBtnText}>Edit</Text>

          </TouchableOpacity>

        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>

          <Image source={icon} style={styles.image}/>

          <View style={styles.descriptionContainer}>

            <Text style={styles.title}>{title.toUpperCase()} {params.date}</Text>
            <Text style={styles.description}>{params.description}</Text>

          </View>

        </ScrollView>
        <TouchableOpacity onPress={()=>{
          this.setState({editNote: true})
          }} style={styles.editBtn}>

          <Text style={styles.editBtnText}>Edit</Text>

        </TouchableOpacity>
      </View>
    );
  }

  editNote(params) {

    var note = {
      id: params.id,
      date: params.date,
      title: this.state.title,
      description: this.state.description,
      image: params.image,
    };

    NoteDb.updateNote(note);

    let refreshFunc = params.refresh;
    if(typeof refreshFunc === 'function'){
        refreshFunc();
    }

    this.props.navigation.goBack();
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  scrollView:{
    flex: 1,
    paddingBottom: 20,
  },
  image:{
    width: 200,
    height: 200,
    alignSelf:'center',
  },
  descriptionContainer:{
    flex: 1,
    marginTop: 20,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ceceb7',
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  description:{
    fontSize: 16,
    marginTop: 5,
    lineHeight: 20,
    paddingBottom: 10,
  },
  editBtn:{
    backgroundColor: 'blue',
    width: 150,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    borderRadius: 20,
    zIndex: 10,
  },
  editBtnText:{
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
  }
});

export default ViewNoteComponent;
