import React from 'react';
import { connect } from 'react-redux';
import PageContainer from 'containers/PageContainer';
import AppHello from 'components/AppHello';
import helloActions from 'actions/hello';

export const mapStateToProps = state => ({
  greeting: state.hello ? state.hello.greeting : undefined,
  loading: state.loading,
});

export const mapDispatchToProps = dispatch => ({
  sayHello: async (name) => dispatch(helloActions.greet(name)),
});

export class HelloContainer extends React.Component {
  onSubmitHello = ({ name }) => {
    this.props.sayHello(name);
  };

  render() {
    return (
      <PageContainer>
        <AppHello {...this.props} onSubmitHello={this.onSubmitHello} />
      </PageContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloContainer);
