import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { Container, Header, Body } from "native-base";
import { Icon, ListItem } from "react-native-elements";

import * as Animatable from "react-native-animatable";

import * as firebase from "firebase";

import styles from "../Styles/style";

export default class Search extends React.Component {
  state = {
    data: [],
    search: "",
    searchBarFocused: false
  };

  componentWillMount = () => {
    this.keyboardDidShow = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHide = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    this.fetchUsers();
  };

  fetchUsers = () => {
    let rootRef = firebase.database().ref();
    rootRef.child("users").on("value", snapshot => {
      let data = Object.values(snapshot.val());
      this.setState({ data: data });
    });
  };

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true });
  };

  keyboardDidHide = () => {
    this.setState({ searchBarFocused: false });
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
        <Container>
          <View
            style={{
              height: 80,
              backgroundColor: "#00b5ec",
              justifyContent: "center",
              paddingHorizontal: 5
            }}
          >
            <Animatable.View
              animation="slideInRight"
              style={{
                height: 50,
                backgroundColor: "#fff",
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                borderRadius: 25
              }}
            >
              <Animatable.View
                animation={
                  this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"
                }
                duration={400}
              >
                <Icon
                  name={this.state.searchBarFocused ? "arrow-back" : "search"}
                  size={24}
                  color="grey"
                />
              </Animatable.View>
              <TextInput
                style={{ marginLeft: 15, flex: 1}}
                placeholder="Search..."
                autoCapitalize="none"
              />
            </Animatable.View>
          </View>
          <ScrollView>
            <FlatList
              data={this.state.data}
              style={{
                backgroundColor: this.state.searchBarFocused
                  ? "rgba(0,0,0,0.3)"
                  : "white"
              }}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => Alert.alert(item.uid)}>
                  <ListItem
                    title={item.username}
                    subtitle={item.bio}
                    leftAvatar={{
                      source: {
                        uri:
                          "https://bootdey.com/img/Content/avatar/avatar6.png"
                      }
                    }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.uid}
            />
          </ScrollView>
        </Container>
      </Container>
    );
  }
}
