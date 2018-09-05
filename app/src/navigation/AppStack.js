import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import { FontAwesome, Ionicons } from "@expo/vector-icons";
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
  tabBarLabel: 'Products',
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
  tabBarLabel: "Cart",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="map" size={23} color={tintColor} />
  ),
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    if (navigation.isFocused()) {
      // Do nothing
    } else {
      let parentNavigation = navigation.dangerouslyGetParent();
      let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
      let nextRoute = navigation.state;
      const route = prevRoute.routes && prevRoute.routes[0]
      if (route && (route.params || {}).handler) {
        route.params.handler();
      } else {
        defaultHandler();
      }
    } 
    // handler();
  },
  // drawerLabel: "Cart",
  // drawerIcon: ({ tintColor }) => (
  //   <FontAwesome name="map" size={23} color={tintColor} />
  // ),
  // headerStyle: {
  //   backgroundColor: colors.BLUE_100
  // },
  // headerTitle: "Cart",
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