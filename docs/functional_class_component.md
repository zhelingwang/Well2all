# functional Components
```js
import * as React from React;

// 简写
const Count:React.FunctionComponent<{
  count: number
}> = (props)=>{
  return <div>{props.count}</div>
};

// 使用 interface
interface Props{
  count:number
}
const CountWithInterface: React.FunctionComponent<Props> = (props)=>{
  //...
}

export default Count;
```

# class component
```js
import * as React from 'react';

import Count from './Count';

interface Props {
  name:string
}

interface State {
  count: number;
};

export default class Counter extends React.Component<Props, State> {
  static defaultProps: Props = {
    name: ''
  };

  state: State = {
    count: 0
  };

  increment = () => {
    this.setState({
      count: (this.state.count + 1)
    });
  };

  decrement = () => {
    this.setState({
      count: (this.state.count - 1)
    });
  };

  render () {
    return (
      <div>
        <Count count={this.state.count} />
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
```