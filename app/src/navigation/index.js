import {
  createSwitchNavigator
} from "react-navigation";

import { AsyncStorage } from "react-native"

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import OwnerStack from './OwnerStack';
import AuthLoading from '../screens/AuthLoading';
import StaffDetailStack from './StaffDetailStack';
import CreateStaffStack from './CreateStaffStack';

const AppNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoading,
    Owner: OwnerStack,
    App: AppStack,
    Auth: AuthStack,
    StaffDetail: StaffDetailStack,
    CreateStaff: CreateStaffStack,
  },
  {
    initialRouteName: 'Owner',
    backBehavior: 'initialRoute',
  }
);

export default AppNavigator;
