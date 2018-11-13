import React from 'react';
import {
  createDrawerNavigator,
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
import OwnerNotificationStack from './OwnerNotificationStack';
import { CustomDrawerContent } from '../components';

const AppOwnerDrawer = createDrawerNavigator(
  {
    Owner: OwnerStack,
  },{
      contentComponent: props => <CustomDrawerContent {...props} />,
  }
);

const AppStaffDrawer = createDrawerNavigator(
  {
    App: AppStack,
  },{
      contentComponent: props => <CustomDrawerContent {...props} />,
  }
);

const AppNavigator = createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    MainOwner: AppOwnerDrawer,
    MainStaff: AppStaffDrawer,
    StaffDetail: StaffDetailStack,
    CreateStaff: CreateStaffStack,
    OwnerNotification: OwnerNotificationStack,
    CreateProduct: CreateProductStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  }
);

export default AppNavigator;
