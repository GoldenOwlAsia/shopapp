import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import StaffDetailScreen from '../screens/StaffDetail';

const StaffDetailStack = createStackNavigator({
  StaffDetai: StaffDetailScreen,
}, {
  headerBackTitleVisible: true,
});

export default StaffDetailStack;