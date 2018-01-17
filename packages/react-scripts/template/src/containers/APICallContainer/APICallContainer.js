import React from 'react';
import { connect } from 'react-redux';
import APICall from 'components/APICall';
import { apiFetchData } from 'actions/APICall';

const mapStateToProps = state => ({
  data: state.APICall.data,
  hasLoaded: state.APICall.hasLoaded,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (url) => dispatch(apiFetchData(url)),
});

export class APICallContainer extends React.PureComponent {
  render() {
    return <APICall {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(APICallContainer);
