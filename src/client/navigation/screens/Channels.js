import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Channels = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Channels Screen</Text>
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

export default Channels;
