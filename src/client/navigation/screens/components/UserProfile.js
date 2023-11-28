import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import auth from "../../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const me = auth.currentUser?.email;

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        console.log("logged out: ", me);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User profile</Text>
      <Text style={styles.header}>email: {me}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSignOut}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserProfile;
