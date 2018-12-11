import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageContainer from 'containers/PageContainer';
import APICall from 'components/APICall';
import { apiFetchData } from 'actions/APICall';

const DEFAULT_URL = 'http://date.jsontest.com/';

export const mapStateToProps = state => {
  return state.APICall
    ? ({
      data: state.APICall.data,
      error: state.APICall.error,
      hasError: state.APICall.hasError,
      hasLoaded: state.APICall.hasLoaded,
    })
    : ({
      data: undefined,
      error: undefined,
      hasError: undefined,
      hasLoaded: undefined,
    });
};

export const mapDispatchToProps = dispatch => ({
  fetchData: (url) => dispatch(apiFetchData(url)),
});

const propTypes = {
  fetchData: PropTypes.func,
  url: PropTypes.string,
};

const defaultProps = {
  fetchData: null,
  url: DEFAULT_URL,
};

export class APICallContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchData(this.props.url);
  }

  render() {
    return (
      <PageContainer>
        <APICall {...this.props} />
      </PageContainer>
    );
  }
}
APICallContainer.propTypes = propTypes;
APICallContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(APICallContainer);
