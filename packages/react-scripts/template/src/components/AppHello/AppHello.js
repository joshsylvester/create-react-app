import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import Hello from 'components/Hello';
import './AppHello.scss';

export default class AppHello extends React.PureComponent {
  static propTypes = {
    onSubmitHello: PropTypes.func.isRequired,
    greeting: PropTypes.string,
  };

  render() {
    const { greeting, onSubmitHello } = this.props;

    return (
      <div className="AppHello">
        <div className="AppHello-header">
          <img src={logo} className="AppHello-logo" alt="logo" />
          <h2>{greeting || 'Welcome to ServiceMax!'}</h2>
        </div>
        <p className="AppHello-intro">
          To get started, edit <code>src/components/app/AppHello.js</code> and
          save to reload.
        </p>
        <div className="AppHello-hello">
          <Hello onSubmit={onSubmitHello} />
        </div>
      </div>
    );
  }
}
