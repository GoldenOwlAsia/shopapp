import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MenuIcon from '../../components/MenuIcon';
import TransactionCard from '../../components/TransactionCard';
import TabChartIcon from '../../components/TabChartIcon';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import MonthlyChart from './MonthlyChart';
import { NotificationIcon, Hamburger } from '../../components/imageUrls';
import { fetchRecentOrders } from '../../actions/order';

class DashboardScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Thống kê',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={{ width: 16, height: 12, marginLeft: 12 }}
          source={Hamburger}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <MenuIcon onPress={() => navigation.navigate('OwnerNotification')} icon={NotificationIcon} />
    ),
    headerStyle: {
      borderBottomWidth: 0,
    },
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
        <View style={{ flex: 1 }}>
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
            initialLayout={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width
            }}
          />
        </View>
        { this.renderRecentOrders() }    
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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