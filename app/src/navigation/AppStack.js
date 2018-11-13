import React from "react";
import { Image } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import HomeScreen from '../screens/Home';
import CustomersScreen from '../screens/Customers';
import CheckoutScreen from '../screens/Checkout';
import { CheckoutTabIconActive, CheckoutTabIconInactive, HomeTabIconActive, HomeTabIconInactive, CustomerTabIconActive, CustomerTabIconInactive } from '../components/imageUrls';

const TabIcon = ({ icon }) => (
    <Image resizeMode="contain" source={icon} style={{ width: 28, height: 28 }} />
)

const TabIconCart = ({ icon }) => (
  <Image resizeMode="contain" source={icon} style={{ width: 42, height: 42 }} />
)

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabIcon icon={focused ? HomeTabIconActive : HomeTabIconInactive} />
  ),
};

const CheckoutStack = createStackNavigator({
  Checkout: CheckoutScreen,
});

CheckoutStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabIconCart icon={focused ? CheckoutTabIconActive : CheckoutTabIconInactive} />
  ),
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    // defaultHandler();
    if (navigation.isFocused()) {
      // Do nothing
    } else {
      let parentNavigation = navigation.dangerouslyGetParent();
      let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
      const route = prevRoute.routes && prevRoute.routes[0]
      if (route && (route.params || {}).handler) {
        route.params.handler();
      } else {
        defaultHandler();
      }
    } 
  },
  tabBarVisible: false,
};

const CustomersStack = createStackNavigator({
  Customers: CustomersScreen,
});

CustomersStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabIcon icon={focused ? CustomerTabIconActive : CustomerTabIconInactive} />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CheckoutStack,
  CustomersStack,
}, {
  tabBarOptions: {
    showLabel: false,
    style: {
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4'
    },
  }
});