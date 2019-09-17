import React from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import styles from "../Styles/style";
import { Icon } from "react-native-elements";

import * as firebase from "firebase";

export default class Register extends React.Component {
  state = {
    username: "",
    bio: "",
    email: "",
    password: "",
    errorMessage: null
  };

  handleRegister = () => {
    if (
      this.state.username.length === 0 ||
      this.state.email.length === 0 ||
      this.state.password.length === 0
    ) {
      this.setState({ errorMessage: "All inputs are required" });
    } else {
      let rootRef = firebase.database().ref();
      rootRef
        .child("users")
        .orderByChild("username")
        .equalTo(this.state.username)
        .once("value")
        .then(snapshot => {
          if (snapshot.exists()) {
            let userData = snapshot.val();
            this.setState({
              errorMessage: "Username already taken",
              username: ""
            });
            return userData;
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
              )
              .then(() => {
                if (firebase.auth().currentUser) {
                  userId = firebase.auth().currentUser.uid;
                  firebase
                    .database()
                    .ref("users").child(userId)
                    .set({
                      username: this.state.username,
                      bio: this.state.bio,
                      email: this.state.email,
                      uid: userId
                    }),
                    this.setState({
                      username: "",
                      email: "",
                      password: ""
                    }).then(() => this.props.navigation.navigate("Home"));
                }
              })
              .catch(err => this.setState({ errorMessage: err.message }));
          }
        });
    }
  };

  onLoginPress = () => {
    this.setState({ username: "", bio: "", email: "", password: "" }),
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
            <Text style={{ color: "red" }}>*{this.state.errorMessage}</Text>
          )}
        </Text>
        <View style={styles.inputContainer}>
          <Icon name="person" color="grey" />
          <TextInput
            placeholder="Username"
            style={styles.inputs}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="feedback" color="grey" />
          <TextInput
            placeholder="Bio (Optional)"
            autoCapitalize="none"
            style={styles.inputs}
            onChangeText={bio => this.setState({ bio })}
            value={this.state.bio}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" color="grey" />
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.inputs}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="vpn-key" color="grey" />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            style={styles.inputs}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.handleRegister}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onLoginPress}
        >
          <Text>Already A User? Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
