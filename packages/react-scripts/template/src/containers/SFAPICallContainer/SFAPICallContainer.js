import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageContainer from 'containers/PageContainer';
import APICall from 'components/APICall';
import { apiSFFetchData } from 'actions/SFCall';

export const mapStateToProps = (state) => {
  return state.SFCall
    ? ({
      data: state.SFCall.data,
      error: state.SFCall.error,
      hasError: state.SFCall.hasError,
      hasLoaded: state.SFCall.hasLoaded,
    })
    : ({
      data: undefined,
      error: undefined,
      hasError: undefined,
      hasLoaded: undefined,
    });
};

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
    return (
      <PageContainer>
        <APICall {...this.props} />
      </PageContainer>
    );
  }
}

SFAPICallContainer.propTypes = propTypes;
SFAPICallContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SFAPICallContainer);
