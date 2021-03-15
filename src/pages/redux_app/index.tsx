/**
 * this is containers Component: 
 * higher-order component, 管理 store 并按需将 store 中的部分 state 作为 props 传递到 UI Component
 * advantages:
 *  按需传递数据, 避免了因 store 中其余无关数据的更新导致不必要重渲染的问题
 * disadvantages: 
 *  增加了组件数量
 * */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import LoginPage from './login';
import Reducers from './reducer';

const store = createStore(Reducers);
// import thunk from 'redux-thunk';
// apply some middleware : createStore(reducers,applyMiddleware(thunk,...))

const Login = (props) => {
  return (
    <Provider store={store}>
      <LoginPage {...props} />
    </Provider>
  )
}

export default Login;