import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import {DrawTable} from "./components/drawTable";

class App extends Component {
    render() {
        return (
            <div>
                <DrawTable initialWidth="4"  initialHeight="4" cellSizse={50}  />
            </div>
        );
    }
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));