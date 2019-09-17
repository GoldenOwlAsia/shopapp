import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

/* Style */
const styles = StyleSheet.create({
  container: {
    height: 75,
    borderRadius: 6,
    backgroundColor: "#f6f6f8",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#eeeeee",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  inputContainerStyle: {
    borderBottomColor: 'transparent'
  },
  label: {
    lineHeight: 19,
    fontSize: 14,
    color: "#8f8b99"
  },
  textItem: {
    fontSize: 16,
    fontWeight: '600',
  },
});

/* Component ==================================================================== */
class SelectSize extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      canada: ''
    };
  }

  render(){
    const { onSelectedChange, value, data, label } = this.props;

    return (
      <View style={styles.container}>
        <Dropdown
          inputContainerStyle={styles.inputContainerStyle}
          label={label}
          data={data}
          rippleOpacity={0}
          labelFontSize={14}
          fontSize={16}
          value={value}
          onChangeText={onSelectedChange}
          style={styles.textItem}
        />
      </View>
    )
  }
};
 
SelectSize.propTypes = {
};
SelectSize.defaultProps = {
};
SelectSize.componentName = 'SelectSize';
 
/* Export Component ==================================================================== */
export default SelectSize;