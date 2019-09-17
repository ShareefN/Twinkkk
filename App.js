import React from "react";

import Firebase from "./Src/Config";

import AppNavigation from "./Navigation/AppNavigation";

export default class App extends React.Component {
  componentWillMount() {
    Firebase.init();
  }

  render() {
    return <AppNavigation />;
  }
}
