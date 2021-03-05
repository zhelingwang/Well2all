import MovieSearch from '../pages/home/index';
export default [
  {
    path: '/',
    name: 'Home',
    component: MovieSearch
  },
  {
    path: '/category1',
    name: 'category 1',
    subLink: [
      {
        path: '/option1',
        name: 'option1',
        component: MovieSearch
      }
    ]
  },
  {
    path: '/category2',
    name: 'category 2',
    subLink: [
      {
        path: '/option2',
        name: 'option2'
      }
    ]
  },
  {
    path: '/category3',
    name: 'category 3',
    subLink: []
  },
];

