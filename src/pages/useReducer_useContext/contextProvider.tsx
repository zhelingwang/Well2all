import * as React from 'react';
const { useReducer, useContext } = React;

const Context = React.createContext(null);
const initialState = {
  name: 'Exist',
  age: 18,
  motto: 'clear you mind , trust your soul'
};
const reducers = (state, action) => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.data.key]: action.data.val
      }
  }
}

export const useStore = () => useContext(Context);

const Provider = (props) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
