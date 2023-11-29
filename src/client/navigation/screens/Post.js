import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Post = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Post;
