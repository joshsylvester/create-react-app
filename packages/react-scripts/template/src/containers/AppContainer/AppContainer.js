import React from 'react';
import { connect } from 'react-redux';
import AppHello from 'components/AppHello';
import helloActions from 'actions/hello';

export const mapStateToProps = state => ({
  greeting: state.hello.greeting,
  loading: state.loading,
});

export const mapDispatchToProps = dispatch => ({
  sayHello: async (name: string) => dispatch(helloActions.greet(name)),
});

export class AppContainer extends React.PureComponent {
  onSubmitHello = ({ name }: Object) => {
    this.props.sayHello(name);
  };

  render() {
    return <AppHello {...this.props} onSubmitHello={this.onSubmitHello} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
