import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

/* Component ==================================================================== */
const SearchBar = (props) => {
  const { wrapperStyle, style, ...rest } = props;
  return (
    <KeyboardAvoidingView style={[styles.container, props.wrapperStyle]} behavior="padding" enabled>
      <View style={styles.content}>
        <FontAwesome style={styles.icon} name="search" />
        <TextInput
          style={[styles.input, props.style]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="search"
          {...rest}
        />
      </View>
    </KeyboardAvoidingView>
  )
};
 
SearchBar.propTypes = {
  wrapperStyle: PropTypes.object,
  style: PropTypes.object,
};
SearchBar.defaultProps = {
};
SearchBar.componentName = 'SearchBar';

/* Style */
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  icon: {
    fontSize: 16,
    color: '#F5F5F5',
  },
  input: {
    width: '99%',
    paddingLeft: 14,
    paddingRight: 10,
  }

});
 
/* Export Component ==================================================================== */
export default SearchBar;