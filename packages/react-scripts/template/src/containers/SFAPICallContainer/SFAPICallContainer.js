import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import APICall from 'components/APICall';
import { apiSFFetchData } from 'actions/SFCall';

export const mapStateToProps = (state) => ({
  data: state.SFCall.data,
  hasLoaded: state.SFCall.hasLoaded,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(apiSFFetchData()),
});

const propTypes = {
  fetchData: PropTypes.func,
};

const defaultProps = {
  fetchData: null,
};

export class SFAPICallContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return <APICall {...this.props} />;
  }
}

SFAPICallContainer.propTypes = propTypes;
SFAPICallContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SFAPICallContainer);
