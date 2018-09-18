import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DashboardScreen from '../screens/Dashboard';
import ProductsScreen from '../screens/Products';
import StaffsScreen from '../screens/Staffs';

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
});

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="home" size={23} color={tintColor} />
  ),
};

const ProductsStack = createStackNavigator({
  Products: ProductsScreen,
});

ProductsStack.navigationOptions = {
  tabBarLabel: "Products",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="map" size={23} color={tintColor} />
  )
};

const StaffsStack = createStackNavigator({
  Staffs: StaffsScreen,
});

StaffsStack.navigationOptions = {
  tabBarLabel: "Staffs",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="user-circle" size={23} color={tintColor} />
  ),
};

export default createBottomTabNavigator({
  DashboardStack,
  ProductsStack,
  StaffsStack,
});