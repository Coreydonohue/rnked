import React from "react";
import { Text, StyleSheet, View } from "react-native";
import JoinedChannels from "../components/Channels/JoinedChannels";
import CreateChannel from "../components/Channels/CreateChannel";

const Channels = () => {
  return (
    <View style={styles.container}>
      <JoinedChannels/> 
      <CreateChannel/> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Channels;
