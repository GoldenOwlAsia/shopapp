import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text
} from 'react-native';
import SearchBar from '../components/SearchBar';
import StaffItem from '../components/StaffItem';

class StaffsScreen extends Component {
  constructor(props) {
    super(props);
  }

  onItemPress = (staff) => {
    this.props.navigation.navigate('StaffDetail');
  }

  renderStaffItem = ({ item }) => (
    <StaffItem onItemPress={this.onItemPress} staff={item} />
  )

  keyExtractor = (item) => `staff-${item.id}`;

  render() {
    /**
     * fake data
     */
    const URL = 'https://i.ytimg.com/vi/SJrb_d7W9Ww/maxresdefault.jpg';
    const staffs = Array.from({ length : 20 }).map((item, index) => ({
      id: index,
      name: `Nguyễn Tiến Dũng ${index + 1}`,
      phone: `09087892 ${index + 1}`,
      avatar: URL,
    }))

    return (
      <View style={styles.container}>
        <SearchBar placeholder="Search" />
        <FlatList
          data={staffs}
          renderItem={this.renderStaffItem}
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

export default StaffsScreen;