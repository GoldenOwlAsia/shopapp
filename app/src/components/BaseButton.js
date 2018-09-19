import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator, ViewPropTypes, Text, View, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

/* Component ==================================================================== */
const BaseButton = (props) => {
  const {
    clear,
    fullWidth,
    containerStyle,
    IconLeft,
    loadingStyle,
    loadingProps,
    IconRight,
    loading,
    onPress,
    buttonStyle,
    titleProps,
    disabledStyle,
    disabledTitleStyle,
    disabled,
    titleStyle,
    title,
    outline,
    ...rest
  } = props;

  return (
    <View style={[styles.container, containerStyle, fullWidth && { width: '100%' }]}>
      <TouchableComponent
        onPress={onPress}
        underlayColor={clear ? 'transparent' : undefined}
        activeOpacity={clear ? 0 : undefined}
        disabled={disabled}
        {...rest}
      >
        <View
          style={[
          styles.button,
          buttonStyle,
          disabled && styles.disabled,
          disabled && disabledStyle,
          clear && { backgroundColor: 'transparent', elevation: 0 },
          outline && {
            borderWidth: 1,
            backgroundColor: 'transparent',
            borderColor: '#5275FF',
          },
        ]}
        >
        {!!IconLeft && IconLeft}
        {!!title && (
            <Text
              style={[
                styles.title,
                titleStyle,
                disabled && styles.disabledTitle,
                disabled && disabledTitleStyle,
                fullWidth && { flex: 1 },
                outline && { color: '#5275FF', padding: 7 }
              ]}
              {...titleProps}
            >
              {title}
            </Text>
          )}
          {loading && (
            <ActivityIndicator
              animating={true}
              style={loadingStyle}
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}
          {!loading && !!IconRight && IconRight}
        </View>
      </TouchableComponent>
    </View>
  )
};
 
BaseButton.propTypes = {
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleProps: PropTypes.object,
  buttonStyle: ViewPropTypes.style,
  clear: PropTypes.bool,
  loading: PropTypes.bool,
  loadingStyle: ViewPropTypes.style,
  loadingProps: PropTypes.object,
  onPress: PropTypes.any,
  containerStyle: ViewPropTypes.style,
  IconLeft: PropTypes.node,
  IconRight: PropTypes.node,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  disabledTitleStyle: Text.propTypes.style,
  fullWidth: PropTypes.bool,
  outline: PropTypes.bool,
};
BaseButton.defaultProps = {
  title: 'Button',
  fullWidth: true,
  loadingProps: {
    color: 'white',
    size: 'small',
  },
  disabled: false,
};
BaseButton.componentName = 'BaseButton';

/* Style */
const styles = StyleSheet.create({
  container: {
    
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    backgroundColor: '#5275FF',
    ...Platform.select({
      android: {
        elevation: 4,
        borderRadius: 2,
      },
    }),
  },
  disabled: {
    // grey from designmodo.github.io/Flat-UI/
    backgroundColor: '#D1D5D8',
    ...Platform.select({
      android: {
        //no elevation
        borderRadius: 2,
      },
    }),
  },
  title: {
    // flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    padding: 8,
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontWeight: '500',
      },
    }),
  },
  disabledTitle: {
    color: '#F3F4F5',
  },


});
 
/* Export Component ==================================================================== */
export default BaseButton;