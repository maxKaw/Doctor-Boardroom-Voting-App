import * as React from 'react';
import { StyleSheet } from 'react-native';
import {RootNavigator} from './navigation/navigator';

import {
  createAppContainer
} from 'react-navigation';
export default class App extends React.Component {
  render() {
      const Layout = createAppContainer(RootNavigator);
      return <Layout />;
  }
};

