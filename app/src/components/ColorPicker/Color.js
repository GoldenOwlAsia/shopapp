import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import TouchableView from '../TouchableView';
import { MaterialIcons } from "@expo/vector-icons";

/* Component ==================================================================== */
const Color =  (props) => {
  const { selected, color, onPress } = props;

  const internalPress = () => onPress(color);

  return (
    <TouchableView onPress={internalPress}>
      <View style={styles.container}>
        <View style={[styles.content, { backgroundColor: color }, color === 'white' && styles.border]} />
        { selected && (
          <View style={styles.selectedMark}>
            <MaterialIcons name="done" size={8} color="#FFF" />
          </View>
        ) }
      </View>
    </TouchableView>
  )
};
 
Color.propTypes = {
 
};
Color.defaultProps = {
  selected: false,
  color: 'white',
};
Color.componentName = 'Color';

/* Style */
const ITEM_SIZE = 28;
const SELECTED_MARK_SIZE = 13;

const styles = StyleSheet.create({
  container: {
    width: ITEM_SIZE,
    position: 'relative',
    marginRight: 10,
    marginTop: 10,
  },
  content: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE/2,
  },
  border: {
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  selectedMark: {
    position: 'absolute',
    width: SELECTED_MARK_SIZE,
    height: SELECTED_MARK_SIZE,
    borderRadius: SELECTED_MARK_SIZE/2,
    right: -2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5175ff'
  }
 
});
 
/* Export Component ==================================================================== */
export default Color;