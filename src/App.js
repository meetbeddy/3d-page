import React, { Component } from "react";
import Planet3d from "./Planet3d";

export class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="text">
          {" "}
          <h1 style={{ color: "red" }}>get your grooves on</h1>
        </div>
        <Planet3d />
      </div>
    );
  }
}

export default App;
