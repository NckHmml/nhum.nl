import * as React from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export interface HelloState {
  count: number;
}

export class Hello extends React.Component<HelloProps, HelloState> {
  state: HelloState = {
    count: 1
  };

  /**
   * Increases the counter
   */
  incrementCount() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        <h2>{this.state.count}</h2>
        <button onClick={() => this.incrementCount()}>Increase</button>
      </div>
    );
  }
}