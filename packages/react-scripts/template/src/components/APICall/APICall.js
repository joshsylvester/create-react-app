import React, { Component } from 'react';
import PropType from 'prop-types';

const defaultProps = {
  url: 'http://date.jsontest.com/',
};

const propTypes = {
  url: PropType.string,
};

class APICall extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      data: false,
    };
  }

  /**
   * Data response structure example
   * {time: "09:46:01 PM", milliseconds_since_epoch: 1509745561437, date: "11-03-2017"}
   */
  componentWillMount() {
    fetch(this.props.url)
      // Get response json
      .then(response => response.json())
      // If error getting response
      .catch(() => {
        this.setState({
          loaded: true,
        });
      })
      .then(result => {
        this.setState({
          loaded: true,
          data: JSON.stringify(result),
        });
      });
  }

  render() {
    const { data, loaded } = this.state;
    return (
      <div className="api-call">
        {/* Case if waiting for response */}
        {!loaded && !data && <div className="loading-cls">Loading..</div>}

        {/* Case if successful response */}
        {loaded && data && <div className="data">{data}</div>}

        {/* Case if error response */}
        {loaded && !data && <div className="error">Error on fetch!</div>}
      </div>
    );
  }
}

APICall.defaultProps = defaultProps;
APICall.propTypes = propTypes;

export default APICall;
