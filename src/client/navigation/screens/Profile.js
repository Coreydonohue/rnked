import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./components/profile screen/Login";
import UserChannel from "./components/profile screen/UserChannel";
import auth from "../../../server/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate("Profile");
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>{user ? <UserChannel /> : <Login />}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
