import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";

import styles from "../Styles/style";

import * as firebase from "firebase";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  handleLogin = () => {
    if (this.state.email.length == 0 || this.state.password == 0) {
      this.setState({ errorMessage: "All inputs are required" });
    } else {
      const { email, password } = this.state;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => this.props.navigation.navigate("Home"),
          this.setState({ password: "", errorMessage: "" })
        )
        .catch(
          error =>
            this.setState({
              errorMessage:
                "Authentication failed, please check your credentials"
            }),
          this.setState({ password: "" })
        );
    }
  };

  onRegisterPress = () => {
    this.setState({ email: "", password: "", errorMessage: "" });
    this.props.navigation.navigate("Register");
  };

  onForgotPasswordPress = () => {
    this.setState({email: "", password: "", errorMessage: "" });
    this.props.navigation.navigate("ForgotPassword");
  };

  onTermsPress = () => {
    this.props.navigation.navigate("Terms");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 40 }}>
          <Text style={{ color: "#00b5ec", fontWeight: "bold", fontSize: 30 }}>
            Twinkkk
          </Text>
        </View>
        <View>
          <Text>
            {this.state.errorMessage && (
              <Text style={{ color: "red" }}>*{this.state.errorMessage}</Text>
            )}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" color="grey" />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="vpn-key" color="grey" />
          <TextInput
            style={styles.inputs}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onForgotPasswordPress}
        >
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onRegisterPress}
        >
          <Text>Register</Text>
        </TouchableHighlight>
        <View>
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={this.onTermsPress}
          >
            <Text style={{color: 'grey'}}>Terms && Conditions</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
