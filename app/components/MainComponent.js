import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
const Realm = require('realm');
import NoteItem from './NoteItem';

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
    noteArray:[{
      'image': require('../resources/test.png'),
      'title': 'Title',
      'description':'This may be your desccription'
    }],

    image: require('../resources/test.png'),
    title: 't123123',
    description:'d',
  }

  render() {

    let notes = this.state.noteArray.map((val, key)=>{
      return <NoteItem key={key} keyVal={key} val={val} deleteMethod={() => this.deleteNote(key)}
                viewNote={() => this.viewNote(val)}/>
    });

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
        image: val.image,
        title: val.title,
        description: val.description,
      }
    );
  }

  addNote() {
    this.state.noteArray.push({'image':require('../resources/test.png'), 'title':'', 'description':''});
    this.setState({noteArray: this.state.noteArray});
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray});
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
