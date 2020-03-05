import React, { Component } from "react";
import { observer } from "mobx-react";
import ViewStore from "../stores/ViewStore";
import "./View.css";

class View extends Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="App">
        <h1>Loading...</h1>
        <p>Hey... I´m new I need a Owner!</p>
        this.content = ViewStore.content.map((content, key) =>
        <li key={item.id}>{item.name}</li>
        );
      </div>
    );
  }
}
export default observer(View);
