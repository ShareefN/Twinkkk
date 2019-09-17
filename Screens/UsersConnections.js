import React from "react";
import {
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  Container,
} from "native-base";
import { Icon, ListItem } from "react-native-elements";

import * as firebase from "firebase";

import styles from "../Styles/style";

export default class UserConnections extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    this.makeRemoteRequest();
  };

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <Container style={styles.homeContainer}>
        <Container>           
          <ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => Alert.alert("Working")}>
                  <ListItem
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                    leftAvatar={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.email}
            />
          </ScrollView>
        </Container>
      </Container>
    );
  }
}