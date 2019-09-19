import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import MenuIcon from '../../components/MenuIcon';
import NotificationItem from '../../components/NotificationItem';
import { NotificationActiveIcon, CloseIcon } from '../../components/imageUrls';
import { getNotifications } from '../../actions/notifications';

class NotificationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Thông báo',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Owner')}>
        <Image
          style={{ width: 16, height: 16, marginLeft: 16 }}
          source={CloseIcon}
        />
      </TouchableOpacity>
    ),
    headerRight: <MenuIcon icon={NotificationActiveIcon} />
  });

  async componentDidMount() {
    this.props.getNotifications();
  }

  renderNotificationItem = ({ item, index }) => (
    <NotificationItem
      item={item}
      // selected={index % 2 === 0}
    />
  );

  keyExtractor = item => `notification-${item.id}`;

  render() {
    const notifications = this.props.notifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
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
    );
  }
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA'
  }
});

const mapStateToProps = state => ({
  notifications: state.Notifications.notifications
});

const mapDispatchToProps = {
  getNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen);
