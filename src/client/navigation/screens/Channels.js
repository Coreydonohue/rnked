import React from "react";
import { Text, StyleSheet, View } from "react-native";
import JoinedChannels from "../components/Channels/JoinedChannels";
import CreateChannel from "../components/Channels/CreateChannel";
import PublicChannels from "../components/Channels/PublicChannels";
import PrivateChannels from "../components/Channels/PrivateChannels";

const Channels = () => {
  return (
    <View style={styles.container}>
      <JoinedChannels/> 
      <PublicChannels/> 
      <PrivateChannels/> 
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
