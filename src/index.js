import React, { Component } from "react";
import ReactDOM from "react-dom";
import SuperTable from "./components/superTable";

export default class App extends Component {
  render() {
    return (
      <div>
        <SuperTable initialWidth={4} initialHeight={4} cellSize={50} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));