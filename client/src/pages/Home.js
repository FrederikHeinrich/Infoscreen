import React, { Component } from "react";
import { observer } from "mobx-react";
import UserStore from "../stores/UserStore";
import LoginForm from "./components/LoginForm";
import SubmitButton from "./components/SubmitButton";
import "./Home.css";

class Home extends Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        if (result.msg) alert(result.msg);
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }

    try {
      let res = await fetch("/getViews", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="App">
          <div className="container">
            <h2>Loading...</h2>
          </div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            <div className="container">
              <h2>Welcome: {UserStore.username}</h2>
              <SubmitButton
                text={"Logout"}
                disabled={false}
                onClick={() => this.doLogout()}
              />
            </div>
          </div>
        );
      }
    }

    return (
      <div className="App">
        <div className="container">
          <h1>Infoscreen - Home</h1>
          <LoginForm />
        </div>
      </div>
    );
  }
}
export default observer(Home);
