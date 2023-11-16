import React from "react";
import { View, Text } from "react-native";
import Login from "../../components/login";

const Profile = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Login/> 
    </View>
  );
};

export default Profile;
