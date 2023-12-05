import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Post from "./screens/Post";
import Home from "./screens/home";
import Search from "./screens/Search";
import Channels from "./screens/Channels";
import Login from "./components/profile screen/Login";
import SignUp from "./components/profile screen/SignUp";

const homeName = "Home";
const postName = "Post";
const profileName = "Profile";
const searchName = "Search";
const channelName = "Channels";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name={homeName} component={Home} options={{ headerShown: false}}/>
  </Stack.Navigator>
);

const SearchStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name={searchName} component={Search} options={{ headerShown: false}}/>
  </Stack.Navigator>
);

const ChannelsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name={channelName} component={Channels} options={{ headerShown: false}}/>
  </Stack.Navigator>
);

const PostStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name={postName} component={Post} options={{ headerShown: false}}/>
  </Stack.Navigator>
);

const LoginStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
    <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false}}/>
  </Stack.Navigator>
);

const AuthStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
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
        activeTintColor: "#3a86ff",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name={homeName}
        component={HomeStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={searchName}
        component={SearchStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={channelName}
        component={ChannelsStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={postName}
        component={PostStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={profileName}
        component={LoginStack}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
