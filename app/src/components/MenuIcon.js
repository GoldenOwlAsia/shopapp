import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

/* Component ==================================================================== */
const MenuIcon = (props) => {
  const { onPress, icon} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
};
 
MenuIcon.propTypes = {
  icon: PropTypes.number,
  onPress: PropTypes.func,
};
MenuIcon.defaultProps = {
};
MenuIcon.componentName = 'MenuIcon';

/* Style */
const styles = StyleSheet.create({
  image: {
    width: 15,
    height: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});
 
/* Export Component ==================================================================== */
export default MenuIcon;