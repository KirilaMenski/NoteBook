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
import RNCalendarEvents from 'react-native-calendar-events';

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
        id: val.id,
        calendarId: val.calendarId,
        image: val.image,
        dateStart: val.dateStart,
        dateEnd: val.dateEnd,
        title: val.title,
        description: val.description,
        refresh: this.refreshFun
      }
    );
  }

  addNote() {

    var note = {
      'calendarId': '',
      'image': '../resources/test2.png',
      'dateStart': '' + date.getCurrentDate(),
      'dateEnd': '' + date.getCurrentDate(),
      'title': 'title',
      'description': 'note description',
    };

    NoteDb.addNote(note);
    this.setState({noteArray: NoteDb.getAllNotes()});

    // this.viewNote(note);
  }

  deleteNote(val) {
    RNCalendarEvents.removeEvent(val.calendarId);
    NoteDb.deleteNote(val);
    this.setState({noteArray: NoteDb.getAllNotes()});
  }

  refreshFun = () => {
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
    position: 'absolute',
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
    bottom: 10,
    right: 10,
  },
  addNoteBtnText:{
    color: '#fff',
    fontSize: 24,
  }
});

export default MainComponent;
