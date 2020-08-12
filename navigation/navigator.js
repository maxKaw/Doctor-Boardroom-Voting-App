import * as React from 'react';
import { Platform, Text, View, StyleSheet, StatusBar, SafeAreaView, DrawerItems, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login';
import ProfileSettings from '../screens/profileSettings';
import CreateUser from '../screens/createUser';
import ModifyUser from '../screens/modifyUser';
import CreatePatient from '../screens/createPatient';
import ModifyPatient from '../screens/modifyPatient';
import CreateBoardroom from '../screens/createBoardroom';
import Boardroom from '../screens/boardroom';
import ResultsLive from '../screens/resultsLive';
import ShowBoardrooms from '../screens/showBoardrooms';
import inviteToBoardroom from "../screens/inviteToBoardroom";
import forgotPassword from "../screens/forgotPassword";
import Logout from '../screens/logout';
import Vote from '../screens/vote';
import Header from 'react-native-elements';
import showClosedBoardrooms from '../screens/showClosedBoardrooms';
import { MaterialIcons } from '@expo/vector-icons';
import createQuestion from "../screens/createQuestion";
import deleteUser from "../screens/deleteUser";
import forgotPasswordChange from "../screens/forgotPasswordChange";



const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}; 


export const LoginPage = createStackNavigator(
    {

        "Login": {screen: Login},
        "forgotPass": {screen: forgotPassword},
        "confirmCode": {screen: forgotPasswordChange},
        //"changePass": {screen : changePassword},

    },
    {
        headerMode: 'none',
        initialRouteName: "Login",
    }
);


export const BoardroomsView = createStackNavigator(
  {

      "Boardrooms available": {screen: ShowBoardrooms},
      "ViewBoardroom": {screen: Boardroom},
      "ResultsLive": {screen: ResultsLive},
      "Vote": {screen: Vote},
  },
  {
      headerMode: 'none',
      initialRouteName: "Boardrooms available",
  }
);

export const ClosedBoardroomsView = createStackNavigator(
  {

      "Boardrooms closed": {screen: showClosedBoardrooms},
      "ViewBoardroom": {screen: Boardroom},
      "ResultsLive": {screen: ResultsLive},
      "Vote": {screen: Vote},
  },
  {
      headerMode: 'none',
      initialRouteName: "Boardrooms closed",
  }
);

export const UserNav = createDrawerNavigator(
  {
    'Show Available Boardrooms': {screen: BoardroomsView},
    'Show Closed Boardrooms': {screen: ClosedBoardroomsView},
    'Profile Settings': {screen: ProfileSettings},
    'Log Out': {screen: Logout},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Show Available Boardrooms',
    drawerWidth: 300,
    navigationOptions: navigationOptionsHeader,
    drawerPosition: 'left',
  }
);

export const ChairmanNav = createDrawerNavigator(
  {
    'Show Available Boardrooms': {screen: BoardroomsView},
    'Show Closed Boardrooms': {screen: ClosedBoardroomsView},
    'Create Boardroom': {screen: CreateBoardroom},
    'Create User': {screen: CreateUser},
    'Create Question': {screen: createQuestion},
    'Create Patient': {screen: CreatePatient},
    'Invite To Boardroom' : {screen: inviteToBoardroom},
    'Modify Patient': {screen: ModifyPatient},
    'Modify User': {screen: ModifyUser},
      'Delete User': {screen: deleteUser},
    'Profile Settings': {screen: ProfileSettings},
    'Log Out': {screen: Logout},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Show Available Boardrooms',
    drawerWidth: 300,
    navigationOptions: navigationOptionsHeader,
    drawerPosition: 'left',
  }
);



export const RootNavigator = createSwitchNavigator(
    {
      ChairmanNav: {
        screen: ChairmanNav
      },
      UserNav: {
        screen: UserNav
      },
      Login: {
        screen: LoginPage
      },
      Logout: {
        screen: Logout
      },
    },
    {
      headerMode: 'none',
      initialRouteName: "Login",
    }
  );




  const navigationOptionsHeader = () => {
    toggleDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
      }
    return(
      <React.Fragment>
        <Header
          backgroundColor="white"
           leftComponent={
             <MaterialIcons
               name="menu"
               onPress={this.toggleDrawer}
              />
          }
        />
  
      </React.Fragment>
    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    logoutButton: {
      backgroundColor: 'red',
      position: 'absolute',
      bottom: 0
    }
  });