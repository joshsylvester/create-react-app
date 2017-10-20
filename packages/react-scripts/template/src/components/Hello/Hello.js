import React from 'react';
import PropTypes from 'prop-types';
import './Hello.scss';

const defaultProps = {
  onSubmit: () => {},
};
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

class Hello extends React.PureComponent {
  state = {
    name: '',
  };

  onChangeName = (event: Object) => {
    this.setState({ name: event.target.value });
  };

  onSubmitForm = (event: Object) => {
    event.preventDefault();
    this.props.onSubmit({ name: this.state.name });
    this.setState({ name: '' });
  };

  render() {
    return (
      <div className="Hello">
        <form onSubmit={this.onSubmitForm}>
          <input
            placeholder="Enter your name"
            onChange={this.onChangeName}
            value={this.state.name}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

Hello.propTypes = propTypes;
Hello.defaultProps = defaultProps;

export default Hello;
