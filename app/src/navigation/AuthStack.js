import React from 'react';
import {
  createStackNavigator
} from 'react-navigation';
import StaffSignInScreen from '../screens/StaffSignIn';
import ChooseUserTypeScreen from '../screens/ChooseUser';
import OnwerLogin from '../screens/OwnerLogin'

const AuthStack = createStackNavigator(
  { 
    SignIn: StaffSignInScreen,
    ChooseUserTypeScreen: ChooseUserTypeScreen,
    OnwerLogin: OnwerLogin
  },
  {
    initialRouteName: 'ChooseUserTypeScreen'
  }
);

export default AuthStack;