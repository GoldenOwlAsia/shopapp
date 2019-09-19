import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import StaffItem from '../components/StaffItem';
import { Hamburger, PlusIcon } from '../components/imageUrls';

import { getStaffsFromApi } from '../actions/staffs';

class StaffsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Nhân viên',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={{ width: 16, height: 12, marginLeft: 12 }}
          source={Hamburger}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateStaff', { user: {}, isEdit: false })}>
        <Image
          style={{ width: 16, height: 16, marginRight: 12 }}
          source={PlusIcon}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      borderBottomWidth: 0,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
    };
  }

  componentDidMount() {
    this.props.getStaffsFromApi();
  }

  onChangeSearhKeyword = (keyword) => {
    this.setState({
      searchKeyword: keyword
    });
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
    const { loading, error } = this.props;
    const staffs = this.props.staffs.filter(item => !this.state.searchKeyword || item.fullName.toLowerCase().includes(this.state.searchKeyword.toLowerCase()));
    return (
      <View style={styles.container}>
        <View style={{paddingHorizontal: 12}}>
          <SearchBar
            placeholder="Tìm kiếm"
            value={this.state.searchKeyword}
            onChangeText={this.onChangeSearhKeyword}
          />
      </View>
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
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 27,
    paddingLeft: 18
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