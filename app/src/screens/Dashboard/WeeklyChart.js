import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Chart from '../../components/Chart';
/**
 * data
 */
import { fetchWeeklyReport } from '../../actions/charts';
import { CHART_TYPE } from '../../actions/types';

/* Component ==================================================================== */
class DailyChart extends React.PureComponent {
  

  async componentDidMount() {
    this.props.fetchWeeklyReport();
  }

  render(){
    const { reports, loading } = this.props;

    if(loading){
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size="large" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Chart
          gap={80}
          height={300}
          data={reports}
          yAxisGridLineColor='#c2c9d1'
          showEvenNumberXaxisLabel={false}
          labelYStyle={styles.labelYStyle}
          primaryColor="#5175FF"
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
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    fontWeight: "600",
    color: "#485465"
  }
});
 
/* Export Component ==================================================================== */
const mapStateToProps = (state) => ({
  loading: state.Charts.loading,
  error: state.Charts.error,
  reports: state.Charts[CHART_TYPE.WEEKLY],
})

const mapDispatchToProps = {
  fetchWeeklyReport,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyChart);