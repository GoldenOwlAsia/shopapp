import React from 'react';
import {
  createStackNavigator
} from 'react-navigation';
import CreateStaffScreen from '../screens/CreateStaff';

const CreateStaffStack = createStackNavigator({
  CreateStaff: CreateStaffScreen,
}, {
  headerBackTitleVisible: true,
});

export default CreateStaffStack;