import React, { Component } from "react";
import Planet3d from "./Planet3d";
import ThemeText from "./ThemeText";

export class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <ThemeText />
        <Planet3d />
      </div>
    );
  }
}

export default App;
