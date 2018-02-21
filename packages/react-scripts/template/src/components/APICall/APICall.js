import React, { Component } from 'react';
import PropType from 'prop-types';

/**
 * Default URL for CRA, Data response structure example from date.jsontest.com/
 * {time: "09:46:01 PM", milliseconds_since_epoch: 1509745561437, date: "11-03-2017"}
 */
const DEFAULT_URL = 'http://date.jsontest.com/';

const propTypes = {
  url: PropType.string,
  fetchData: PropType.func.isRequired,
  data: PropType.node,
  hasLoaded: PropType.bool,
  hasErrored: PropType.bool,
};

const defaultProps = {
  data: null,
  hasLoaded: false,
  hasErrored: false,
  url: DEFAULT_URL,
};

class APICall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: props.hasLoaded,
      hasErrored: props.hasErrored,
      data: props.data,
    };
  }


  componentDidMount() {
    this.props.fetchData(this.props.url);
  }

  render() {
    const { data, hasLoaded, hasErrored } = this.state;
    return (
      <div className="APICall">
        {/* Case if waiting for response */}
        {!hasLoaded && !data && <div className="APICall--loading">Loading..</div>}

        {/* Case if successful response */}
        {hasLoaded &&
          data && (
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
