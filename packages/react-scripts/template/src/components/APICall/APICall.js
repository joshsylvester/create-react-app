import React from 'react';
import PropTypes from 'prop-types';
import './APICall.scss';

const propTypes = {
  data: PropTypes.shape({}),
  error: PropTypes.string,
  hasError: PropTypes.bool,
  hasLoaded: PropTypes.bool,
  url: PropTypes.string,
};

const defaultProps = {
  data: null,
  error: '',
  hasError: false,
  hasLoaded: false,
  url: '',
};

const APICall = ({
  data,
  error,
  hasError,
  hasLoaded,
  url,
}) => (
  <div className="APICall content">
    {url && <h2>url: {url}</h2>}

    {/* Case if error response */}
    {hasError && (
      <div className="APICall--error">
        <b>Error on fetch!</b> {error}
      </div>
    )}

    {/* Case if waiting for response */}
    {!hasLoaded && !data && <div className="APICall--loading">Loading..</div>}

    {/* Case if successful response */}
    {hasLoaded &&
      data && (
        <div className="APICall__data">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
  </div>
);

APICall.defaultProps = defaultProps;
APICall.propTypes = propTypes;

export default APICall;
