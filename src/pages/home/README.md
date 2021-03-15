# preparation

- API key 获取地址并激活 : http://www.omdbapi.com/apikey.aspx 
  - `My key : 1686ed2d`

# improvement
- 使用`useReducer`整合多个`useState`
- react with hooks
- JSX

```js
const {useState, useReducer}  = React;
// const [name,setName] = useState('');

// initialState & define reducers & export state and dispatch api
const initialState = {
  name:''
};

const reducer = (state,action)=>{
  const {type,data} = action;
  switch(type){
    case 'SET_NAME':
      return {
        ...state,
        name:data.name
      }
    // other cases
    default:
      return state;
  }
}

const {state,dispatch} = useReducer(reducer,initialState);

```

# summary
- hooks为函数组件引入state和生命周期函数 , 从而使函数组件可以完全替代类组件;
- 相比于类组件中的`this`以及`bind` , hooks让组件变得更精简,更容易使用;
- hooks使得组件间状态逻辑复用更容易更灵活(自定义hook)

# original site
 - https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/
