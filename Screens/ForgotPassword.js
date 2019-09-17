import React from "react";
import { View, Text, TextInput, Alert, TouchableHighlight } from "react-native";

import * as firebase from "firebase";
import styles from "../Styles/style";
import { Icon } from "react-native-elements";

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    errorMessage: null
  };

  onForgotPassword = () => {
    if (this.state.email.length == 0) {
      this.setState({ errorMessage: "Email input required" });
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() =>
          Alert.alert(
            "An email was sent to " +
              this.state.email +
              " with rest instructions"
          )
        )
        .then(() => this.props.navigation.navigate("Login"))
        .then(() => this.setState({ email: "", errorMessage: null }))
        .catch(error =>
          this.setState({ errorMessage: "Invalid email adress" })
        );
    }
  };

  onLoginPress = () => {
    this.setState({ email: "", errorMessage: "" });
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 40 }}>
          <Text style={{ color: "#00b5ec", fontWeight: "bold", fontSize: 30 }}>
            Twinkkk
          </Text>
        </View>
        <Text>
          {this.state.errorMessage && (
            <Text style={{ color: "red", textAlign: "center" }}>
              *{this.state.errorMessage}
            </Text>
          )}
        </Text>
        <View style={styles.inputContainer}>
          <Icon name="email" color="grey" />
          <TextInput
            placeholder="Email..."
            autoCapitalize="none"
            style={styles.inputs}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.handleLogin}
        >
          <Text onPress={this.onForgotPassword} style={{ color: "white" }}>
            Rest Password
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onLoginPress}
        >
          <Text>Back To Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
