import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Text,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorModal from '../components/ErrorModal';
import { hideAppError } from '../actions/app'

const styles = StyleSheet.create({
});

const withLoading = () => WrappedComponent => {

  const Spinner = class extends Component {
    static propTypes = {
      loading: PropTypes.bool.isRequired,
    };

    onHideModal = () => {
      this.props.hideAppError();
    }

    render() {
      const { loading, error } = this.props;
      return (
        <View style={{ flex: 1, position: 'relative' }}>
          <WrappedComponent  {...this.props} />
          {loading && (
            <View style={{ backgroundColor: '#00000063', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="white" size="large" animating />
            </View>
          )}
          <ErrorModal onHideModal={this.onHideModal} {...error} />
        </View>
      );
    }
  };
  return Spinner;
};

const mapState = state => ({
  loading: state.App.loading,
  error: state.App.error,
});

const mapDispatch = {
  hideAppError,
}

const withSpinner = () =>
  compose(connect(mapState, mapDispatch, null, { forwardRef: true }), withLoading());

export default withSpinner;
