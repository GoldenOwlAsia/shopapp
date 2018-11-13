import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Chart from '../../components/Chart';
/**
 * data
 */
import { fetchDailyReport } from '../../actions/charts';
import { CHART_TYPE } from '../../actions/types';

/* Component ==================================================================== */

const fakeData = [
  {x:'00:00 - 00:59', y:0},
  {x:'01:00 - 01:59', y:200000},
  {x:'02:00 - 02:59', y:300000},
  {x:'03:00 - 03:59', y:100000},
  {x:'04:00 - 04:59', y:600000},
  {x:'05:00 - 05:59', y:1200000},
  {x:'06:00 - 06:59', y:5000000},
  {x:'07:00 - 07:59', y:0},
  {x:'08:00 - 08:59', y:1200000},
  {x:'09:00 - 09:59', y:0},
  {x:'10:00 - 10:59', y:0},
  {x:'11:00 - 11:59', y:0},
  {x:'12:00 - 12:59', y:0},
  {x:'13:00 - 13:59', y:0},
  {x:'14:00 - 14:59', y:0},
  {x:'15:00 - 15:59', y:0},
  {x:'16:00 - 16:59', y:0},
  {x:'17:00 - 17:59', y:0},
  {x:'18:00 - 18:59', y:0},
  {x:'19:00 - 19:59', y:0},
  {x:'20:00 - 20:59', y:0},
  {x:'21:00 - 21:59', y:0},
  {x:'22:00 - 22:59', y:0},
  {x:'23:00 - 23:59', y:0}
]
class DailyChart extends React.PureComponent {
  

  async componentDidMount() {
    this.props.fetchDailyReport();
  }

  render(){
    const { reports, loading } = this.props;

    if(loading){
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size='large' />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Chart
          gap={80}
          height={300}
          data={fakeData}
          yAxisGridLineColor='#c2c9d1'
          showEvenNumberXaxisLabel={false}
          labelYStyle={styles.labelYStyle}
          primaryColor='#5175FF'
        />
      </View>
    )
  }
}
 
DailyChart.propTypes = {
};
DailyChart.defaultProps = {
};
DailyChart.componentName = 'DailyChart';

/* Style */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelYStyle: {
    lineHeight: 14,
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#485465'
  }
});
 
/* Export Component ==================================================================== */
const mapStateToProps = (state) => ({
  loading: state.Charts.loading,
  error: state.Charts.error,
  reports: state.Charts[CHART_TYPE.DAILY],
})

const mapDispatchToProps = {
  fetchDailyReport,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyChart);