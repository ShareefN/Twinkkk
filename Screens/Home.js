import React from "react";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { Container, Header, Body, Thumbnail } from "native-base";
import CardComponent from "./CardComponent";

import * as firebase from "firebase";

import styles from "../Styles/style";

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

export default class Home extends React.Component {
  state = {
    refreshing: false
  };

  componentDidMount = () => {
    this.onRefresh();
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
    this.setState({ refreshing: false });
  };

  fetchData = () => {
    // console.log('kkk')
  }

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
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
            />
          }
        >
          <View>
            <View style={{ height: 90 }}>
              <Text
                style={{
                  paddingLeft: 10,
                  fontWeight: "bold",
                  textDecorationLine: "underline"
                }}
              >
                Stories
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingStart: 5,
                  paddingEnd: 5
                }}
              >
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Thumbnail
                    style={{
                      marginHorizontal: 5,
                      borderColor: "red",
                      borderWidth: 1
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>

            <CardComponent imageSource="1" likes="400" />
            <CardComponent imageSource="2" likes="390" />
            <CardComponent imageSource="2" likes="120" />
            <CardComponent imageSource="2" likes="422" />
            <CardComponent imageSource="3" likes="414" />
            <CardComponent imageSource="3" likes="184" />
          </View>
        </ScrollView>
      </Container>
    );
  }
}
