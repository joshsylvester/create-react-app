import React from 'react';
import PropTypes from 'prop-types';
import Hello from 'components/Hello';
import './AppHello.scss';

const propTypes = {
  greeting: PropTypes.string,
  onSubmitHello: PropTypes.func.isRequired,
};

const defaultProps = {
  greeting: 'Welcome to ServiceMax!',
};

const AppHello = props => (
  <div className="AppHello">
    <div className="AppHello__header">
      <div className="AppHello__logo" alt="GE logo" />
      <h2>{props.greeting}</h2>
    </div>
    <p className="AppHello__intro">
      To get started, edit <code>src/components/app/AppHello.js</code> and save
      to reload.
    </p>
    <div className="AppHello__hello">
      <Hello onSubmit={props.onSubmitHello} />
    </div>
  </div>
);

AppHello.defaultProps = defaultProps;
AppHello.propTypes = propTypes;

export default AppHello;
