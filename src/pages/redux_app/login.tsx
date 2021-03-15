/**
 * this is a UI Component
 */
import * as React from 'react';
import { connect } from 'react-redux'

const LoginPage = (props) => {
  const { data, dispatch } = props;
  console.log('data of login page ::', data);

  return (
    <div>login page</div>
  );
}
// map state to props
export default connect(state => ({
  data: state.loginPageData
}))(LoginPage);