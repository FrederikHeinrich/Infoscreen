import React, { Component } from "react";
import { observer } from "mobx-react";
import ViewStore from "../stores/ViewStore";
import "./View.css";

class View extends Component {
  async componentDidMount() {
    try {
      let res = await fetch("/view/exists", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await res.json();

      if (result && result.success) {
        ViewStore.loading = false;
        ViewStore.isShowing = true;
        ViewStore.viewid = result.viewid;
        ViewStore.location = result.location;
        ViewStore.name = result.name;
        ViewStore.token = result.token;
      } else {
        let res = await fetch("/view/create", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
      }
    } catch (e) {
      ViewStore.loading = false;
      ViewStore.isShowing = false;
    }
  }

  render() {
    if (ViewStore.isShowing) {
      return (
        <div className="App">
          <h1>Hii</h1>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Loading...</h1>
          <p>Hey... I´m new I need a Owner!</p>
        </div>
      );
    }
    return <div className="App"></div>;
  }
}
export default observer(View);
