import * as React from 'react';
import Child from './child';
import Provider from './contextProvider';

const App = () => {
  return (
    <Provider>
      <h3>useContext & useReducer</h3>
      <Child />
    </Provider>
  );
}

export default App;

