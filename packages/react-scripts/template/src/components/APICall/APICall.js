import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Default URL for CRA, Data response structure example from date.jsontest.com/
 * {time: "09:46:01 PM", milliseconds_since_epoch: 1509745561437, date: "11-03-2017"}
 */
const DEFAULT_URL = 'http://date.jsontest.com/';

const propTypes = {
  data: PropTypes.shape({}),
  hasLoaded: PropTypes.bool,
  hasErrored: PropTypes.bool,
};

const defaultProps = {
  data: null,
  hasLoaded: false,
  hasErrored: false,
  url: DEFAULT_URL,
};

class APICall extends Component {
  render() {
    const { data, hasLoaded, hasErrored } = this.props;
    return (
      <div className="APICall">
        {/* Case if waiting for response */}
        {!hasLoaded && !data && <div className="APICall--loading">Loading..</div>}

        {/* Case if successful response */}
        {hasLoaded && data && (
          <div className="APICall__data">
            {JSON.stringify(data)}
          </div>
        )}

        {/* Case if error response */}
        {hasErrored && <div className="APICall--error">Error on fetch!</div>}
      </div>
    );
  }
}

APICall.defaultProps = defaultProps;
APICall.propTypes = propTypes;

export default APICall;
