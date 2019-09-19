import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/Dashboard';
import ProductsScreen from '../screens/Products';
import StaffsScreen from '../screens/Staffs';
import TabIcon from '../components/TabIcon';
import {
  TabDashboardActive,
  TabDashboardInactive,
  TabCartActive,
  TabCartInactive,
  TabOwnerProductActive,
  TabOwnerProductInactive,
  TabUserActive,
  TabUserInactive
} from '../components/imageUrls';

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen
});

DashboardStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabIcon icon={focused ? TabDashboardActive : TabDashboardInactive} />
  )
};

const CartStack = createStackNavigator({
  Cart: DashboardScreen
});

CartStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabIcon icon={focused ? TabCartActive : TabCartInactive} />
  )
};

const ProductsStack = createStackNavigator({
  Products: ProductsScreen
});

ProductsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabIcon icon={focused ? TabOwnerProductActive : TabOwnerProductInactive} />
  )
};

const StaffsStack = createStackNavigator({
  Staffs: StaffsScreen
});

StaffsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabIcon icon={focused ? TabUserActive : TabUserInactive} />
  )
};

export default createBottomTabNavigator(
  {
    DashboardStack,
    // CartStack,
    ProductsStack,
    StaffsStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4'
      }
    }
  }
);
