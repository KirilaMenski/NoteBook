import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import MainComponent from './app/components/MainComponent';
import ViewNoteComponent from './app/components/ViewNoteComponent';
import { StackNavigator } from 'react-navigation';

const app = StackNavigator({
  MainComponent:{
    screen: MainComponent,
  },
  ViewNoteComponent:{
    screen: ViewNoteComponent,
  }
});

AppRegistry.registerComponent('NoteBook', () => app);
