import {
  createSwitchNavigator
} from "react-navigation";

import { AsyncStorage } from "react-native"

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AuthLoading from '../screens/AuthLoading';

const AppNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default AppNavigator;
