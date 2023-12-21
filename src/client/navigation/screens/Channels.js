import React from "react";
import { Text, StyleSheet, View } from "react-native";
import JoinedChannels from "../components/Channels/JoinedChannels";
import CreateChannel from "../components/Channels/CreateChannel";
import OpenChannels from "../components/Channels/OpenChannels";

const Channels = () => {
  return (
    <View style={styles.container}>
      <JoinedChannels/> 
      <OpenChannels/> 
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
