import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'

import LineChart from './LineChart'

export default class Chart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={{ marginTop: 20 }}>
        <LineChart {...this.props} />
      </View>
    )
  }
}

Chart.propTypes = {
  // type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
  numberOfYAxisGuideLine: PropTypes.number,
  customValueRenderer: PropTypes.func,
  backgroundColor: PropTypes.string
}
Chart.defaultProps = {
  color: '#297AB1',
  height: 100,
  numberOfYAxisGuideLine: 5,
  backgroundColor: '#FFFFFF'
}