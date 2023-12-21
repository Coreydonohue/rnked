import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { useGetAdminChannelsQuery } from "../../../reducers/api";
import auth from "../../../../server/auth/firebase";

const JoinedChannels = () => {

  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const { data: channels } = useGetAdminChannelsQuery(currentUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Admin Channels</Text>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        style={styles.feed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  text: {
    // Your text styles here
  },
});

export default JoinedChannels;
