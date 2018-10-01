import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import MenuIcon from '../components/MenuIcon';
import { Hamburger, NotificationIcon } from '../components/imageUrls';

class DashboardScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Thống kê',
    headerLeft: (
      <MenuIcon icon={Hamburger} />
    ),
    headerRight: (
      <MenuIcon onPress={() => navigation.navigate('OwnerNotification')} icon={NotificationIcon} />
    )
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Dashboard page</Text>
      </View>
    )
  }
}

export default DashboardScreen;