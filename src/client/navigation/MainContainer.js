// MainContainer.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./screens/Profile";
import Post from "./screens/Post";
import Home from "./screens/home";
import Search from "./screens/Search";
import Channels from "./screens/Channels";

const homeName = "Home";
const postName = "Post";
const profileName = "Profile";
const searchName = "Search";
const channelName = "Channels";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={profileName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === postName) {
            iconName = focused ? "add" : "add-outline";
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === searchName) {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === channelName) {
            iconName = focused ? "people" : "people-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#3a86ff",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name={homeName}
        component={Home}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={searchName}
        component={Search}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={channelName}
        component={Channels}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={postName}
        component={Post}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={profileName}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
