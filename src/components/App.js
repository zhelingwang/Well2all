import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  render() {
    return [
      <button onClick={() => {
        this.setState({
          count: this.state.count + 1
        })
      }}>clk</button>,
      <div>{this.state.count}</div>
    ]
  }
}

export default App;