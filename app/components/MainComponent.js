import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  ScrollView,
} from 'react-native';

import NoteItem from './NoteItem';
import NoteDb from './../database/NoteDb';
import date from './../utils/date'

class MainComponent extends Component {

  static navigationOptions = {
      title:'NoteBook',
      headerTitleStyle:{
        color: 'black',
      },
      headerStyle:{
        backgroundColor: '#688AFF',
      }
  };

  state = {
    noteArray:[],
  }

  render() {

    this.state.noteArray = NoteDb.getAllNotes();

    let notes = this.state.noteArray.map((val, key)=>{
      return <NoteItem key={key} keyVal={key} val={val}
                deleteMethod={() => this.deleteNote(val)}
                viewNote={() => this.viewNote(val)}/>
    });

    var count = NoteDb.getAllNotes().length;

    return (
      <View style={styles.container}>
        <Text>Counts in Realm: {count}</Text>
        <ScrollView style={styles.scrolViewContainer}>
          {notes}
        </ScrollView>

        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addNoteBtn}>
            <Text style={styles.addNoteBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  viewNote(val) {
    this.props.navigation.navigate('ViewNoteComponent',
      {
        image: val.image,
        date: val.date,
        title: val.title,
        description: val.description,
      }
    );
  }

  addNote() {
    var id = 0;
    if (NoteDb.getAllNotes() != null) {
      id = NoteDb.getAllNotes().length;
    }
    var note = {
      'image': '../resources/test2.png',
      'date': '' + date.getCurrentDate(),
      'title': 'title ' + id,
      'description': 'note description',
    };

    NoteDb.addNote(note);
    this.setState({noteArray: NoteDb.getAllNotes()});
  }

  deleteNote(val) {
    NoteDb.deleteNote(val);
    this.setState({noteArray: NoteDb.getAllNotes()});
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 5,
  },
  scrolViewContainer:{
    flex: 1,
  },
  addNoteBtn:{
    alignSelf: 'flex-end',
    backgroundColor: '#E91E63',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    zIndex: 10,
    marginRight: 10,
  },
  addNoteBtnText:{
    color: '#fff',
    fontSize: 24,
  }
});

export default MainComponent;

// let realm = new Realm({
//      schema: [{name: 'Dog', properties: {name: 'string'}}]
//    });
//
//    realm.write(() => {
//      realm.create('Dog', {name: 'Rex'});
//    });
