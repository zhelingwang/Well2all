import MovieSearch from '../pages/home/index';
import ReducerContext from '../pages/useReducer_useContext/index'
import LoginPage from '../pages/redux_app/index';
import Todo from '../pages/todo/index';

export default [
  {
    path: '/',
    name: 'Search Movie',
    component: Todo
  },
  {
    path: '/React_Redux',
    name: 'React&Redux',
    subLink: [
      {
        path: '/useReducer_useContext',
        name: 'useReducer&Context',
        component: ReducerContext
      },
      {
        path: '/redux',
        name: 'redux',
        component: LoginPage
      }
    ]
  },
  {
    path: '/Apps',
    name: 'Apps',
    subLink: [
      {
        path: '/TODO',
        name: 'TODO',
        component: Todo
      }
    ]
  },
];

