import React from 'react';
import PropTypes from 'prop-types';
import Hello from 'components/Hello';
import logo from './logo.svg';
import './AppHello.scss';

const defaultProps = {
  onSubmitHello: () => {},
  greeting: 'hello',
};
const propTypes = {
  onSubmitHello: PropTypes.func.isRequired,
  greeting: PropTypes.string,
};


const AppHello = props => (
  <div className="AppHello">
    <div className="AppHello__header">
      <img src={logo} className="AppHello__logo" alt="logo" />
      <h2>{props.greeting || 'Welcome to ServiceMax!'}</h2>
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
