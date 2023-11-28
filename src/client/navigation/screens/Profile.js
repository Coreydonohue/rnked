import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import { retrieveToken } from "./components/authStorage";

const Profile = ({ navigation }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    // console.log(retrieveToken)
  }, []);

  const checkLoginStatus = async () => {
    const token = await retrieveToken();

    token ? setLoggedIn(true) : null;
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoggedIn ? <UserProfile/>  : <Login />}
    </View>
  );
};

export default Profile;
