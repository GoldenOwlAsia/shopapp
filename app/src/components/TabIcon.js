import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
/* Style */
const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  }
});
/* Component ==================================================================== */
const TabIcon = ({ icon }) => (
  <Image resizeMode="contain" source={icon} style={styles.icon} />
)
 
TabIcon.propTypes = {
};
TabIcon.defaultProps = {
};
TabIcon.componentName = 'TabIcon';
 
/* Export Component ==================================================================== */
export default TabIcon;