import React from 'react';
import {
  createStackNavigator
} from 'react-navigation';
import StaffSignInScreen from '../screens/StaffSignIn';
import ChooseUserTypeScreen from '../screens/ChooseUser';

const AuthStack = createStackNavigator(
  { 
    SignIn: StaffSignInScreen,
    ChooseUserTypeScreen: ChooseUserTypeScreen
  },
  {
    initialRouteName: 'ChooseUserTypeScreen'
  }
);

export default AuthStack;