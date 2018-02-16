import React from 'react';
import { connect } from 'react-redux';
import APICall from 'components/APICall';
import { apiSFFetchData } from 'actions/SFCall';

const mapStateToProps = (state) => ({
  data: state.SFCall.data,
  hasLoaded: state.SFCall.hasLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(apiSFFetchData()),
});

export class APICallContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return <APICall data={this.props.data} hasLoaded={this.props.hasLoaded} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(APICallContainer);
