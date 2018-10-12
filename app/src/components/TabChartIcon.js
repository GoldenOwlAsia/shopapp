import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import TouchableView from './TouchableView';

/* Style */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  focused: {
    borderRadius: 8,
      backgroundColor: "#ffffff",
      shadowColor: "#f3f4f9",
      shadowOffset: {
        width: 5,
        height: 5
      },
      shadowRadius: 12,
      shadowOpacity: 1,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#f5f5f5"
  }
});
/* Component ==================================================================== */
const TabChartIcon = ({ label, focused }) => (
  <TouchableView>
    <View style={[styles.container, focused && styles.focused]}>
      <Text>{label}</Text>
    </View>
  </TouchableView>
)
 
TabChartIcon.propTypes = {
  label: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};
TabChartIcon.defaultProps = {
  focused: false,
};
TabChartIcon.componentName = 'TabChartIcon';
 
/* Export Component ==================================================================== */
export default TabChartIcon;