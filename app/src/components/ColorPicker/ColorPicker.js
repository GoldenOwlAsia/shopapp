import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import ColorItem from './Color';

/* Style */
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    lineHeight: 19,
    fontSize: 14,
    color: "#12283f",
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
/* Component ==================================================================== */
class ColorPicker extends React.PureComponent {

  render(){
    const { color, onItemPress, colorList } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Chọn màu</Text>
        <View style={styles.content}>
          {
            colorList.map(colorItem => (
              <ColorItem
                onPress={onItemPress}
                key={`color-${colorItem.id}`}
                selected={color === colorItem.color}
                color={colorItem.color}
              />
            ))
          }
        </View>
      </View>
      
    )
  }
};
 
ColorPicker.propTypes = {
};
ColorPicker.defaultProps = {
};
ColorPicker.componentName = 'ColorPicker';
 
/* Export Component ==================================================================== */
export default ColorPicker;