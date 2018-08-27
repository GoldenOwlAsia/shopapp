import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "../screens/Welcome";
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import MapScreen from '../screens/Map';

import { HamburgerIcon, SettingsIcon, BackIcon } from '../components/icons';

import { CustomDrawerContent } from '../components';
import { colors } from '../utils/constants';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="home" size={23} color={tintColor} />
  ),
  // drawerLabel: "Pollen",
  // drawerIcon: ({ tintColor }) => (
  //   <FontAwesome name="home" size={23} color={tintColor} />
  // ),
  // headerStyle: {
  //   backgroundColor: colors.BLUE_100
  // },
  // headerTitle: "Pollen",
  // headerTitleStyle: {
  //   color: colors.WHITE
  // },
  // headerLeft: (
  //   <HamburgerIcon onPress={() => navigation.navigate("DrawerOpen")} />
  // )
};

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: "Nearby",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="map" size={23} color={tintColor} />
  ),
  // drawerLabel: "Nearby",
  // drawerIcon: ({ tintColor }) => (
  //   <FontAwesome name="map" size={23} color={tintColor} />
  // ),
  // headerStyle: {
  //   backgroundColor: colors.BLUE_100
  // },
  // headerTitle: "Nearby",
  // headerTitleStyle: {
  //   color: colors.WHITE
  // },
  // headerLeft: (
  //   <HamburgerIcon onPress={() => navigation.navigate("DrawerOpen")} />
  // )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="user-circle" size={23} color={tintColor} />
  ),
  // drawerLabel: "Profile",
  // drawerIcon: ({ tintColor }) => (
  //   <FontAwesome name="user-circle" size={23} color={tintColor} />
  // ),
  // headerStyle: {
  //   backgroundColor: colors.BLUE_100
  // },
  // headerTitle: "Profile",
  // headerTitleStyle: {
  //   color: colors.WHITE
  // },
  // headerLeft: (
  //   <HamburgerIcon onPress={() => navigation.navigate("DrawerOpen")} />
  // ),
  // headerRight: (
  //   <SettingsIcon onPress={() => navigation.navigate("Settings")} />
  // )
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  ProfileStack,
});