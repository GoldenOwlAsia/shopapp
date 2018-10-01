import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { BellIcon, Hamburger, RightArrow } from '../../assets/images';
import { colors } from '../utils/constants';
import { formatMoney } from '../utils/helpers';

import { getRecentOrders } from '../actions/order';

class DashboardScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Thống kê',
    headerLeft: (
      <TouchableOpacity>
        <Image
          style={{ width: 16, height: 16, marginLeft: 16 }}
          source={Hamburger}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateStaff')}>
        <Image
          style={{ width: 16, height: 20, marginRight: 16 }}
          source={BellIcon}
        />
      </TouchableOpacity>
    )
  });

  static getDerivedStateFromProps= (props, state) => {
    return state;
  };

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'week'
    }
  }

  componentDidMount() {
    this.props.getRecentOrders();
  }

  onBtnDayPress = () => {
    console.log('btn day press');
  }

  onBtnWeekPress = () => {
    console.log('btn week press');
  }

  onBtnMonthPress = () => {
    console.log('btn month press');
  }

  onOrderPress = () => {
    alert('order pressed!');
  }

  _renderOrders = ({ item, index }) => {
    const {
      customer,
      grandTotal,
    } = item;
    const now = moment();
    const createdAt = moment(item.createdAt);
    const diff = now.diff(createdAt, 'minutes');
    return (
      <View style={ styles.orderItem }>
        <Text style={[styles.whiteText, styles.orderGrandTotal]}>{formatMoney(grandTotal)} đ</Text>
        <View style={[ styles.row ]}>
          <Text style={[styles.whiteText, styles.stretch]}>{ customer.name }</Text>
          <TouchableOpacity onPress={this.onOrderPress} >
            <Image source={RightArrow} style={ styles.rightArrow } />
          </TouchableOpacity>
        </View>
        <Text style={[styles.whiteText, styles.smallText]}>{diff} phút trước</Text>
      </View>
    );
  }

  render() {
    const {
      recentOrders
    } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.buttonWrapper }>
          <TouchableOpacity onPress={ this.onBtnDayPress }>
            <View style={ this.state.reportName === 'day' ? styles.activeButton: {} } >
              <Text>Ngày</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ this.onBtnWeekPress }>
            <View style={ this.state.reportName === 'week' ? styles.activeButton: {} }>
              <Text>Tuần</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ this.onBtnMonthPress }>
            <View style={ this.state.reportName === 'month' ? styles.activeButton: {} }>
              <Text>Tháng</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={ styles.chartWrapper }>
        </View>
        <View style={ styles.recentOrdersWrapper }>
          <FlatList
            data={recentOrders}
            renderItem={this._renderOrders}
            horizontal={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight:10,
    backgroundColor: colors.WHITE,
    flex: 1
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 15,
    marginBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 1,
  },
  whiteText: {
    color: colors.WHITE
  },
  stretch: {
    flex: 1
  },
  orderItem: {
    width: 200,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: colors.ORDER_ITEM_BACKGROUND_COLOR,
  },
  row: {
    flexDirection: 'row'
  },
  rightArrow: {
    width: 20,
    height: 20
  },
  orderGrandTotal: {
    marginBottom: 10
  },
  smallText: {
    fontSize: 12
  }
});

const mapStateToProps = state => {
  return {
    recentOrders: state.Order.recentOrders,
  }
};

const mapDispatchToProps = {
  getRecentOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);