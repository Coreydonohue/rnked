import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useGetCurrentUserQuery } from "../reducers/api";
import LoadingSpinner from "../navigation/components/inputs/LoadingSpinner";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./screens/Profile";
import Post from "./screens/Post";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Channels from "./screens/Channels";
import ViewChannel from "./components/Channels/ViewChannel";

const homeName = "Home";
const postName = "Post";
const profileName = "Profile";
const searchName = "Search";
const channelName = "Channels";
const userScreen = "UserScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerShown: true,
        title: "Rnked", //! update to logo
      }}
    />
    <Stack.Screen
      name={profileName}
      component={Profile}
      options={{
        headerShown: true,
        title: "Home",
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const SearchStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={searchName}
      component={Search}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ChannelsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChannelsScreen"
      component={Channels}
      options={{
        headerShown: true,
        title: "Channels",
        headerStyle: {
          // backgroundColor: "your_desired_color", 
          height: 50,
        },
        headerTitleStyle: {
          // color: 'your_title_color', 
          fontSize: 18, 
        },
      }}
    />
    <Stack.Screen
      name="Channel"
      component={ViewChannel}
      options={{
        headerShown: true,
        title: "Channel",
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => navigation.pop()}
          />
        ),
      }}
    />
  </Stack.Navigator>
);
const PostStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={postName}
      component={Post}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ route }) => {
  const { data: me, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name={profileName} options={{ headerShown: false }}>
        {(props) => <Profile {...props} me={me} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const { data: me } = useGetCurrentUserQuery();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      // initialRouteName={profileName}
      // initialRouteName={homeName}
      // initialRouteName={channelName}
      initialRouteName={postName}
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
        navigation={navigation}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={postName}
        component={PostStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={profileName}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
