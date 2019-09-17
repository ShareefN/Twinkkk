import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Card, Body, Left, Right, Thumbnail, CardItem } from "native-base";
import { Icon } from "react-native-elements";

import * as firebase from "firebase";

class CardComponent extends React.Component {
  state = {
    username: ""
  };

  componentWillMount = () => {
    var userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/").child(userId)
      .on("value", snapshot => {
        let data = snapshot.val();
        this.setState({ username: data.username });
      });
  };

  render() {
    const images = {
      "1": require("../assets/car.jpg"),
      "2": require("../assets/flower.jpg"),
      "3": require("../assets/book.jpg")
    };

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
            <Body>
              <Text
                style={{ fontWeight: "bold" }}
                onPress={() => Alert.alert('should navigate to profile')}
              >
                {this.state.username}
              </Text>
              <Text>3m ago</Text>
            </Body>
          </Left>
        </CardItem>
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
        </CardItem>
        <CardItem style={{ height: 35 }}>
          <TouchableOpacity>
            <Text onPress={() => Alert.alert('should navigate to likes')}>{this.props.likes} likes</Text>
          </TouchableOpacity>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text
                style={{ fontWeight: "bold" }}
                onPress={() => Alert.alert("should navigate to profile")}
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

export default CardComponent;
