import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  AsyncStorage,
  Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import SearchBar from '../components/SearchBar';
import StaffItem from '../components/StaffItem';
import { Hamburger, PlusIcon } from '../components/imageUrls';

import { getStaffsFromApi } from '../actions/staffs';
import { LogoutIcon } from '../components/icons';

class StaffsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Nhân viên',
    headerLeft: (
      <LogoutIcon onPress={() => {
        Alert.alert(
          'Xác Nhận',
          'Bạn có thật sự muốn đăng xuất ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: async () => {
              await AsyncStorage.clear();

              navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AuthLoading' })],
                key: null,
              }));

            }},
          ],
          { cancelable: false }
        )
      }} />
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateStaff', { user: {}, isEdit: false })}>
        <Image
          style={{ width: 16, height: 16, marginRight: 16 }}
          source={PlusIcon}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStaffsFromApi();
  }

  onItemPress = (staff) => {
    this.props.navigation.navigate('StaffDetail', { userId: staff.id });
  }

  renderStaffItem = ({ item }) => (
    <StaffItem onItemPress={this.onItemPress} staff={item} />
  )

  keyExtractor = (item) => `staff-${item.id}`;

  onRefresh = () => {
    this.props.getStaffsFromApi();
  }

  render() {
    const { loading, error, staffs } = this.props;

    return (
      <View style={styles.container}>
        <SearchBar placeholder="Tìm kiếm" />
        <FlatList
          data={staffs}
          renderItem={this.renderStaffItem}
          keyExtractor={this.keyExtractor}
          style={styles.list}
          ItemSeparatorComponent={Divider}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.onRefresh}
            />
          }
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
    padding: 16,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 27,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 10,
    marginBottom: 10,
  }
})

const mapStateToProps = (state) => ({
  loading: state.Staffs.loading,
  error: state.Staffs.loading,
  staffs: state.Staffs.data,
});

const mapDispatchToProps = {
  getStaffsFromApi,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StaffsScreen);