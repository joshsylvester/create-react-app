import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageContainer from 'containers/PageContainer';
import APICall from 'components/APICall';
import { apiSFFetchData } from 'actions/SFCall';
import fetchUserInfoData from 'actions/UserInfoAction';

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
  handleFetchData: () => dispatch(apiSFFetchData()),
  // This is just an example of REST API call and
  // doesn't do anything more than storing API response `userInfoDetails` in state
  handlefetchUserInfoData: () => dispatch(fetchUserInfoData()),
});

const propTypes = {
  fetchData: PropTypes.func,
};

const defaultProps = {
  fetchData: null,
};

export class SFAPICallContainer extends React.PureComponent {
  componentDidMount() {
    const { handleFetchData, handlefetchUserInfoData } = this.props;
    handleFetchData();
    handlefetchUserInfoData();
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
