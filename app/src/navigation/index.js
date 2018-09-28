import {
  createSwitchNavigator,
  createStackNavigator,
} from "react-navigation";

import { AsyncStorage } from "react-native"

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import OwnerStack from './OwnerStack';
import AuthLoading from '../screens/AuthLoading';
import StaffDetailStack from './StaffDetailStack';
import CreateStaffStack from './CreateStaffStack';
import CreateProductStack from './CreateProductStack';

const AppNavigator = createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoading,
    Owner: OwnerStack,
    App: AppStack,
    Auth: AuthStack,
    StaffDetail: StaffDetailStack,
    CreateStaff: CreateStaffStack,
    CreateProduct: CreateProductStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  }
);

export default AppNavigator;
