import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MenuIcon from '../../components/MenuIcon';
import TransactionCard from '../../components/TransactionCard';
import TabChartIcon from '../../components/TabChartIcon';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import MonthlyChart from './MonthlyChart';
import { Hamburger, NotificationIcon } from '../../components/imageUrls';

import { fetchRecentOrders } from '../../actions/order'; 

class DashboardScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Thống kê',
    headerLeft: (
      <MenuIcon onPress={() => {
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
      }} icon={Hamburger} />
    ),
    headerRight: (
      <MenuIcon onPress={() => navigation.navigate('OwnerNotification')} icon={NotificationIcon} />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'dailyChart', title: 'Ngày' },
        { key: 'weeklyChart', title: 'Tuần' },
        { key: 'monthlyChart', title: 'Tháng' },
      ],
    };
  }

  componentDidMount() {
    this.props.fetchRecentOrders();
  }

  renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ backgroundColor: '#FFF' }}
      style={{ backgroundColor: '#FFF' }}
      renderLabel={this.renderLabel(props)}
    />
  )

  renderLabel = (props) => ({ route }) => {
    const focused = route.key === this.state.routes[this.state.index].key;
    return (
      <TabChartIcon label={route.title} focused={focused}  />
    )
  }

  renderRecentOrders = () => {
    const { loading, orders } = this.props;
    let content;
    if(loading){
      content = (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size="large" />
        </View>
      )
    }else {
      content = (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.lastesTransList}>
          {
            orders.map((item, index) => (<TransactionCard selected={index === 0} key={`order-${item.id}`} order={item} />))
          }
        </ScrollView>   
      )
    }

    return (
      <View style={styles.lastesTransContainer}>
          <Text style={styles.lastestTransTitle}>Giao dịch gần đây</Text>
          { content }
        </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={styles.container}>
        <View style={{ height: 400 }}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              dailyChart: DailyChart,
              weeklyChart: WeeklyChart,
              monthlyChart: MonthlyChart,
            })}
            swipeEnabled={false}
            renderTabBar={this.renderTabBar}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width, height: 400 }}
          />
        </View>
        { this.renderRecentOrders() }    
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  lastesTransContainer: {
    marginTop: 20,
  },
  lastestTransTitle: {
    lineHeight: 19,
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    fontWeight: "700",
    color: "#4c4c4c"
  },
  lastesTransList: {
    marginTop: 20,
  },
  loadingContainer: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const mapStateToProps = (state) => ({
  loading: state.Order.loadingRecent, 
  orders: state.Order.recents
})

const mapDispatchToProps = {
  fetchRecentOrders,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardScreen);