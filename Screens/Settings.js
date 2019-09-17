import React from "react";
import { Text, TouchableOpacity, Alert, Image } from "react-native";
import { Container, Header, Body } from "native-base";
import styles from "../Styles/style";
import Dialog from "react-native-dialog";

import * as firebase from "firebase";

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default class Settings extends React.Component {
  state = {
    username: "",
    email: "",
    bio: "",
    newUsername: "",
    currentPassword: "",
    confirmNewPass: "",
    newPassword: "",
    newBio: "",
    changeUsernameDialog: false,
    changePassDialogVisible: false,
    changeBioDialog: false,
    changePasswordDialog: false,
    completedDialog: false
  };

  componentWillMount = () => {
    var userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users").child(userId)
      .on("value", snapshot => {
        let data = snapshot.val();
        this.setState({
          username: data.username,
          email: data.email,
          bio: data.bio
        });
      });
  };

  onSignoutPress = () => {
    firebase.auth().signOut();
  };

  showChangeUsernameDialog = () => {
    this.setState({ changeUsernameDialog: true });
  };

  showChangePasswordDialog = () => {
    this.setState({ changePassDialogVisible: true });
  };

  showChangeBioDialog = () => {
    this.setState({ changeBioDialog: true });
  };

  showDeleteDialog = () => {
    this.setState({ deleteDialogVisible: true });
  };

  reauthenticateUser = currentPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  onChangeUsername = () => {
    if (this.state.newUsername == "") {
      Alert.alert("Input Requiered");
    } else {
      let rootRef = firebase.database().ref();
      rootRef
        .child("users")
        .orderByChild("username")
        .equalTo(this.state.newUsername)
        .once("value")
        .then(snapshot => {
          if (snapshot.exists()) {
            Alert.alert("Username Already Exsists");
          } else {
            var userId = firebase.auth().currentUser.uid;
            firebase
              .database()
              .ref("users").child(userId)
              .update({
                username: this.state.newUsername
              })
              .then(() =>
                this.setState({
                  changeUsernameDialog: false,
                  newUsername: "",
                  completedDialog: true
                })
              );
          }
        })
        .catch(err => console.log(err));
    }
  };

  onChangePassword = () => {
    if (
      this.state.confirmNewPass === "" ||
      this.state.newPassword === "" ||
      this.state.currentPassword === ""
    ) {
      Alert.alert("All Inputs Requiered");
    } else {
      this.reauthenticateUser(this.state.currentPassword)
        .then(() => {
          var user = firebase.auth().currentUser;
          if (this.state.confirmNewPass === this.state.newPassword) {
            user
              .updatePassword(this.state.newPassword)
              .then(() =>
                this.setState({
                  newPassword: "",
                  currentPassword: "",
                  confirmNewPass: "",
                  changePassDialogVisible: false,
                  completedDialog: true
                })
              )
              .then(() => this.props.navigation.navigate("Login"))
              .then(() => Alert.alert("Please login to authenticate"));
          } else {
            Alert.alert("Password's do not match");
            this.setState({ newPassword: "", confirmNewPass: "" });
          }
        })
        .catch(err => {
          Alert.alert("Current Password is incorrect");
          this.setState({ currentPassword: "" });
        });
    }
  };

  onBioUpdate = () => {
    var userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/").child(userId)
      .update({
        bio: this.state.newBio
      })
      .then(() =>
        this.setState({
          changeBioDialog: false,
          newBio: "",
          completedDialog: true
        })
      )
      .catch(err => console.log(err));
  };

  onDeletePress = () => {
    if (this.state.currentPassword === "") {
      Alert.alert("Input Requiered");
    } else {
      this.reauthenticateUser(this.state.currentPassword)
        .then(() => {
          var user = firebase.auth().currentUser;
          this.setState({ deleteDialogVisible: false });
          user.delete();
        })
        .then(() => Alert.alert("Account Deleted"))
        .catch(error => {
          Alert.alert("Invalid Password");
        });
    }
  };

  render() {
    return (
      <Container style={styles.homeContainer}>
        <Header style={styles.header}>
          <Body style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "#00b5ec", paddingTop: 40 }}>
              Twinkkk
            </Text>
          </Body>
        </Header>
        <Container style={styles.container}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.showChangeUsernameDialog}
          >
            <Text style={styles.loginText}>Change Username</Text>
          </TouchableOpacity>
          <Dialog.Container visible={this.state.changeUsernameDialog}>
            <Dialog.Title style={{ textAlign: "center" }}>
              Change Username
            </Dialog.Title>
            <Dialog.Input
              placeholder="New Username"
              style={styles.textInput}
              onChangeText={newUsername => this.setState({ newUsername })}
              value={this.setState.newUsername}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => this.setState({ changeUsernameDialog: false })}
            />
            <Dialog.Button label="Update" onPress={this.onChangeUsername} />
          </Dialog.Container>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.showChangePasswordDialog}
          >
            <Text style={styles.loginText}>Change Password</Text>
          </TouchableOpacity>
          <Dialog.Container visible={this.state.changePassDialogVisible}>
            <Dialog.Title style={{ textAlign: "center" }}>
              Change Password
            </Dialog.Title>
            <Dialog.Description style={{ textAlign: "center" }}>
              To confirm authenticity, please enter your current password.
            </Dialog.Description>
            <Dialog.Input
              placeholder="Current Password"
              secureTextEntry
              style={styles.textInput}
              onChangeText={currentPassword =>
                this.setState({ currentPassword })
              }
              value={this.state.currentPassword}
            />
            <Dialog.Input
              placeholder="New Password"
              style={styles.textInput}
              secureTextEntry
              onChangeText={newPassword => this.setState({ newPassword })}
              autoCapitalize="none"
              value={this.state.newPassword}
            />
            <Dialog.Input
              placeholder="Confirm New Password"
              secureTextEntry
              style={styles.textInput}
              onChangeText={confirmNewPass => this.setState({ confirmNewPass })}
              value={this.state.confirmNewPass}
              autoCapitalize="none"
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => this.setState({ changePassDialogVisible: false })}
            />
            <Dialog.Button label="Update" onPress={this.onChangePassword} />
          </Dialog.Container>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.showChangeBioDialog}
          >
            <Text style={styles.loginText}>Add / Update Bio</Text>
          </TouchableOpacity>
          <Dialog.Container visible={this.state.changeBioDialog}>
            <Dialog.Title style={{ textAlign: "center" }}>
              Update Bio...
            </Dialog.Title>
            <Dialog.Input
              placeholder="Bio..."
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={newBio => this.setState({ newBio })}
              value={this.state.newBio}
            />
            <Dialog.Button
              label="Cancle"
              onPress={() => this.setState({ changeBioDialog: false })}
            />
            <Dialog.Button label="Update" onPress={this.onBioUpdate} />
          </Dialog.Container>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.onSignoutPress}
          >
            <Text style={styles.loginText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.deleteButton]}
            onPress={this.showDeleteDialog}
          >
            <Text style={styles.loginText}>Delete Account</Text>
          </TouchableOpacity>
          <Dialog.Container visible={this.state.deleteDialogVisible}>
            <Dialog.Title style={{ textAlign: "center" }}>
              Delete Account
            </Dialog.Title>
            <Dialog.Description style={{ textAlign: "center" }}>
              Are you sure you want to delete this account? This action cannot
              be undone.
            </Dialog.Description>
            <Dialog.Input
              placeholder="Enter password"
              style={styles.textInput}
              secureTextEntry
              onChangeText={currentPassword =>
                this.setState({ currentPassword })
              }
              value={this.setState.currentPassword}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => this.setState({ deleteDialogVisible: false })}
            />
            <Dialog.Button label="Delete" onPress={this.onDeletePress} />
          </Dialog.Container>
          <Dialog.Container visible={this.state.completedDialog}>
            <Text style={{ textAlign: "center", paddingBottom: 50 }}>
              <Image
                style={{ width: 100, height: 60 }}
                source={require("../assets/greenCheckMark.jpg")}
              />
            </Text>
            <Dialog.Title style={{ textAlign: "center" }}>
              Successfully Updated
            </Dialog.Title>
            <Dialog.Button
              label="Dismiss"
              onPress={() => this.setState({ completedDialog: false })}
            />
          </Dialog.Container>
        </Container>
      </Container>
    );
  }
}
