import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import MenuIcon from '../../components/MenuIcon';
import NotificationItem from '../../components/NotificationItem';
import { Hamburger, NotificationIcon } from '../../components/imageUrls';

class NotificationScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Thông báo',
    headerLeft: (
      <MenuIcon icon={Hamburger} />
    ),
    headerRight: (
      <MenuIcon icon={NotificationIcon} />
    )
  });

  constructor(props) {
    super(props);
  }

  renderNotificationItem = ({ item, index }) => (
    <NotificationItem
      item={item}
      selected={index % 2 === 0}
    />
  )

  keyExtractor = (item) => item.id

  render() {
    /**
     * fake data
     */
    const URL = 'https://i.ytimg.com/vi/SJrb_d7W9Ww/maxresdefault.jpg';
    const notifications = Array.from({ length : 20 }).map((item, index) => ({
      id: `${index}`,
      supplier: `Đinh Văn Lộc`,
      product: 'Nike Air Force',
      customer: 'Trần Trúc Linh',
      date: '15 phút trước',
      avatarUrl: URL,
    }))
    return (
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={this.renderNotificationItem}
          keyExtractor={this.keyExtractor}
          style={styles.list}
          ItemSeparatorComponent={Divider}
        />
      </View>
    )
  }
}

const Divider = () => (
  <View style={styles.divider} />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  }
});

export default NotificationScreen;