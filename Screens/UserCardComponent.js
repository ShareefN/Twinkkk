import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Card, Body, Left, Right, CardItem } from "native-base";
import { Icon } from "react-native-elements";

import * as firebase from "firebase";

export default class UserCardComponent extends React.Component {
  state = {
    username: ''
  }

  componentDidMount = () => {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref("users/").child(userId)
    .on("value", snapshot => {
      let data = snapshot.val()
      this.setState({username: data.username})
    })
  }

  render() {
    const images = {
      "1": require("../assets/car.jpg"),
      "2": require("../assets/flower.jpg"),
      "3": require("../assets/book.jpg")
    };

    return (
      <Card>
        <CardItem cardBody>
          <Image
            source={images[this.props.imageSource]}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            <View style={{ paddingRight: 10 }}>
              <TouchableOpacity>
                <Icon name="thumb-up" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon name="chat-bubble-outline" />
            </TouchableOpacity>
          </Left>
          <Right>
            <TouchableOpacity onPress={() => Alert.alert("To delete post")}>
              <Icon name="delete" />
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem style={{ height: 40 }}>
          <Text>{this.props.likes} likes</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text
                style={{ fontWeight: "bold" }}
                onPress={() => Alert.alert("Presses")}
              >
                {this.state.username}
              </Text>{" "}
              A user profile is a visual display of personal data associated
              with a specific user, or a customized desktop environment. ... A
              profile can be used to store the description of the
              characteristics of a person.
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
