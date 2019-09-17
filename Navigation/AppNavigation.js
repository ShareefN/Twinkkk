import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from "react-native-elements";

import Home from "../Screens/Home";
import Loading from "../Screens/Loading";
import Register from "../Screens/Register";
import Login from "../Screens/Login";
import ForgotPassword from "../Screens/ForgotPassword";
import PrivateProfile from "../Screens/PrivateProfile";
import AddPost from "../Screens/AddPost";
import Search from "../Screens/Search";
import Settings from "../Screens/Settings";
import Terms from "../Screens/Terms&Conditions";
import UserConnections from '../Screens/UsersConnections';
import Likes from '../Screens/Likes';

const BottomNavigaor = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: <Icon name="home" />
      }
    },
    Profile: {
      screen: PrivateProfile,
      navigationOptions: {
        tabBarIcon: <Icon name="person" />
      }
    },
    AddPost: {
      screen: AddPost,
      navigationOptions: {
        tabBarLabel: "Add Post",
        tabBarIcon: <Icon name="add-circle-outline" />
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: <Icon name="settings" />
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: <Icon name="search" />
      }
    }
  },
  {
    initialRouteName: "Home",
    activeTintColor: "grey",
    order: ["Home", "Search", "AddPost", "Profile", "Settings"],
    shifting: true,
    barStyle: { backgroundColor: "#fff" }
  }
);

const BottomContainer = createAppContainer(BottomNavigaor);

BottomContainer.navigationOptions = {
  header: null
};

const AppNavigator = createStackNavigator(
  {
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null
      }
    },
    Settings: {
      screen: Settings,
    },
    Terms: {
      screen: Terms,
      navigationOptions: {
        header: null
      }
    },
    UserConnections : {
      screen: UserConnections,
      navigationOptions: {
        title: 'Connections'
      }
    },
    Likes: {
      screen: Likes,
      navigationOptions: {
        title: 'Likes'
      }
    },
    Home: BottomContainer
  },
  {
    initialouteName: "Loading"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class AppNavigaation extends React.Component {
  render() {
    return <AppContainer />;
  }
}
