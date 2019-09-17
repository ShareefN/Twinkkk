import React from "react";
import { Text, View, ScrollView, Animated } from "react-native";
import { Thumbnail, Icon } from "native-base";

import UserCardComponent from "./UserCardComponent";

import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

export default class PrivateProfile extends React.Component {
  state = {
    username: "",
    bio: "",
    email: "",
    errorrMessgae: null
  };

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    var userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/").child(userId)
      .on("value", snapshot => {
        let data = snapshot.val();
        this.setState({
          username: data.username,
          bio: data.bio,
          email: data.email
        });
      });
  };

  renderBio = () => {
    if (this.state.bio.length === 0) {
      return <Text>....</Text>;
    } else {
      return <Text>{this.state.bio}</Text>;
    }
  };

  renderSection = () => {
    return (
      <View>
        <UserCardComponent imageSource="1" likes="100" />
        <UserCardComponent imageSource="2" likes="300" />
        <UserCardComponent imageSource="2" likes="300" />
        <UserCardComponent imageSource="2" likes="300" />
        <UserCardComponent imageSource="3" likes="500" />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: "#00b5ec",
            height: HEADER_MAX_HEIGHT
          }}
        ></Animated.View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: PROFILE_IMAGE_MAX_HEIGHT,
              width: PROFILE_IMAGE_MAX_HEIGHT,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: "white",
              borderWidth: 2,
              overflow: "hidden",
              marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
              marginLeft: 10
            }}
          >
            <Thumbnail
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 2,
              paddingBottom: 10
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                paddingLeft: 10,
                fontSize: 26
              }}
            >
              {this.state.username}
            </Text>
            <Text style={{ color: "grey", paddingLeft: 10, fontSize: 14 }}>
              - {this.renderBio()}
              <Text
                onPress={() =>
                  this.props.navigation.navigate("UserConnections")
                }
              >
                {" "}.{" "}
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {this.state.email.length + 3}
                </Text>{" "}
                Connections
              </Text>
            </Text>
          </View>
          <ScrollView style={{ paddingTop: 10 }}>
            {this.renderSection()}
          </ScrollView>
        </View>
      </View>
    );
  }
}
