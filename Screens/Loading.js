import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import styles from "../Styles/style";

import * as firebase from "firebase";

export default class Loading extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Home" : "Login");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#00b5ec", fontSize: 40 }}>Twinkkk</Text>
        <ActivityIndicator color="#00b5ec" size="small" />
      </View>
    );
  }
}
